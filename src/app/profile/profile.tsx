"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, ShoppingBag, Music, Search, BookOpen } from "lucide-react";
import { Bar } from "./bar";

export default function Profile() {


  return (
    <div className="w-full max-w-md mx-auto p-4 pb-20">
      <div className="flex items-center space-x-2 mb-4">
        <ArrowLeft className="w-5 h-5 text-gray-500" />
        <span className="text-gray-500">Home</span>
      </div>

      <Card className="p-6 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
            <img className="w-full h-full object-cover" src="/profile.jpg" alt="Profile" />
          </div>
        </div>
        <h2 className="text-xl font-bold mt-4">John Doe</h2>
        <p className="text-gray-600 text-sm mt-2">
          Software Engineer @Spotify by Day, <br />
          Blogger & Podcaster by Night, <br />
          Toronto Raptors Die-Hard Fan
        </p>
      </Card>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Your Books</h3>
        <div className="mt-4 space-y-4">
          {[ 
            { title: "This is Marketing", author: "Seth Godin", progress: 80, image: "/book1.jpg" },
            { title: "The Icarus Deception", author: "Seth Godin", progress: 63, image: "/book2.jpg" },
            { title: "Tribe of Mentors", author: "Tim Ferriss", progress: 40, image: "/book3.jpg" },
          ].map((book, index) => (
            <Card key={index} className="flex items-center p-4">
              <div className="flex items-center space-x-4 w-full">
                <img src={book.image} alt={book.title} className="w-16 h-24 rounded-md object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold">{book.title}</h4>
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <div className="relative w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-orange-600 h-2.5 rounded-full"
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{book.progress}% completed</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Bar />
    </div>
  );
}
