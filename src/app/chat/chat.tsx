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
import {useEffect, useState,useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { EllipsisVertical,CircleX, CircleCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Chat({ matchId, sender, receiver, senderProfile }: 
    { matchId: string, sender: User, receiver: User, senderProfile:string }) {
    const [receiverProfile, setReceiverProfile] = useState("");
    const { messages, loading } = useChat(matchId);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isReviewModal, setIsReviewModal] = useState<{visible:boolean,status:string}>({visible:false,status:''});

    const openModal = (status:string) => setIsReviewModal({visible:true,status});
    const closeModal = (status:string) => setIsReviewModal({visible:false,status});
  
    const toggleDropdown = () => setIsOpen(!isOpen);

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
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="w-full h-full p-2 pb-36">
            <div className="flex rounded-lg p-2 items-center justify-between bg-background border-1">
              <div className="flex">
                <Avatar>
                  <AvatarImage src={receiverProfile} alt="@shadcn" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <h1 className="text-lg font-bold">&nbsp;&nbsp;{receiver.name}</h1>
              </div>
              <div className="relative inline-block" ref={dropdownRef}>
                  <Button variant={'outline'}onClick={toggleDropdown} size={'icon'}><EllipsisVertical/></Button>
                  {isOpen && (
                    <ul className="absolute right-0 mt-4 w-40 bg-white shadow-lg border rounded z-100 overflow-hidden">
                      <li className="p-2 hover:bg-gray-200 cursor-pointer text-green-500  flex gap-2" onClick={()=>{openModal('ACCEPTED')}}><CircleCheck/>ACCEPT</li>
                      <li className="p-2 hover:bg-gray-200 cursor-pointer text-red-500  flex gap-2" onClick={()=>{openModal('REJECTED')}}><CircleX/>REJECT </li>
                    </ul>
                  )}
                  <Modal isOpen={isReviewModal.visible} onClose={()=>{closeModal(isReviewModal.status)}} userId={receiver.id} reviewerId={sender.id} matchId={matchId} status={isReviewModal.status}/>
                </div>
            </div>
            <div className="w-full h-5/6 p-4 flex flex-col gap-2 overflow-y-scroll">
              {loading?
                <div>
                  {[...Array(5)].map((_, index: number) => (
                    <div key={index} className={index % 2 === 1 ? "flex self-end flex-row-reverse gap-2 items-center" : "flex items-center self-start gap-2"}>
                      <Skeleton className="bg-zinc-300 rounded-full w-8 h-8"/>
                      <Skeleton className="bg-zinc-300 rounded-lg h-3 w-30"/>
                    </div>
                  ))}
                </div>
              :(messages.map((msg) => (
              <div key={msg.id} className={msg.senderId === sender.id ? "flex self-end flex-row-reverse gap-2" : "flex items-center self-start gap-2"}>
                <Avatar>
                    <AvatarImage src={msg.senderId === sender.id ?senderProfile:receiverProfile} alt="@shadcn" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
                <p className={msg.senderId === sender.id ? "self-end bg-indigo-600 text-white pb-1 pl-2 pr-2 rounded-2xl " : " pb-1 self-start pl-2 pr-2 rounded-2xl bg-secondary text-secondary-foreground"}>
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


const Modal = ({ isOpen, onClose,userId, reviewerId,matchId,status }:{isOpen:boolean,onClose:()=>void,userId:string,reviewerId:string,matchId:string,status:string}) => {
  if (!isOpen) return null;
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  async function changeMatchStatus({matchId,status}:{matchId:string,status:string}){
    await fetch("/api/match", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({matchId,status}),
    });
  }
  async function submitReview(form: FormData){
    const rating = Number(form.get("rating")) || 0;
    const reviewText = form.get("review");
    await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        reviewerId,
        rating,
        reviewText,
      }),
    });
    window.location.reload();
  }
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-100">
      {isAlertOpen?
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
        <h2 className="text-xl mb-4 font-bold">
          {status}
        </h2>
        <p>Are you sure you want to give this rating?</p>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>cancel</Button>
          <Button onClick={()=>{changeMatchStatus({matchId,status});setIsAlertOpen(false)}}>continue</Button>
        </div>
      </div>
      :<div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
      <h2 className="text-xl mb-4 font-bold">
        Review
      </h2>
      <p>Rate your interaction and provide any feedback you think is helpful.</p>
      <form action={submitReview} className="grid gap-4 py-4">
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Rating
          </Label>
          <Input 
          className="col-span-3" 
          type="number"
          name="rating"
          min="1"
          max="5"
          placeholder="Give a rating from 1 to 5"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Review
          </Label>
          <Textarea name="review" className="col-span-3" placeholder="Write your review here..."/>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
          >
            submit
          </Button>
        </div>
      </form>
    </div>}
    </div>
  );
};
