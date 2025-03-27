"use client";
import React from "react";
import Feed from "../Feed/page";
import Share from "../Share/page";
import { usePathname } from "next/navigation";
import PostContent from "../PostContent/page";

export default function Homepage() {
  const path = usePathname();

  return (
    <>
      {path === "/" ? (
        <>
          <Share />
          <Feed />
        </>
      ) : (
        <PostContent />
      )}
    </>
  );
}
