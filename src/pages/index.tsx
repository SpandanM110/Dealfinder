// src/pages/index.tsx

import ProtectedRoute from '../components/Auth/ProtectedRoute';
import SummarizeTerms from '../components/Deal/SummarizeTerms';

const HomePage = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl mb-4">Welcome to DealFinder</h1>
        <SummarizeTerms />
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
