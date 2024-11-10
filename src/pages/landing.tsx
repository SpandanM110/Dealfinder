// src/pages/landing.tsx
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Welcome to DealFinder</h1>
      <div>
        <Link href="/auth/signin" className="mr-4 text-blue-500 underline">
          Sign In
        </Link>
        <Link href="/auth/signup" className="text-green-500 underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
