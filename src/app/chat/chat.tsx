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
  { matchId: string, sender: User, receiver: User, senderProfile: string }) {
  const [receiverProfile, setReceiverProfile] = useState("");
  const { messages, loading } = useChat(matchId);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isReviewModal, setIsReviewModal] = useState<{ visible: boolean, status: string }>({ visible: false, status: '' });

  const openModal = (status: string) => setIsReviewModal({ visible: true, status });
  const closeModal = (status: string) => setIsReviewModal({ visible: false, status });

  const toggleDropdown = () => setIsOpen(!isOpen);

  async function handleSend(form: FormData) {
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
      <div className="w-full h-full p-4 pb-36">
          <div className="flex rounded-lg p-4 items-center justify-between bg-gray-100 border border-gray-300">
              <div className="flex items-center space-x-4">
                  <Avatar>
                      <AvatarImage src={receiverProfile} alt={receiver.name} />
                      <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-semibold text-gray-800">{receiver.name}</h1>
              </div>
              <div className="relative inline-block" ref={dropdownRef}>
                  <Button variant={'outline'} onClick={toggleDropdown} size={'icon'}>
                      <EllipsisVertical />
                  </Button>
                  {isOpen && (
                      <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded z-50">
                          <li className="p-2 hover:bg-gray-200 cursor-pointer text-green-500 flex gap-2" onClick={() => { openModal('ACCEPTED') }}><CircleCheck />FINISH</li>
                          <li className="p-2 hover:bg-gray-200 cursor-pointer text-red-500 flex gap-2" onClick={() => { openModal('REJECTED') }}><CircleX />REJECT</li>
                      </ul>
                  )}
                  <Modal isOpen={isReviewModal.visible} onClose={() => { closeModal(isReviewModal.status) }} userId={receiver.id} reviewerId={sender.id} matchId={matchId} status={isReviewModal.status} />
              </div>
          </div>

          <div className="w-full h-9/10 p-4 flex flex-col gap-4 overflow-y-auto bg-white rounded-lg shadow-md">
              {loading ? (
                  <div className="space-y-4">
                      {[...Array(5)].map((_, index: number) => (
                          <div key={index} className={index % 2 === 1 ? "flex self-end gap-2" : "flex gap-2"}>
                              <Skeleton className="bg-zinc-300 rounded-full w-8 h-8" />
                              <Skeleton className="bg-zinc-300 rounded-lg h-3 w-24" />
                          </div>
                      ))}
                  </div>
              ) : (
                  messages.map((msg) => (
                      <div key={msg.id} className={msg.senderId === sender.id ? "flex self-end flex-row-reverse gap-2" : "flex items-center self-start gap-2"}>
                          <Avatar>
                              <AvatarImage src={msg.senderId === sender.id ? senderProfile : receiverProfile} alt="@shadcn" />
                              <AvatarFallback>?</AvatarFallback>
                          </Avatar>
                          <p className={msg.senderId === sender.id ? "bg-indigo-600 text-white p-2 rounded-2xl max-w-[70%] text-sm" : "bg-gray-200 text-gray-800 p-2 rounded-2xl max-w-[70%] text-sm"}>
                              {msg.text}
                          </p>
                      </div>
                  ))
              )}
          </div>

          <form action={handleSend} className="flex gap-2 items-center p-4 bg-gray-50 rounded-lg shadow-md">
              <Input name="text" placeholder="Type your message here..." className="p-3 rounded-lg border border-gray-300 w-full" />
              <Button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-200">Send</Button>
          </form>
      </div>
  );
}



const Modal = ({ isOpen, onClose, userId, reviewerId, matchId, status }: { isOpen: boolean, onClose: () => void, userId: string, reviewerId: string, matchId: string, status: string }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  if (!isOpen) return null;

  async function changeMatchStatus({ matchId, status }: { matchId: string, status: string }) {
      await fetch("/api/match", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ matchId, status }),
      });
  }

  async function submitReview(form: FormData) {
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
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          {isAlertOpen ? (
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl mb-4 font-bold">{status}</h2>
                  <p className="text-gray-600">Are you sure you want to give this rating?</p>
                  <div className="flex justify-end gap-4 mt-4">
                      <Button onClick={onClose} className="bg-gray-300 text-gray-700 hover:bg-gray-400">Cancel</Button>
                      <Button onClick={() => { changeMatchStatus({ matchId, status }); setIsAlertOpen(false); }} className="bg-indigo-600 text-white hover:bg-indigo-700">Continue</Button>
                  </div>
              </div>
          ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl mb-4 font-bold">Review</h2>
                  <p className="text-gray-600 mb-4">Rate your interaction and provide any feedback you think is helpful.</p>
                  <form action={submitReview} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Rating</Label>
                          <Input className="col-span-3" type="number" name="rating" min="1" max="5" placeholder="Give a rating from 1 to 5" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="review" className="text-right">Review</Label>
                          <Textarea name="review" className="col-span-3" placeholder="Write your review here..." />
                      </div>
                      <div className="flex justify-end">
                          <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">Submit</Button>
                      </div>
                  </form>
              </div>
          )}
      </div>
  );
};
