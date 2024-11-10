import { createContext, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';  // Only import User
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: Error | null;  // Use Error type for general error handling
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
