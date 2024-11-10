import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeminiRequest {
  input: string;
  type: 'summarize' | 'analyze' | 'trust';
}

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
      instruction = `Summarize the following Terms and Conditions. Highlight unfavorable terms like hidden fees or data sharing. Indicate whether it's "good to go" or "bad to proceed."`;
    } else if (type === 'analyze') {
      instruction = `Analyze the following Terms and Conditions. Identify risks and positive aspects. Conclude with a "good to go" or "bad to proceed" recommendation.`;
    } else {
      instruction = `Review the following Terms and Conditions. Provide a clear assessment of whether it's "good to go" or "bad to proceed."`;
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
    return res.status(500).json({ message: error.message || 'An unexpected error occurred.' });
  }
}
