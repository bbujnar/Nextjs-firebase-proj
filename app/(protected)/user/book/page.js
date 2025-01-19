"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
export default function AddBook() {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const onSubmit = async (data) => {
    if (!user) {
      setError("You need to be logged in to add a book.");
      setLoading(false);
      return;
    }
    try {
      await addDoc(collection(db, "books"), {
        add_date: serverTimestamp(),
        isbn: data.isbn,
        title: data.title,
        user: `/users/${user.uid}`,
      });
      setSuccess("Book added successfully!");
      setError("");
      router.push("/");
    } catch (e) {
      console.error("Error adding book:", e);
      setError("An error occurred while adding the book.");
    }
  };
  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Add a New Book
        </h1>
        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-500 bg-green-100 p-4 rounded-md mb-4">
            {success}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6">
          {/* ISBN */}
          <div>
            <label
              htmlFor="isbn"
              className="block text-sm font-medium text-gray-700">
              ISBN
            </label>
            <input
              {...register("isbn", { required: "ISBN is required" })}
              type="text"
              id="isbn"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.isbn?.message}</p>
          </div>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              id="title"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.title?.message}</p>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Add Book
          </button>
        </form>
      </div>
    </section>
  );
}
