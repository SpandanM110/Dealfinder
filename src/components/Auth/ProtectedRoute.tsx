// src/components/Auth/ProtectedRoute.tsx
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/landing');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return user ? children : null;
};

export default ProtectedRoute;
