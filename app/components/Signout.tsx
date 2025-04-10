"use client";

import React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define a style type that extends React.CSSProperties so custom properties are allowed.
type CustomCSSProperties = React.CSSProperties & { [key: `--${string}`]: string | number };

const popperStyle: CustomCSSProperties = {
  width: "16%",
  height: "30%",
  position: "fixed",
  borderRadius: "8px",
  left: "0px",
  top: "0px",
  transform: "translate(1162px, 75.5px)",
  minWidth: "max-content",
  willChange: "transform",
  zIndex: 50,
  background: "rgb(32 35 39 / 68%)",
  "--radix-popper-transform-origin": "100% 313.539px",
  "--radix-popper-available-width": "288px",
  "--radix-popper-available-height": "887px",
  "--radix-popper-anchor-width": "32.296875px",
  "--radix-popper-anchor-height": "40px",
};

function Signout() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignout = async () => {
    // Ensure the session and the user's email exist
    if (!session?.user?.email) {
      console.error("User email is not available, cannot log out.");
      return;
    }

    try {
      // Call your logout API endpoint with a safe email string.
      const response = await fetch(
        `/api/logout?email=${encodeURIComponent(session.user.email)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Deletion error:", errorData.message);
        return;
      }
      // After deletion, sign the user out and redirect
      await signOut({ redirect: false });
      router.push("/SignIn");
    } catch (error: unknown) {
      let message = "Unknown error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      console.error("Logout error:", message);
    }
  };

  return (
    <div style={popperStyle}>
      <div className="flex justify-center items-center">
        {session?.user?.image && (
          <div className="flex flex-col items-center p-5 gap-5">
            <div>
              <Image
                src={session.user.image}
                width={40}
                height={40}
                alt="Profile"
                className="rounded-full"
              />
            </div>
            <div className="text-white text-sm">
              {session?.user?.name && <p>Hello {session.user.name}</p>}
            </div>
            <div className="text-white text-sm">
              {session?.user?.email && <p>{session.user.email}</p>}
            </div>
            <button
              className="text-white text-sm px-2 py-2 bg-blue-400 rounded-lg"
              onClick={handleSignout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signout;
