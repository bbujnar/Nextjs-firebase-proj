"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

// Wymuszenie dynamicznego renderowania
export const dynamic = "force-dynamic";

export default function EditBook({ book, onUpdate, onCancel }) {
  const [isbn, setIsbn] = useState(book?.isbn || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (book?.isbn) {
      setIsbn(book.isbn);
    }
  }, [book]);

  const handleSave = async () => {
    if (!isbn.trim()) {
      setError("ISBN cannot be empty.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const bookRef = doc(db, "books", book.id);
      await updateDoc(bookRef, { isbn });

      onUpdate({ ...book, isbn });
    } catch (e) {
      console.error("Error updating book:", e);
      setError("Failed to update the book. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!book) {
    return (
      <p className="text-red-500">
        Error: Book data is not available. Please try again.
      </p>
    );
  }

  return (
    <div className="p-6 bg-white border rounded-md shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Book</h2>
      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded-md mb-4">{error}</p>
      )}
      <div className="mb-4">
        <label
          htmlFor="isbn"
          className="block text-sm font-medium text-gray-700 mb-1">
          ISBN
        </label>
        <input
          type="text"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          disabled={saving}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md border border-green-600 bg-green-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500">
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onCancel}
          disabled={saving}
          className="rounded-md border border-red-600 bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
