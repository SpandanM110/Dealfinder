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
      <Link href="/" legacyBehavior>
        <a className={`text-xl font-bold ${isActive('/') ? 'underline' : ''}`}>
          DealFinder
        </a>
      </Link>

      <div className="flex space-x-4">
        <Link href="/" legacyBehavior>
          <a className={`${isActive('/') ? 'underline' : ''}`}>Home</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={`${isActive('/about') ? 'underline' : ''}`}>About</a>
        </Link>

        {!loading && !user && (
          <>
            <Link href="/auth/signin" legacyBehavior>
              <a className={`${isActive('/auth/signin') ? 'underline' : ''}`}>Sign In</a>
            </Link>
            <Link href="/auth/signup" legacyBehavior>
              <a className={`${isActive('/auth/signup') ? 'underline' : ''}`}>Sign Up</a>
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
