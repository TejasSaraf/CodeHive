"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      alert("Signup failed: " + (data.error ?? res.statusText));
      return;
    }
    window.location.href = "/signin";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex w-[30%] flex-col gap-4">
        <h1 className="text-2xl font-600">SignUp</h1>
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <Link href="/signin">Signin</Link>
        </div>

        <div className="flex flex-col">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="p-2 bg-grey-200 border border-grey-100 rounded-md w-100"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 bg-grey-200 border border-grey-100 rounded-md w-100"
            placeholder="xyz@company.com"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 bg-grey-200 border border-grey-100 rounded-md w-100"
            placeholder="**********"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-2 bg-grey-200 border border-grey-100 rounded-md w-100"
            placeholder="**********"
            required
          />
        </div>

        <button
          type="submit"
          className="flex justify-center items-center bg-primary rounded-md h-12 mr-2 text-white"
          onClick={handleSubmit}
        >
          Create Account
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="flex justify-center items-center border border-primary rounded-md h-12 mr-2"
        >
          Signin with Google
        </button>

        <button
          type="button"
          className="flex justify-center items-center border border-primary rounded-md h-12 mr-2"
        >
          Signin with Github
        </button>
      </form>
    </div>
  );
}
