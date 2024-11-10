// src/components/Auth/AuthProvider.tsx
import { createContext, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  error: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Adjusted: Ensure user is explicitly null if undefined
  const [user, loading, error] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user: user ?? null, loading, error: error ?? null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
