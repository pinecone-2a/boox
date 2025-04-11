"use client";

import type { Book } from "../types/types";
import { useState, useEffect } from "react";
import { Swipe, User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { BookCard } from "../swipe/swipe";
import { Bar } from "../profile/bar";
import LoadingSkeleton from "../loading";
import { SignedIn } from "@clerk/nextjs";
import SignupHandler from "../_components/signup";

export type MatchWithDetails = Match & {
  like1: Swipe & { book: Book; user: User };
  like2: Swipe & { book: Book; user: User };
};
export type Match = {
  book1: Book;
  book2: Book;
};
export default function BookLists() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`/api/suggestion-books`);
        const data = await response.json();
        setBooks(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);
  return (
    <div className="w-full h-full bg-background flex justify-center items-center pb-10 box-border">
      <SignedIn>
        <SignupHandler />
      </SignedIn>
      {isLoading ? (
        <Skeleton className="absolute h-96 aspect-3/4 sm:h-96 xl:h-120 bg-zinc-300" />
      ) : (
        <div className="absolute h-74 aspect-3/4 sm:h-96 xl:h-120 bg-zinc-300 rounded-md flex justify-center items-center">
          No more books left to swipe!
        </div>
      )}

      {books.length > 0 &&
        books
          .map((book) => {
            return <BookCard key={book.id} book={book} setBooks={setBooks} />;
          })
          .reverse()}
      <div className="h-20">
        <Bar />
      </div>
    </div>
  );
}
