
import React from "react";
import Image from "../components/Image";
import PostInfo from "./PostInfo";
import PostInteraction from "./PostInteraction";
import { imagekit } from "../utils";

interface fileDetailsResponse {
  width: number,
  height: number,
  filePath: string,
  url: string,
  fileType: string,
  customMetaData?: {sensitive: boolean}; 
}

export default function Post() {

  const getFileDetails = (fileId: string): Promise<fileDetailsResponse> => {
    return new Promise((resolve, reject) => {
      imagekit.getFileDetails(fileId, function(error, result) {
        if(error) reject(error);
        else resolve(result as fileDetailsResponse);
      });
    });
  }

  const fileDetails = getFileDetails("67ec2605432c476416f2f3ac");

  return (
    <div className="p-4 border-y-[1px] border-borderGrey">
      {/* Post Content */}
      <div className="flex gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            className="rounded-full"
            path="default-image.jpg"
            alt=""
            w={100}
            h={100}
            tr={true}
          />
        </div>
        {/* content */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Top */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-white font-bold">CodeHive</h1>
              <span className="text-textGrey">@codehive</span>
              <span className="text-textGrey">1 day ago</span>
            </div>
            <PostInfo />
          </div>
          {/* Text & Media */}
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
            impedit vel ullam animi placeat ad et obcaecati cumque ratione,
            nobis error aliquid maiores dolore dolor sint modi illum beatae
            facere.
          </p>
          <Image path="default-image.jpg" alt="" w={600} h={600} />
          <PostInteraction />
        </div>
      </div>
    </div>
  );
}
