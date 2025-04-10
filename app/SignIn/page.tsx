"use client";

import { signIn } from "next-auth/react";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already signed in
  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  if (status === "loading" || session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen w-full">
      <div className="leftPanel bg-black w-1/2 flex items-center justify-center">
        <h1 className="font-display text-3xl text-white font-bold">CodeHive</h1>
      </div>
      <div className="rightPanel bg-white w-1/2 flex items-center justify-center gap-5 flex-col">
        <div className="text-3xl font-bold font-display">Welcome Back</div>
        <p className="text-base font-sans text-left font-300">
          SignIn to continue your growth journey
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex bg-white-500 text-black text-xl gap-2 border border-[rgb(229,229,229)] px-6 py-1 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            className="crayons-icon crayons-icon--default"
          >
            <path
              d="M18.09 18.75c2.115-1.973 3.052-5.25 2.49-8.393h-8.392v3.473h4.777a3.945 3.945 0 0 1-1.777 2.67l2.902 2.25Z"
              fill="#4285F4"
            />
            <path
              d="M4.215 15.982A9 9 0 0 0 18.09 18.75l-2.902-2.25a5.37 5.37 0 0 1-8.018-2.813l-2.955 2.296Z"
              fill="#34A853"
            />
            <path
              d="M7.17 13.687c-.375-1.17-.375-2.25 0-3.42L4.215 7.965a9.06 9.06 0 0 0 0 8.025l2.955-2.303Z"
              fill="#FBBC02"
            />
            <path
              d="M7.17 10.267c1.035-3.24 5.438-5.115 8.393-2.347l2.58-2.528A8.85 8.85 0 0 0 4.215 7.965l2.955 2.302Z"
              fill="#EA4335"
            />
          </svg>
          <span className="flex font-sans text-base items-center justify-center">
            Continue with Google
          </span>
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex bg-white-500 text-black text-xl gap-2 border border-[rgb(229,229,229)] px-6 py-1 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            className="crayons-icon crayons-icon--default"
          >
            <path
              d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"
              fill="#171717"
            />
          </svg>
          <span className="flex font-sans text-base items-center justify-center">
            Continue with Github
          </span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="font-sans bg-background px-small text-muted-foreground rounded-sm">
              OR
            </span>
          </div>
        </div>

        <Link
          className="font-sans flex bg-white text-base text-black gap-2 border border-[#e5e5e5] px-6 py-1 rounded-lg"
          href="/"
        >
          Continue as Guest
        </Link>
      </div>
    </div>
  );
}
