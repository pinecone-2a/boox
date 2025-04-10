"use client";

import { useState, useEffect } from "react";
import { Bar } from "../profile/bar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Match as PrismaMatch, Book, User } from "@prisma/client";

interface Match extends PrismaMatch {
  like1: { book: Book; user: User };
  like2: { book: Book; user: User };
}

export default function Liked() {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingLike, setLoadingLike] = useState(true);
  const [loadingMatch, setLoadingMatch] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [likedRes, matchRes] = await Promise.all([
          fetch("/api/liked-books"),
          fetch("/api/match"),
        ]);
        const likedData = await likedRes.json();
        const matchData = await matchRes.json();
        setLikedBooks(likedData);
        setMatches(matchData);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoadingLike(false);
        setLoadingMatch(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <BookSection
        sectionName="Liked"
        bookList={likedBooks}
        loading={loadingLike}
      />
      <MatchedBooksSection matchList={matches} loading={loadingMatch} />
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
    <div className="min-h-[140px] flex flex-col justify-start px-6 py-4">
      <h2 className="text-2xl font-bold mb-3">{sectionName}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {loading ? (
            <CarouselItem className="basis-1/5 p-2 flex justify-center">
              <Skeleton className="w-[64px] h-[99px] bg-zinc-300" />
            </CarouselItem>
          ) : (
            bookList.map((book) => <BookCard key={book.id} book={book} />)
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const [profileUrl, setProfileUrl] = useState("/profile.jpg");

  const fetchUserImage = async () => {
    try {
      const res = await fetch(`/api/user?userId=${book.owner?.clerkId}`);
      const data = await res.json();
      if (data?.imageUrl) setProfileUrl(data.imageUrl);
    } catch {
      setProfileUrl("/profile.jpg");
    }
  };

  return (
    <CarouselItem className="basis-1/5 p-2 flex justify-center relative">
      <Dialog>
        <DialogTrigger onClick={fetchUserImage}>
          <img
            src={book.cover}
            alt={book.title}
            className="w-[64px] h-[99px] object-cover rounded-lg shadow-lg hover:cursor-pointer"
            onError={(e) => (e.currentTarget.src = "/fallback-book.jpg")}
          />
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{book.title}</DialogTitle>
            <DialogDescription>
              {book.author || "Unknown Author"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <img
              src={book.cover}
              alt={book.title}
              className="rounded-lg w-[140px] h-auto object-cover shadow"
            />
            <p className="text-sm text-muted-foreground">{book.description}</p>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">Owner:</span>
              <div className="flex items-center gap-2 mt-2">
                {profileUrl ? (
                  <img
                    src={profileUrl}
                    alt="User profile"
                    className="w-12 h-12 rounded-full border shadow"
                  />
                ) : (
                  <Skeleton className="w-12 h-12 bg-zinc-300 rounded-full" />
                )}
                <p className="text-sm text-muted-foreground">
                  {book.owner?.name || "Unknown User"}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </CarouselItem>
  );
}

function MatchedBooksSection({
  matchList,
  loading,
}: {
  matchList: Match[];
  loading: boolean;
}) {
  const [flipped, setFlipped] = useState<boolean[]>([]);

  useEffect(() => {
    setFlipped(Array(matchList.length).fill(false));
  }, [matchList]);

  const toggleFlip = (index: number) => {
    setFlipped((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <div className="flex-1 w-full px-6 overflow-y-auto pb-20">
      <h2 className="text-2xl font-bold mb-3">Match</h2>
      <div className="flex flex-col gap-4">
        {loading ? (
          <SkeletonMatchCard />
        ) : (
          matchList.map((match, index) => {
            const front = flipped[index];
            const primary = front ? match.like1.book : match.like2.book;
            const secondary = front ? match.like2.book : match.like1.book;

            return (
              <div
                key={match.id}
                className="cursor-pointer p-3 border rounded-lg bg-background shadow-sm flex items-center gap-4"
                onClick={() => toggleFlip(index)}
              >
                <div className="relative">
                  <img
                    src={primary.cover}
                    alt="Book"
                    className="w-[64px] h-[99px] object-cover rounded-lg shadow"
                  />
                  <img
                    src={secondary.cover}
                    alt="Book"
                    className="w-[64px] h-[99px] object-cover rounded-lg shadow absolute top-1 left-2"
                    style={{ transform: "rotate(-5deg)" }}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{match.like1.book.title}</p>
                  <p className="text-xs text-muted-foreground">for</p>
                  <p className="font-semibold">{match.like2.book.title}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
function SkeletonMatchCard() {
  return (
    <div className="p-3 border rounded-lg bg-background flex items-start gap-4 shadow-sm">
      <Skeleton className="w-[64px] h-[99px] bg-zinc-300" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="w-32 h-4 bg-zinc-300" />
        <Skeleton className="w-16 h-4 bg-zinc-300" />
        <Skeleton className="w-32 h-4 bg-zinc-300" />
      </div>
    </div>
  );
}
