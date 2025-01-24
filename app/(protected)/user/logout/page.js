"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      router.push("/");
    } catch (error) {
      setError("An error occurred while signing out. Please try again.");
      console.error("Error signing out:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className={`rounded-md border px-6 py-3 text-white font-medium transition ${
          isLoading
            ? "border-gray-400 bg-gray-400 cursor-not-allowed"
            : "border-red-600 bg-red-600 hover:bg-transparent hover:text-red-600"
        }`}>
        {isLoading ? "Wylogowywanie..." : "Wyloguj"}
      </button>
    </form>
  );
}
