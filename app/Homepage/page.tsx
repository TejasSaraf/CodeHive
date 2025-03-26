import React, { useState } from "react";
import Feed from "../Feed/page";
import Share from "../Share/page";
import PostContent from "../PostContent/page"; 

export default function Homepage() {
  const [showPostContent, setShowPostContent] = useState(false);

  return (
    <>
      {!showPostContent ? (
        <>
          <Share onOpenPost={() => setShowPostContent(true)} />
          <Feed />
        </>
      ) : (
        <PostContent onGoBack={() => setShowPostContent(false)} />
      )}
    </>
  );
}
