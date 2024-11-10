// src/components/Auth/AuthProvider.tsx
import { createContext, useContext, ReactNode } from 'react';
import { User, FirebaseError } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: FirebaseError | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  error: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user, loading, error: error ?? null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
