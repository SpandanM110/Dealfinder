// src/pages/api/gemini.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define the expected request body structure
interface GeminiRequest {
  input: string;
  type: 'summarize' | 'analyze';
}

// Define the response structure
interface GeminiResponse {
  response: string;
}

// Initialize GoogleGenerativeAI with the API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-8b',
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 1024,
  responseMimeType: 'text/plain',
};

// API Route Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
  }

  const { input, type } = req.body as GeminiRequest;

  if (!input || !type) {
    return res.status(400).json({ message: 'Invalid Request: Missing input or type.' });
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    let instruction = '';

    if (type === 'summarize') {
      instruction = `Summarize the following Terms and Conditions. Identify any terms that may be unfavorable to the user (e.g., data sharing, non-refundable fees, or limitations of liability) and highlight favorable terms (e.g., easy account termination or transparent pricing). Conclude with a clear indication of whether it is generally "good to go" or "bad to proceed" based on the overall risk to the user.`;
    } else if (type === 'analyze') {
      instruction = `Analyze the following Terms and Conditions in detail. Identify terms that may pose risks to the user, such as strict cancellation policies, hidden fees, data-sharing practices, and mandatory arbitration clauses. Also, highlight any positive terms, like strong data privacy protections, fair refund policies, and flexible account options. Conclude with a recommendation that explains whether the terms make it "good to go" or "bad to proceed" and provide reasons for your assessment.`;
    } else {
      instruction = `Review the following Terms and Conditions. Identify any positive aspects as well as potential risks, and give a recommendation indicating if it is "good to go" or "bad to proceed" based on your assessment.`;
    }

    const message = `${instruction}\n\n${input}`;

    const result = await chatSession.sendMessage(message);

    const summary = result.response.text();

    if (summary) {
      return res.status(200).json({ response: summary });
    } else {
      throw new Error('No summary generated.');
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}
