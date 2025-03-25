"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Rightbar from "../Rightbar/page";
import Homepage from "../Homepage/page";
import Navigation from "../Navigation/page";
import PostContent from "../PostContent/page";

export default function ConditionalRendering() {
  const pathName = usePathname();

  if (pathName === "/SignIn") {
    return null;
  }

  return (
    <>
      <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
        <div className="px-2 h-screen xxl:px-8 xsm:px-4">
          <Navigation />
        </div>
        <div className="flex-1 lg:min-w-[600px] border-x-[1px] border-borderGrey h-screen overflow-y-auto">
          {pathName === "/PostContent" ? <PostContent /> : <Homepage />}
        </div>
        <div className="hidden lg:flex ml-4 md:ml-8 h-screen flex-1">
          <Rightbar />
        </div>
      </div>
    </>
  );
}