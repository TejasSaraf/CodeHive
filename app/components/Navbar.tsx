"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    router.push("/SignIn");
  };

  return (
    <nav className="nav flex h-14 w-100 justify-center justify-between p-2 m-3 border-b-[1px] border-borderGrey max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
      <div className="flex flex-row justify-center items-center">
        <Image
          className=""
          src="/CH.png"
          width={100}
          height={150}
          alt="Picture of the author"
        />
        <h1 className="font-display text-white text-3xl font-semibold">
          CodeHive
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            width={40}
            height={40}
            alt="Profile"
            className="rounded-full"
          />
        ) : (
          <button
            type="button"
            className="font-sans text-white text-xl border-[1px] border-borderGrey rounded-lg px-4 py-1"
            onClick={handleSignIn}
          >
            Signin
          </button>
        )}
      </div>
    </nav>
  );
}
