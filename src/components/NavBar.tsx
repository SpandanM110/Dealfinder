// src/components/NavBar.tsx
import Link from 'next/link';
import Logout from './Auth/Logout';
import { useAuth } from './Auth/AuthProvider';
import { useRouter } from 'next/router';

const NavBar = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/" className={`text-xl font-bold ${isActive('/') ? 'underline' : ''}`}>
        DealFinder
      </Link>
      <div>
        {!loading && !user && (
          <>
            <Link href="/auth/signin" className={`mr-4 ${isActive('/auth/signin') ? 'underline' : ''}`}>
              Sign In
            </Link>
            <Link href="/auth/signup" className={`${isActive('/auth/signup') ? 'underline' : ''}`}>
              Sign Up
            </Link>
          </>
        )}
        {!loading && user && (
          <>
            <span className="mr-4">Hello, {user.email}</span>
            <Logout />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
