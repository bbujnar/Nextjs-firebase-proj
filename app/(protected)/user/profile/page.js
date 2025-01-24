"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const auth = getAuth();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      displayName: "",
      photoURL: "",
      street: "",
      city: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/user/login");
      } else {
        setUser(currentUser);
        try {
          const snapshot = await getDoc(doc(db, "users", currentUser.uid));
          if (snapshot.exists()) {
            const address = snapshot.data().address || {};
            setValue("street", address.street || "");
            setValue("city", address.city || "");
            setValue("zipCode", address.zipCode || "");
          }

          setValue("email", currentUser.email || "");
          setValue("displayName", currentUser.displayName || "");
          setValue("photoURL", currentUser.photoURL || "");
        } catch (e) {
          console.error("Error fetching address:", e);
          setError("Failed to load user address.");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router, setValue]);

  const onSubmit = async (data) => {
    if (!user) {
      setError("You need to be logged in to update your profile.");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      await setDoc(doc(db, "users", user.uid), {
        address: {
          street: data.street,
          city: data.city,
          zipCode: data.zipCode,
        },
      });

      setError("");
      router.push("/");
    } catch (e) {
      console.error("Error updating profile:", e);
      setError("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Edit Profile
        </h1>

        {error && (
          <div className="text-red-700 bg-red-100 border border-red-400 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6">
          {/* Display Name */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              {...register("displayName", {
                required: "Display name is required",
              })}
              type="text"
              id="displayName"
              className="mt-1 w-full rounded-lg border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-red-500">
              {errors.displayName?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              readOnly
              className="mt-1 w-full rounded-lg border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photoURL"
              className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              {...register("photoURL", { required: "Photo URL is required" })}
              type="url"
              id="photoURL"
              className="mt-1 w-full rounded-lg border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-red-500">{errors.photoURL?.message}</p>
          </div>

          {/* Address fields */}
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              {...register("street", { required: "Street is required" })}
              type="text"
              id="street"
              className="mt-1 w-full rounded-lg border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-red-500">{errors.street?.message}</p>
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register("city", { required: "City is required" })}
              type="text"
              id="city"
              className="mt-1 w-full rounded-lg border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-red-500">{errors.city?.message}</p>
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              {...register("zipCode", { required: "ZIP Code is required" })}
              type="text"
              id="zipCode"
              className="mt-1 w-full rounded-lg border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-red-500">{errors.zipCode?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}
