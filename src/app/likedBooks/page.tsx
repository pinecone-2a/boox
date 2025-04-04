"use client";

import { Bar } from "../profile/bar";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SignedIn } from "@clerk/nextjs";
import SignupHandler from "../_components/signup";
import { Skeleton } from "@/components/ui/skeleton";
import { Match as PrismaMatch, Book, User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Match extends PrismaMatch {
  like1: { book: Book; user: User };
  like2: { book: Book; user: User };
}

export default function Liked() {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingLike, setLoadingLike] = useState<boolean>(true);
  const [loadingMatch, setLoadingMatch] = useState<boolean>(true);

  async function fetchMatches() {
    try {
      const response = await fetch(`/api/match`);
      const data = await response.json();
      setMatches(data);
    } catch (err) {
    } finally {
      setLoadingMatch(false);
    }
  }

  async function fetchLikedBooks() {
    try {
      const response = await fetch(`/api/liked-books`);
      const data = await response.json();
      setLikedBooks(data);
    } catch (err) {
    } finally {
      setLoadingLike(false);
    }
  }
  useEffect(() => {
    fetchLikedBooks();
    fetchMatches();
  }, []);
  return (
    <div className="w-full h-full">
      <BookSection
        sectionName="Liked"
        bookList={likedBooks}
        loading={loadingLike}
      />
      <MachedBooksSection matchList={matches} loading={loadingMatch} />
      <Bar />
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
    <div className="h-[25%] flex flex-col justify-center">
      <h2 className="text-2xl font-bold pl-10">{sectionName}</h2>
      <Dialog>
        <DialogTrigger>
          <div>
            <Carousel className="w-full h-[115px] ">
              <CarouselContent>
                {loading ? (
                  <CarouselItem className="basis-1/5 p-2 flex justify-center">
                    <Skeleton className="w-[64px] h-[110px] bg-zinc-300" />
                  </CarouselItem>
                ) : null}
                {bookList.map((book: Book, index: number) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/5 p-2 flex justify-center  hover:cursor-grab active:cursor-grabbing sm:basis-1/6 md:basis-1/7 lg:basis-1/8 xl:basis-1/9"
                  >
                    <img
                      src={book.cover}
                      alt={`${sectionName} book ${index + 1}`}
                      className="w-[64px] h-[99px] object-cover rounded-md shadow-lg ml-2"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MachedBooksSection({
  matchList,
  loading,
}: {
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
    <div className="h-[75%] w-full pb-12">
      <h2 className="text-2xl font-bold pl-10">Match</h2>
      <div className="h-full p-4 shadow-md w-full flex flex-col overflow-y-scroll">
        {loading ? (
          <div className="basis-1/5  p-4 flex justify-start items-center w-full">
            <div className="border-2 cursor-pointer p-3 min-w-70 w-full rounded-lg bg-background mb-5 flex">
              <div className="relative flex">
                <Skeleton className="w-[64px] h-[99px] bg-zinc-300" />
                <Skeleton className="w-[64px] h-[99px] bg-zinc-300 absolute top-2 left-2" />
                <div className="p-4 font-bold text-foreground">
                  <Skeleton className="w-30 h-4 bg-zinc-300" />
                  <div className="text-muted-foreground">for</div>
                  <Skeleton className="w-30 h-4 bg-zinc-300" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {matchList.map((match: Match, index: number) => (
          <div
            key={index}
            className="basis-1/5  p-4 flex justify-start items-center w-full"
          >
            <div
              onClick={() => handleClick(index)}
              className="border-2 cursor-pointer p-3 min-w-70 w-full rounded-lg bg-background mb-5 flex"
            >
              {flippedIndexes[index] ? (
                <div className="relative flex gap-3">
                  <img
                    src={match.like1?.book.cover}
                    alt={`Match book ${index + 1}`}
                    className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg ml-2"
                  />
                  <img
                    src={match.like2?.book.cover}
                    alt={`Match book ${index + 1}`}
                    className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg ml-2 absolute top-3 left-3"
                  />
                  <div className="p-4 font-bold text-foreground">
                    {match.like1.book.title}
                    <div className="text-muted-foreground">for</div>
                    {match.like2.book.title}
                  </div>
                </div>
              ) : (
                <div className="relative flex gap-3">
                  <img
                    src={match.like2?.book.cover}
                    alt={`Match book ${index + 1}`}
                    className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg ml-2"
                  />
                  <div className="p-4 font-bold text-foreground">
                    {match.like1.book.title}
                    <div className="text-muted-foreground">for</div>
                    {match.like2.book.title}
                  </div>
                  <img
                    src={match.like1?.book.cover}
                    alt={`Match book ${index + 1}`}
                    className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg ml-2 absolute top-3 left-3"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
