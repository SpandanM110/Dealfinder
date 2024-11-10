// src/components/Auth/Logout.tsx
import { auth } from '../../utils/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/auth/signin');
  };

  return (
    <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
      Logout
    </button>
  );
};

export default Logout;
