"use client";

import React, { useRef, useState, startTransition } from "react";
import { createPost } from "@/app/(actions)/createPost"; 
import { useRouter } from "next/navigation";
import { shareAction } from "../actions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Editor from "@monaco-editor/react";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ConfirmModal from "./ConfirmModal";

export default function PostContent() {
  const [activeSection, setActiveSection] = useState("text");
  const [media, setMedia] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [showConfirmModel, setShowConfirmModel] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-1 focus:outline-none",
      },
    },
  });

  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  const navigateToCode = () => {
    setActiveSection("code");
  };

  const navigateToText = () => {
    setActiveSection("text");
  };

  const navigateToCollection = () => {
    setActiveSection("collection");
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMedia(file);
      setMediaUrl(URL.createObjectURL(file));

      e.target.form?.requestSubmit();
    }
  };

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState({
    javascript: "// JavaScript Code\nconsole.log('Hello, world!');",
    python: "# Python Code\nprint('Hello, world!')",
    cpp: '// C++ Code\n#include <iostream>\nint main() {\n  std::cout << "Hello, world!";\n  return 0;\n}',
  });

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode((prev) => ({ ...prev, [language]: value }));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const pushPostData = () => {
     if (!editor) return;                       // editor might not be ready
    
    const html    = editor.getHTML();          // rich text to store
    const summary = editor.getText().slice(0, 255); // short desc (optional)
    
    startTransition(() => {
    createPost(html, summary)
    .then(() => router.push("/"))          // navigate to feed
    .catch(err => console.error(err));     // TODO: surface error toasts
    });
    };

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          <button onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_2425_46)">
                <rect width="24" height="24" fill="black" />
                <path
                  d="M19 11H7.14L10.77 6.64C10.9397 6.43578 11.0214 6.1725 10.997 5.90808C10.9726 5.64365 10.8442 5.39974 10.64 5.23C10.4358 5.06026 10.1725 4.9786 9.90808 5.00298C9.64365 5.02736 9.39974 5.15578 9.23 5.36L4.23 11.36C4.19636 11.4077 4.16628 11.4579 4.14 11.51C4.14 11.56 4.14 11.59 4.07 11.64C4.02467 11.7547 4.00094 11.8767 4 12C4.00094 12.1233 4.02467 12.2453 4.07 12.36C4.07 12.41 4.07 12.44 4.14 12.49C4.16628 12.5421 4.19636 12.5923 4.23 12.64L9.23 18.64C9.32402 18.7529 9.44176 18.8437 9.57485 18.9059C9.70793 18.9681 9.85309 19.0002 10 19C10.2337 19.0005 10.4601 18.9191 10.64 18.77C10.7413 18.6861 10.825 18.583 10.8863 18.4666C10.9477 18.3503 10.9855 18.223 10.9975 18.092C11.0096 17.961 10.9957 17.8289 10.9567 17.7033C10.9176 17.5777 10.8542 17.461 10.77 17.36L7.14 13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_2425_46">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <h1 className="text-white text-xl font-bold">Create a Post</h1>
        </div>

        <div className="">
          <button className="px-4 py-1 bg-blue-600 text-sm text-white rounded-lg" onClick={pushPostData}>
            Post
          </button>
        </div>
      </div>

      {activeSection === "text" && (
        <div className="text bg-[#1a1a1a] rounded-lg p-2 border border-x-[1px] border-white w-full h-2/3">
          <div className="flex iems-center gap-2 border-b border-borderGrey">
            <div className="flex items-center gap-2 p-2">
              <button
                onClick={() => {
                  if (editor) editor.chain().focus().toggleBold().run();
                }}
                className={`bold ${
                  editor?.isActive("bold") ? "bg-white text-black" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-5"
                >
                  <rect width="24" height="24" fill="rgb(26 26 26)" />
                  <path
                    d="M6 12V20H14.1C16.2539 20 18 18.2091 18 16C18 13.7909 16.2539 12 14.1 12H6ZM6 12H12.9C15.0539 12 16.8 10.2091 16.8 8C16.8 5.79086 15.0539 4 12.9 4H6V12Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (editor) editor.chain().focus().toggleItalic().run();
                }}
                className={`italic ${
                  editor?.isActive("italic") ? "bg-white text-black" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-5"
                >
                  <g clipPath="url(#clip0_2426_55)">
                    <rect width="24" height="24" fill="rgb(26 26 26)" />
                    <path
                      d="M11 5H17"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 19H13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 5L10 19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2426_55">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button
                onClick={() => {
                  if (editor) editor.chain().focus().toggleUnderline().run();
                }}
                className={`underline ${
                  editor?.isActive("underline") ? "bg-white text-black" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-5"
                >
                  <rect width="24" height="24" fill="rgb(26 26 26)" />
                  <path
                    d="M6 3V12C6 15.3223 8.67773 18 12 18C15.3223 18 18 15.3223 18 12V3H16.5V12C16.5 14.5283 14.5283 16.5 12 16.5C9.47168 16.5 7.5 14.5283 7.5 12V3H6ZM4.5 19.5V21H19.5V19.5H4.5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <div className="heading flex items-center">
              <button
                onClick={() => {
                  if (editor)
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={`heading ${
                  editor?.isActive("heading", { level: 1 })
                    ? "bg-white text-black"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heading w-4 h-5"
                >
                  <path d="M6 12h12"></path>
                  <path d="M6 20V4"></path>
                  <path d="M18 20V4"></path>
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
                className={`${
                  editor?.isActive("orderedList") ? "bg-white text-black" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list-ordered w-4 h-5"
                >
                  <line x1="10" x2="21" y1="6" y2="6"></line>
                  <line x1="10" x2="21" y1="12" y2="12"></line>
                  <line x1="10" x2="21" y1="18" y2="18"></line>
                  <path d="M4 6h1v4"></path>
                  <path d="M4 10h2"></path>
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                </svg>
              </button>

              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`${
                  editor?.isActive("bulletList") ? "bg-white text-black" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list w-4 h-5"
                >
                  <line x1="8" x2="21" y1="6" y2="6"></line>
                  <line x1="8" x2="21" y1="12" y2="12"></line>
                  <line x1="8" x2="21" y1="18" y2="18"></line>
                  <line x1="3" x2="3.01" y1="6" y2="6"></line>
                  <line x1="3" x2="3.01" y1="12" y2="12"></line>
                  <line x1="3" x2="3.01" y1="18" y2="18"></line>
                </svg>
              </button>

              <button
                className="delete"
                onClick={() => setShowConfirmModel(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash2 w-4 h-5"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
              </button>
              {showConfirmModel && (
                <ConfirmModal
                  message="Are you sure you want to clear all text content?"
                  onConfirm={() => {
                    editor?.commands.clearContent();
                    setShowConfirmModel(false);
                  }}
                  onCancel={() => setShowConfirmModel(false)}
                />
              )}
            </div>
          </div>

          <div className="editor-wrapper text-white ">
            <EditorContent editor={editor} />
          </div>
        </div>
      )}

      {activeSection === "code" && (
        <div className="code bg-[#1a1a1a] rounded-lg p-2 border border-x-[1px] border-white w-full h-2/3">
          <div className="flex flex-col gap-2 w-full h-full">
            <div className="bg-[#1a1a1a] rounded-lg w-full h-full">
              <div className="flex items-center justify-between p-2">
                <div className="flex gap-2 justify-center items-center">
                  <label
                    htmlFor="language"
                    className="text-white font-semibold"
                  >
                    Language:
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={handleLangChange}
                    className="p-2 bg-gray-800 text-white rounded-md"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
              </div>
              <Editor
                height="400px"
                language={language}
                value={code[language as keyof typeof code]}
                theme="vs-dark"
                onChange={handleCodeChange}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {activeSection === "collection" && (
        <form
          className="collection bg-[#1a1a1a] rounded-lg p-2 border border-x-[1px] border-white w-full h-2/3"
          action={(formData) =>
            shareAction(formData, {
              type: "original",
              sensitive: false,
            })
          }
        >
          <div className="flex items-center gap-2 p-2 border-b border-borderGrey">
            <input
              className="flex h-8 w-full rounded-md border border-input bg-[#1a1a1a] px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              placeholder="Search collections..."
              type="text"
            />
            <div className="flex gap-2 items-center">
              <input
                type="file"
                className="hidden"
                onChange={handleMediaChange}
                ref={fileInputRef}
                id="file"
                name="file"
              />
              <button
                type="submit"
                className="flex items-center bg-blue-600 px-3 py-1 rounded text-white"
                onClick={triggerFileInput}
              >
                Add Collection
              </button>
            </div>
          </div>
          <div className="post">
            {mediaUrl && <img src={mediaUrl} alt="Uploaded file" />}
          </div>
        </form>
      )}

      <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-2 border border-x-[1px] border-borderGrey w-full h-14 ">
        <p className="text-white">Add to your post</p>
        <div className="flex gap-4 align-center justify-center">
          <button
            className="flex flex-col items-center "
            onClick={navigateToText}
          >
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

          <button
            className="flex flex-col items-center"
            onClick={navigateToCode}
          >
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

          <button
            className="flex flex-col items-center "
            onClick={navigateToCollection}
          >
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
    </div>
  );
}
