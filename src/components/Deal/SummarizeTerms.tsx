// src/components/Deal/SummarizeTerms.tsx

import { useState } from 'react';
import axios from 'axios';

const SummarizeTerms = () => {
  const [input, setInput] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSummarize = async () => {
    // Input validation
    if (input.trim() === '') {
      setError('Please enter the terms and conditions.');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      // Send POST request to /api/gemini
      const response = await axios.post('/api/gemini', { input, type: 'summarize' });

      // Update the summary state with the response
      setSummary(response.data.response);
    } catch (err: any) {
      console.error('Summarization Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch the summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Summarize Terms and Conditions</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={10}
        placeholder="Paste terms and conditions here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        onClick={handleSummarize}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {summary && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h3 className="text-xl mb-2">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizeTerms;
