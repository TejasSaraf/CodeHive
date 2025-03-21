"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Rightbar from "../pages/Rightbar";
import Homepage from "./Homepage";
import Navigation from "../pages/Navigation";

export default function ConditionalRendering() {
  const pathName = usePathname();

  if (pathName == "/SignIn") {
    return null;
  }
  return (
    <>
      <Navbar />
      <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
        <div className="px-2 h-screen xxl:px-8 xsm:px-4">
          <Navigation />
        </div>
        <div className="flex-1 lg:min-w-[600px] border-x-[1px] border-borderGrey h-screen0"><Homepage/></div>
        <div className="hidden lg:flex ml-4 md:ml-8 h-screen flex-1">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
