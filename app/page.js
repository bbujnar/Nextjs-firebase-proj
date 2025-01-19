"use client";

import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/app/lib/AuthContext";
export default function Home() {
  const { user } = useAuth(); 
  return (
    <>
    <h1>Home</h1>
    {user ? (
        <UserAvatar />
      ) : (
            <></>      )}
    </>
  );
}
