// src/pages/api/gemini.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Define the expected request body structure
interface GeminiRequest {
  input: string;
  type: 'summarize' | 'analyze'; // Extend as needed
}

// Define the response structure
interface GeminiResponse {
  response: string;
}

// Initialize GoogleGenerativeAI with the API key
const apiKey = process.env.GEMINI_API_KEY;

// Validate API key
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Initialize the generative model
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-8b',
});

// Define generation configuration
const generationConfig = {
  temperature: 0.7, // Adjusted for balanced creativity and coherence
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 1024, // Adjust based on desired summary length
  responseMimeType: 'text/plain',
};

// API Route Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
  }

  // Parse and validate the request body
  const { input, type } = req.body as GeminiRequest;

  if (!input || !type) {
    return res.status(400).json({ message: 'Invalid Request: Missing input or type.' });
  }

  try {
    // Start a chat session with the model
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Include conversation history if needed
    });

    // Structure the instruction-based prompt
    let instruction = '';

    if (type === 'summarize') {
      instruction = 'Please provide a concise summary of the following Terms and Conditions:';
    } else if (type === 'analyze') {
      instruction = 'Analyze the following Terms and Conditions and highlight any potential issues or areas of concern:';
    } else {
      instruction = 'Please process the following text as per the instructions:';
    }

    // Combine instruction with the input text
    const message = `${instruction}\n\n${input}`;

    // Send the message to the model
    const result = await chatSession.sendMessage(message);

    // Extract the response text
    const summary = result.response.text();

    if (summary) {
      // Respond with the summary
      return res.status(200).json({ response: summary });
    } else {
      throw new Error('No summary generated.');
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);

    // Customize error responses based on the error type
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}
