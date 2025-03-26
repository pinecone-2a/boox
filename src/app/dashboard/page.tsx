"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Book } from "../types/types";
import { useState, useEffect } from "react";
import { Swipe, User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { BookCard } from "../swipe/swipe";
import { SignedIn } from "@clerk/nextjs";
import SignupHandler from "../_components/signup";
import { Bar } from "../profile/bar";

type MatchWithDetails = Match & {
  like1: Swipe & { book: Book; user: User };
  like2: Swipe & { book: Book; user: User };
};
type Match = {
  book1: Book;
  book2: Book;
};
export default function BookLists() {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingLike, setLoadingLike] = useState<boolean>(true);
  const [loadingMatch, setLoadingMatch] = useState<boolean>(true);

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

  async function fetchMatches() {
    try {
      const response = await fetch(`/api/match`);
      const data = await response.json();
      const extractedBooks: Match[] = data.flatMap(
        (match: MatchWithDetails) => [
          {
            book1: match.like1.book,
            book2: match.like2.book,
          },
        ]
      );
      setMatches([...matches, ...extractedBooks]);
    } catch (err) {
    } finally {
      setLoadingLike(false);
      setLoadingLike(false);
    }
  }

  async function fetchLikedBooks() {
    try {
      const response = await fetch(`/api/liked-books`);
      const data = await response.json();
      setLikedBooks(data);
    } catch (err) {
    } finally {
      setLoadingMatch(false);
    }
  }
  useEffect(() => {
    fetchLikedBooks();
    fetchMatches();
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
                  fetchLikedBooks={fetchLikedBooks}
                  fetchMatches={fetchMatches}
                />
              );
            })
            .reverse()}
      </div>
      <BookSection
        sectionName="Liked"
        bookList={likedBooks}
        loading={loadingLike}
      />
      <MachedBooksSection
        sectionName="Matches"
        matchList={matches}
        loading={loadingMatch}
      />
      <div className="h-20">
        <Bar />
      </div>
    </div>
  );
}

function BookSection({
  sectionName,
  bookList,
  loading,
}: {
  sectionName: string;
  bookList: Book[];
  loading: boolean;
}) {
  return (
    <div className="mb-6 lg:h-[300px]">
      <SignedIn>
        <SignupHandler />
      </SignedIn>
      <h2 className="text-2xl font-bold mb-2 ml-6">{sectionName}</h2>
      <Carousel className="w-full h-full bg-yellow-400">
        <CarouselContent>
          {loading ? (
            <CarouselItem className="basis-1/5 p-2 flex justify-center">
              <Skeleton className="w-full h-full bg-zinc-300" />
            </CarouselItem>
          ) : null}
          {bookList.map((book: Book, index: number) => (
            <CarouselItem
              key={index}
              className="basis-1/5 p-2 flex-grow-0 flex-shrink-0 min-w-[50px] sm:min-w-[60px] lg:min-size-20"
            >
              <div className="relative  w-full aspect-[3/4] rounded-lg ">
                <img
                  src={book.cover}
                  alt={`${sectionName} book ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg ml-2"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function MachedBooksSection({
  sectionName,
  matchList,
  loading,
}: {
  sectionName: string;
  matchList: Match[];
  loading: boolean;
}) {
  const [flippedIndexes, setFlippedIndexes] = useState<boolean[]>([]);

  useEffect(() => {
    setFlippedIndexes(Array(matchList.length).fill(false));
  }, [matchList]);

  const handleClick = (index: number) => {
    setFlippedIndexes((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2 ml-6">{sectionName}</h2>
      <Carousel className="w-full h-full bg-yellow-400">
        <CarouselContent>
          {loading ? (
            <CarouselItem className="basis-1/5  p-2 flex justify-center">
              <div className="relative">
                <Skeleton className="w-full h-full bg-zinc-300" />
                <Skeleton className="w-full h-full bg-zinc-300 absolute top-2 left-2" />
              </div>
            </CarouselItem>
          ) : null}
          {matchList.map((match: Match, index: number) => (
            <CarouselItem
              key={index}
              className="basis-1/5  p-2 flex-grow-0 flex-shrink-0 min-w-[50px] sm:min-w-[60px] md:min-w-[70px] lg:min-w-[80px]"
            >
              <div onClick={() => handleClick(index)}>
                {flippedIndexes[index] ? (
                  <div className="relative aspect-[4/4] rounded-lg">
                    <img
                      src={match.book2.cover}
                      alt={`${sectionName} book ${index + 1}`}
                      className="w-full object-fill rounded-xl shadow-lg"
                    />
                    <img
                      src={match.book1.cover}
                      alt={`${sectionName} book ${index + 1}`}
                      className="w-full object-fill rounded-xl shadow-lg absolute top-3 left-3"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[3/4] rounded-lg ">
                    <img
                      src={match.book1.cover}
                      alt={`${sectionName} book ${index + 1}`}
                      className="w-full object-fill rounded-xl shadow-lg aspect-[3/4] "
                    />
                    <img
                      src={match.book2.cover}
                      alt={`${sectionName} book ${index + 1}`}
                      className="w-58 object-fill rounded-xl shadow-lg absolute top-3 left-3 aspect-[3/4] overflow-hidden"
                    />
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
