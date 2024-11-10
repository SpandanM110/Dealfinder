// src/components/Deal/ProcessTerms.tsx

import { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const ProcessTerms = () => {
  const [input, setInput] = useState<string>('');
  const [analyzeResult, setAnalyzeResult] = useState<string>('');
  const [trustResult, setTrustResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Handler for Analyze Operation
  const handleAnalyze = async () => {
    if (input.trim() === '') {
      setError('Please enter the terms and conditions.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalyzeResult('');
    setTrustResult('');

    try {
      const response = await axios.post('/api/gemini', { input, type: 'analyze' });
      setAnalyzeResult(response.data.response);
    } catch (err: unknown) { // Updated catch block
      console.error('Analyze Operation Error:', err);
      setError('Failed to analyze the terms and conditions.');
    } finally {
      setLoading(false);
    }
  };

  // Handler for Trust Assessment Operation
  const handleTrustAssessment = async () => {
    if (input.trim() === '') {
      setError('Please enter the terms and conditions.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalyzeResult('');
    setTrustResult('');

    try {
      const response = await axios.post('/api/gemini', { input, type: 'trust assessment' });
      setTrustResult(response.data.response);
    } catch (err: unknown) { // Updated catch block
      console.error('Trust Assessment Operation Error:', err);
      setError('Failed to assess the trustworthiness of the terms and conditions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded shadow-md">
      <h2 className="text-2xl mb-4">DealFinder: Analyze & Trust Assessment</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={10}
        placeholder="Paste the terms and conditions here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={10000} // Increased limit for longer documents
      ></textarea>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleAnalyze}
          className={`px-4 py-2 bg-green-500 text-white rounded flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Analyze'}
        </button>
        <button
          onClick={handleTrustAssessment}
          className={`px-4 py-2 bg-red-500 text-white rounded flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Trust Assessment'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Display Analyze Result */}
      {analyzeResult && (
        <div className="mb-4 p-2 border rounded bg-gray-100">
          <h3 className="text-xl mb-2">Analysis:</h3>
          <p>{analyzeResult}</p>
        </div>
      )}

      {/* Display Trust Assessment Result */}
      {trustResult && (
        <div className="mb-4 p-2 border rounded bg-gray-100">
          <h3 className="text-xl mb-2">Trust Assessment:</h3>
          <p>{trustResult}</p>
        </div>
      )}
    </div>
  );
};

export default ProcessTerms;
