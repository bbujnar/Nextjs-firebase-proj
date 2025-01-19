"use client";

import { useAuth } from "@/app/lib/AuthContext";

function UserAvatar({ size = "60" }) {
  const { user } = useAuth(); 

  const photoURL = user?.photoURL || "https://via.placeholder.com/150";

  return (
    <div className={`w-${size} h-${size} rounded-full overflow-hidden`}>
      <img
        src={photoURL}
        alt="User Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default UserAvatar;
