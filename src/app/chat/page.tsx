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

export default function ChatPage(){
    const [matches, setMatches] = useState<Match[]>([]);
    const [loadingMatch, setLoadingMatch] = useState<boolean>(true);
    const [selectedMatch, setSelectedMatch] = useState<Match>();
    const [users,setUsers]= useState<User[]>();
    const { user } = useUser();

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
    useEffect(() => {
      fetchMatches();
    }, []);
    useEffect(()=>{
      if(selectedMatch !== undefined){
        if(selectedMatch?.like1.user.clerkId === user?.id){
          setUsers([selectedMatch?.like1.user, selectedMatch?.like2.user].filter((user): user is User => user !== undefined));
        }else{
          setUsers([selectedMatch?.like2.user, selectedMatch?.like1.user].filter((user): user is User => user !== undefined));
        }
      }
      
    },[selectedMatch]);
    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <MachedBooksSection
              matchList={matches}
              loading={loadingMatch}
              setSelectedMatch={setSelectedMatch}/>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              {
              selectedMatch === undefined || !users ?
              null
              :<Chat
              matchId={selectedMatch.id}
              sender={users?.[0]}
              receiver={users?.[1]}
              senderProfile={user?.imageUrl || ""}
              />
              }
            </ResizablePanel>
            <Bar/>
        </ResizablePanelGroup>
    );
};
function MachedBooksSection({
    matchList,
    loading,
    setSelectedMatch
  }: {
    matchList: Match[];
    loading: boolean;
    setSelectedMatch: Dispatch<React.SetStateAction<Match | undefined>>
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
      <div className="h-full w-full pb-12"> 
        <div className="h-full pt-4 bg-secondary shadow-md w-full flex flex-col overflow-y-scroll">
            {loading ? (
              <div className="basis-1/5  p-4 flex justify-start items-center w-full">
                <div className="border-2 cursor-pointer p-3 min-w-70 w-full rounded-lg bg-background mb-5 flex">
                  <div className="relative flex">
                    <Skeleton className="w-[64px] h-[99px] bg-zinc-300" />
                    <Skeleton className="w-[64px] h-[99px] bg-zinc-300 absolute top-2 left-2" />
                    <div className="p-4 font-bold text-foreground">
                      <Skeleton className="w-30 h-4 bg-zinc-300"/>
                      <div className="text-muted-foreground">for</div>
                      <Skeleton className="w-30 h-4 bg-zinc-300"/>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {matchList.map((match: Match, index: number) => (
              <div
                key={index}
                className="basis-1/5  p-4 flex justify-start items-center w-full"
                onClick={()=>setSelectedMatch(match)}
              >
                <div onClick={() => handleClick(index)} className="border-2 cursor-pointer p-3 min-w-70 w-full rounded-lg bg-background mb-5 flex">
                  {flippedIndexes[index] ? (
                    <div className="relative flex">
                      <img
                        src={match.like1?.book.cover}
                        alt={`Match book ${index + 1}`}
                        className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg ml-2"
                      />
                      <img
                        src={match.like2?.book.cover}
                        alt={`Match book ${index + 1}`}
                        className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg ml-2 absolute top-3 left-3"
                      /><div className="p-4 font-bold text-foreground">
                        {match.like1.book.title} 
                        <div className="text-muted-foreground">for</div>
                        {match.like2.book.title} 
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex">
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