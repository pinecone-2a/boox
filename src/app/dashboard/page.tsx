"use client";

import type { Book } from "../types/types";
import { useState, useEffect } from "react";
import { Swipe, User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { BookCard } from "../swipe/swipe";
import { Bar } from "../profile/bar";

export type MatchWithDetails = Match & {
  like1: Swipe & { book: Book; user: User };
  like2: Swipe & { book: Book; user: User };
};
export type Match = {
  book1: Book;
  book2: Book;
};
export default function BookLists() {

  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`/api/suggestion-books`);
        const data = await response.json();
        setBooks(data);
      } catch (err) {}
    }
    fetchBooks();
  }, []);

  return (
    <div className="w-full h-full bg-background">
      <div className="grid h-[500px] w-full place-items-center">
        <Skeleton className="absolute h-96 w-72 bg-zinc-300" />
        {books.length > 0 &&
          books
            .map((book) => {
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  setBooks={setBooks}
                />
              );
            })
            .reverse()}
      </div>
      <div className="h-20">
        <Bar />
      </div>
    </div>
  );
}
