// app/components/Navbar.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="nav flex h-14 w-100 justify-center justify-between p-2 m-3 border-b-[1px] border-borderGrey max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
      <div className="flex flex-row justify-center items-center">
        <Image
          src="/CH.png"
          width={100}
          height={150}
          alt="CodeHive Logo"
        />
        <h1 className="font-display text-white text-3xl font-semibold">
          CodeHive
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {!isLoading && (
          user ? (
            <div className="flex items-center gap-4">
              <span className="text-white">{user.name}</span>
              <a 
                href="/api/auth/logout"
                className="text-white hover:text-gray-300"
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link 
                href="/signup"
                className=" hover:text-gray-300"
              >
                Signup
              </Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
}