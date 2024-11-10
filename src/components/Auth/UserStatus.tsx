// src/components/Auth/UserStatus.tsx
import { useAuth } from './AuthProvider';

const UserStatus = () => {
  const { user, loading, error } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (user) return <p>Signed in as {user.email}</p>;
  return <p>Not signed in</p>;
};

export default UserStatus;
