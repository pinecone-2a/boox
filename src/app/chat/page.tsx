"use client";
import { Dispatch, useEffect, useState } from "react";
import { Match as PrismaMatch, Book, User } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Bar } from "../profile/bar";
import { Skeleton } from "@/components/ui/skeleton";
import { Chat } from "./chat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface Match extends PrismaMatch {
  like1: { book: Book; user: User };
  like2: { book: Book; user: User };
}

export default function ChatPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingMatch, setLoadingMatch] = useState<boolean>(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();

  async function fetchMatches() {
    try {
      const response = await fetch(`/api/match`);
      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }
      const data = await response.json();
      setMatches(data);
    } catch (err) {
      console.error(err);
      // Handle the error, maybe set some error state for UI feedback
    } finally {
      setLoadingMatch(false);
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    if (selectedMatch) {
      const selectedUser =
        selectedMatch?.like1.user.clerkId === user?.id
          ? [selectedMatch?.like1.user, selectedMatch?.like2.user]
          : [selectedMatch?.like2.user, selectedMatch?.like1.user];
      setUsers(selectedUser.filter((user): user is User => user !== undefined));
    }
  }, [selectedMatch, user]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={33} className="sm:W-20">
        <MatchedBooksSection
          matches={matches}
          loading={loadingMatch}
          setSelectedMatch={setSelectedMatch}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        {selectedMatch && users.length > 0 && (
          <Chat
            matchId={selectedMatch.id}
            sender={users[0]}
            receiver={users[1]}
            senderProfile={user?.imageUrl || ""}
          />
        )}
      </ResizablePanel>
      <Bar />
    </ResizablePanelGroup>
  );
}

function MatchedBooksSection({
  matches,
  loading,
  setSelectedMatch,
}: {
  matches: Match[];
  loading: boolean;
  setSelectedMatch: Dispatch<React.SetStateAction<Match | undefined>>;
}) {
  const [flippedIndexes, setFlippedIndexes] = useState<boolean[]>([]);

  useEffect(() => {
    setFlippedIndexes(Array(matches.length).fill(false));
  }, [matches]);

  const handleCardClick = (index: number) => {
    setFlippedIndexes((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  const truncateTitle = (title: string) => {
    const words = title.split(" ");
    return words.length > 2 ? `${words.slice(0, 2).join(" ")}...` : title;
  };

  return (
    <div className="h-full w-full pb-20">
      <div className="h-full pt-4 bg-secondary shadow-md w-full flex flex-col overflow-y-scroll">
        {loading ? (
          <div className="basis-1/5 p-4 flex justify-start items-center w-full">
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
        {matches.map((match: Match, index: number) => (
          <div
            key={index}
            className="basis-1/5 p-4 flex justify-start items-center w-full"
            onClick={() => setSelectedMatch(match)}
          >
            <div
              onClick={() => handleCardClick(index)}
              className="border-2 cursor-pointer p-3 w-full rounded-lg bg-background mb-5 flex flex-col sm:flex-row justify-between items-center"
            >
              <div className="relative flex gap-2 flex-col sm:flex-row items-center">
                <img
                  src={match.like1?.book.cover}
                  alt={`Match book ${index + 1}`}
                  className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg mb-2 sm:mb-0 sm:ml-2"
                />
                <div className="text-muted-foreground sm:hidden ">for</div>
                <img
                  src={match.like2?.book.cover}
                  alt={`Match book ${index + 1}`}
                  className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg sm:absolute sm:top-3 sm:left-3 sm:ml-2"
                />
                <div className="sm:p-4 font-bold text-foreground text-sm sm:text-lg">
                  <div className="text-sm sm:text-lg hidden sm:block">
                    {match.like1.book.title}
                  </div>
                  <div className="text-muted-foreground hidden sm:block">
                    for
                  </div>
                  <div className="text-sm sm:text-lg hidden sm:block">
                    {match.like2.book.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
