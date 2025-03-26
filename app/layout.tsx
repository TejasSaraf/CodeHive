import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalRendering from "./components/ConditionalRendering";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeHive",
  description: "CodeHive platform for developers to build in public",
  icons: {
    icon: "/Users/tejassaraf/Projects/Code/codehive/app/favicon.png",
  },
};

export default function RootLayout({
  children,
  Navigation,
  Rightbar,
  SignIn
}: Readonly<{
  children: React.ReactNode;
  Navigation: React.ReactNode;
  Rightbar: React.ReactNode;
  SignIn: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
        <Navbar />
        <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
          <div className="px-2 h-screen xxl:px-8 xsm:px-4">{Navigation}</div>
          <ConditionalRendering/>
          <div className="hidden lg:flex ml-4 md:ml-8 h-screen flex-1">
            {Rightbar}
          </div>
        </div>
      </body>
    </html>
  );
}