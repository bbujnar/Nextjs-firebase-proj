"use client";

import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function VerifyEmail() {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser.email);

      signOut(auth)
        .then(() => {
          console.log("User signed out");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    } else {
      redirect("/user/login");
    }
  }, [auth, router]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Email Not Verified
        </h1>
        <p className="text-gray-700">
          Please verify your email by clicking the link sent to your address:{" "}
          <span className="font-medium">{email}</span>.
        </p>
        <p className="text-gray-500 mt-4">
          After verifying your email, please log in again to access your account.
        </p>
      </div>
    </section>
  );
}
