"use client";



import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, ShoppingBag, Music, Search, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { bookType } from "../type";
import { AddNewBook } from "./addBook";

export default function Profile() {
  // const [Bookbook, setBookbook] = useState<bookType[]>();
  const [newbook, setNewbook] = useState<string>();

  // useEffect(() => {
  //   const fetchbook = async () => {
  //     const response = await fetch("http://localhost:7000/book");
  //     const data = await response.json();
  //     setBookbook(data);
  //   };

  //   fetchbook();
  // }, []);

  const addbook = () => {
    fetch("http://localhost:7000/book/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ bookName: newbook }),
    });
    setNewbook("");
    window.location.reload();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 pb-18">

      <div className="flex items-center space-x-2 mb-4">
        <ArrowLeft className="w-5 h-5 text-gray-500" />
        <span className="text-gray-500">Home</span>
      </div>
      <Card className="p-6 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
            <img className="rounded-full w-full h-full object-cover" src="/profile.jpg" alt="Profile" />
          </div>
        </div>
        <h2 className="text-xl font-bold mt-4">Micheal Scofield</h2>
        <p className="text-gray-600 text-sm mt-2">
          Software Engineer @Spotify by Day, <br />
          Blogger & Podcaster by Night, <br />
          Toronto Raptors Die Hard Fan
        </p>
      </Card>


      <div className="mt-6">
        <h3 className="text-lg font-semibold">Your Books</h3>
        <div className="mt-4 space-y-4">
          {[
            { title: "This is Marketing", author: "Seth Godin", progress: 38, image: "/book1.jpg" },
            { title: "The Icarus Deception", author: "Seth Godin", progress: 63, image: "/book2.jpg" },
            { title: "Tribe of Mentors", author: "Tim Ferriss", progress: 72, image: "/book3.jpg" },
          ].map((book, index) => (
            <Card key={index} className="flex items-center p-4 space-x-4">
              <div className="flex items-between space-x-4">
                <img src={book.image} alt={book.title} className="h-[120px] w-[80px] " />
                <div className="flex flex-col">
                  <h4 className="font-bold">{book.title}</h4>

                  <p className="text-sm text-gray-500">{book.author}</p>
                  <p className="text-xs text-gray-600">Making Smarter Decisions When you Don’t Have All The Facts</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${book.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <div className="bg-card text-card-foreground flex-col gap-6 rounded-xl border shadow-sm flex items-center p-4 space-x-4">
            <AddNewBook />
          </div>
        </div>
      </div>




      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-3 flex justify-around shadow-md">
        <div className="flex flex-col items-center text-gray-400">
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-xs mt-1">More</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs mt-1">Shop</span>
        </div>
        <div className="flex flex-col items-center text-gray-900">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1 font-semibold">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <Music className="w-6 h-6" />
          <span className="text-xs mt-1">Audio Books</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <Search className="w-6 h-6" />
          <span className="text-xs mt-1">Search</span>
        </div>
      </div>
    </div>
  );
}
