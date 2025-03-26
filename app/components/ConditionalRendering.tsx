"use client";

import { usePathname } from "next/navigation";
import Homepage from "../Homepage/page";
import PostContent from "../PostContent/page";

export default function ConditionalRendering() {
  const pathName = usePathname();

  if (pathName === "/SignIn") {
    return null;
  }

  return (
    <>
        <div className="flex-1 lg:min-w-[600px] border-x-[1px] border-borderGrey h-screen overflow-y-auto">
          {pathName === "/PostContent" ? <PostContent onGoBack={function (): void {
          throw new Error("Function not implemented.");
        } } /> : <Homepage />}
        </div>
    </>
  );
}