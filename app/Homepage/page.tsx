"use client";
import React from "react";
import Feed from "../components/Feed";
import Share from "../components/Share";
import { usePathname } from "next/navigation";
import PostContent from "../components/PostContent";

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
