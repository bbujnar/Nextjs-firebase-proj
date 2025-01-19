"use client";
import { useRouter } from "next/navigation";
import { getAuth,updateProfile } from "firebase/auth";
import {  useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter(); 

  if (!user) {
    return <p>Loading...</p>; 
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    },
  });

  const [error, setError] = useState("");

  const onSubmit = (data) => {
    updateProfile(user, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => {
        console.log("Profile updated");
        setError(""); 
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              {...register("displayName", { required: "Display name is required" })}
              type="text"
              id="displayName"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.displayName?.message}</p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email 
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              readOnly
              className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              {...register("photoURL", { required: "Photo URL is required" })}
              type="url"
              id="photoURL"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.photoURL?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}
