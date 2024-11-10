// src/pages/landing.tsx

import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to DealFinder</h1>
      
      {/* Introduction */}
      <p className="text-lg mb-6 text-center max-w-xl">
        DealFinder helps you easily understand complex Terms and Conditions of deals, promotions, 
        or subscriptions. Our tool breaks down legal jargon into simple language, highlights 
        potential risks, and gives a clear recommendation so you can make informed decisions.
      </p>

      {/* Call to Action */}
      <div className="flex space-x-4">
        <Link href="/auth/signin">
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Sign In
          </button>
        </Link>
        <Link href="/auth/signup">
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Sign Up
          </button>
        </Link>
      </div>
      
      {/* Additional Information */}
      <p className="mt-6 text-sm text-gray-700 text-center max-w-md">
        New to DealFinder? Sign up to discover how we make understanding Terms and Conditions simple and accessible.
      </p>
    </div>
  );
};

export default LandingPage;
