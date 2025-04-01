"use client";
import { useChat } from "./useChat";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export function Chat({ matchId, sender, receiver, senderProfile }: 
    { matchId: string, sender: User, receiver: User, senderProfile:string }) {
    const [receiverProfile, setReceiverProfile] = useState("");
    const { messages, loading } = useChat(matchId);
    async function handleSend(form:FormData) {
      const text = form.get("text");
        if (!text) return;
        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ matchId, senderId: sender.id, receiverId: receiver.id, text }),
        });
    }
    const fetchReceiverProfile = async (userId: string) => {
        try {
          const res = await fetch(`/api/user?userId=${userId}`);
          if (!res.ok) {
            if (res.status === 500) {
              throw new Error("Internal Server Error (500)");
            } else {
              throw new Error("Something went wrong");
            }
          }
          const data = await res.json();
          setReceiverProfile(data.imageUrl);
        } catch {
          setReceiverProfile("");
        }
    };
    useEffect(() => {
        if (receiver?.clerkId) {
          fetchReceiverProfile(receiver?.clerkId);
        }
    }, [receiver]);
    return (
        <div className="w-full h-full p-2 pb-36">
            <div className="flex rounded-lg p-2 items-center justify-between">
              <div className="flex">
                <Avatar>
                  <AvatarImage src={receiverProfile} alt="@shadcn" />
                  <AvatarFallback>{sender.name.slice(1)}</AvatarFallback>
                </Avatar>
                <h1 className="text-lg font-bold">&nbsp;&nbsp;{receiver.name}</h1>
              </div>
            </div>
            <div className="w-full h-5/6 p-4 flex flex-col gap-2 overflow-y-scroll">
              {loading?
                <div>
                  {[...Array(5)].map((_, index: number) => (
                    <div key={index} className={index % 2 === 1 ? "flex self-end flex-row-reverse gap-2" : "flex items-center self-start gap-2"}>
                      <Skeleton className="rounded-full w-8 h-8"/>
                      <Skeleton className="rounded-lg h-3 w-30"/>
                    </div>
                  ))}
                </div>
              :(messages.map((msg) => (
              <div key={msg.id} className={msg.senderId === sender.id ? "flex self-end flex-row-reverse gap-2" : "flex items-center self-start gap-2"}>
                <Avatar>
                    <AvatarImage src={msg.senderId === sender.id ?senderProfile:receiverProfile} alt="@shadcn" />
                    <AvatarFallback>{sender.name.slice(1)}</AvatarFallback>
                </Avatar>
                <p className={msg.senderId === sender.id ? "self-end bg-indigo-600 text-white pl-2 pr-2 rounded-2xl " : "self-start pl-2 pr-2 rounded-2xl bg-secondary text-secondary-foreground"}>
                    {msg.text}
                </p>
              </div>)))}
            </div>
            <form action={handleSend} className="w-full flex gap-2 h-1/6">
                <Textarea name="text" placeholder="Type your message here."/>
                <Button type="submit" className="h-full">Send</Button>
            </form>
        </div>
    );
}
