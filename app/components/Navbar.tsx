'use client';

import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/SignIn');
  };

  return (
    <nav className="nav flex h-12 w-100 justify-center justify-between m-3">
      <h1 className="font-display text-white text-xl font-medium">CodeHive</h1>

      <button
        type="button" 
        className="font-sans text-white text-xl"
        onClick={handleSignIn}
      >
        Signin
      </button>
    </nav>
  );
}