"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault(); 
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      router.push("/"); 
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <button
        type="submit"
        className="rounded-md border border-red-600 bg-red-600 px-6 py-3 text-white font-medium hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
      >
        Wyloguj
      </button>
    </form>
  );
}
