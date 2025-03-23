import React from "react";
import Image from "./Image";

export default function Share() {
  return (
    <div className="p-4 flex gap-4">
      <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
        <Image path="/default-image.jpg" w={100} h={100} alt="" />
      </div>

      <div className="flex flex-1 flex-col gap-4 cursor-pointer">
        <div className="flex items-center border-[1px] border-borderGrey bg-inoutGrey w-100 h-12 rounded-md">
          <p className="p-2 text-white">Write your text here</p>
        </div>

        <div className="flex align-center border-[1px] border-borderGrey bg-inoutGrey w-100 h-12 rounded-md justify-between items-center p-4">
          <p className="text-white">Add to your post</p>
          <div className="flex gap-2 align-center justify-center">
            <button className="flex flex-col items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 18L8 5H7L3 18M4.23077 14H10.7692M14.5 10C16 9 20 8 20 11.5C20 15 20 18 20 18M20 12.5C18.5 13 14 13 14 16C14 19 18.5 18 20 15.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-white text-sm">Text</p>
            </button>

            <button className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 7.99997L3 12L8 16M16 16L21 12L16 7.99997"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-white text-sm">Code</p>
            </button>

            <button className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="black"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list-plus transition-transform duration-200 group-hover:-translate-y-0.5"
              >
                <path d="M11 12H3"></path>
                <path d="M16 6H3"></path>
                <path d="M16 18H3"></path>
                <path d="M18 9v6"></path>
                <path d="M21 12h-6"></path>
              </svg>
              <p className="text-white text-sm"> Collection</p>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-500 px-2 py-1 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                d="M12 7.20001L12 16.8M16.8 12L7.20001 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-white font-base">Add Post</span>
          </button>
        </div>
      </div>
    </div>
  );
}
