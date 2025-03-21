"use client";

import { Card } from "@/components/ui/card";
import { Bar } from "./bar";
import { AddNewBook } from "./addBook";
import { useEffect, useState } from "react";

export default function Profile() {
  const [data, setData] = useState<any>([]);
  async function getFetchData() {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);
  console.log(data);
  return (
    <div className="w-full max-w-md mx-auto p-4 pb-18">
      <Card className="p-6 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              className="w-full h-full object-cover"
              src="/profile.jpg"
              alt="Profile"
            />
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
          {data.map((book: any, index: any) => (
            <Card key={index} className="flex items-center p-4">
              <div className="flex items-center space-x-4 w-full">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-24 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold">{book.title}</h4>
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <div className="relative w-full bg-gray-200 rounded-full h-2.5 mt-2"></div>
                </div>
              </div>
            </Card>
          ))}
          <div className="bg-card text-card-foreground flex-col gap-6 rounded-xl border shadow-sm flex items-center p-4 space-x-4">
            <AddNewBook />
          </div>
        </div>
      </div>
      <Bar />
    </div>
  );
}
