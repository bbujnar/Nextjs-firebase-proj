"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [newIsbn, setNewIsbn] = useState("");
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const router = useRouter();

  const handleAddBookClick = () => {
    router.push("./book");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setError("You need to be logged in to view your books.");
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const booksCollection = collection(db, "books");
        const userPath = `/users/${currentUser.uid}`;
        const q = query(booksCollection, where("user", "==", userPath));
        const booksSnapshot = await getDocs(q);
        const booksList = booksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksList);
        setError("");
      } catch (e) {
        console.error("Error fetching books:", e);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleEditClick = (book) => {
    setEditingBook(book);
    setNewIsbn(book.isbn);
  };

  const handleSaveClick = async () => {
    if (!editingBook) return;

    try {
      const bookRef = doc(db, "books", editingBook.id);
      await updateDoc(bookRef, { isbn: newIsbn });

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBook.id ? { ...book, isbn: newIsbn } : book
        )
      );

      setEditingBook(null);
      setNewIsbn("");
    } catch (e) {
      console.error("Error updating book:", e);
      setError("Failed to update book. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Books</h1>
        <button
          onClick={handleAddBookClick}
          className="mb-4 rounded-md border border-blue-600 bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
          Add Book
        </button>
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="p-4 border rounded-md shadow-sm hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-800">
                  {book.title}
                </h2>
                <p className="text-gray-600">ISBN: {book.isbn}</p>
                <p className="text-gray-600 text-sm">
                  Added on:{" "}
                  {book.add_date
                    ? new Date(
                        book.add_date.seconds * 1000
                      ).toLocaleDateString()
                    : "Unknown"}
                </p>
                {editingBook?.id === book.id ? (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={newIsbn}
                      onChange={(e) => setNewIsbn(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                    <button
                      onClick={handleSaveClick}
                      className="mt-2 rounded-md border border-green-600 bg-green-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500">
                      Save
                    </button>
                    <button
                      onClick={() => setEditingBook(null)}
                      className="mt-2 ml-2 rounded-md border border-red-600 bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditClick(book)}
                    className="mt-4 rounded-md border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
