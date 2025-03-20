"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SwipeBooks } from "../swipe/swipe";
import type { Book } from "../types/types";
import { useState ,useEffect } from "react";

export default function BookLists() {
  const [likedBooks,setLikedBooks] = useState<Book[]>([]);
  const [matchedBooks,setMatchedBooks] = useState<Book[]>([]);
  async function fetchLikedBooks() {
    try {
        const response = await fetch(`/api/liked-books`);
        const data = await response.json();
        setLikedBooks(data);
    } catch (err) {
    } finally {
      console.log("done")
    }
  }
  useEffect(()=>{
    fetchLikedBooks();
  },[])
  return (
    <div className="w-full h-full bg-neutral-200">
      <SwipeBooks/>
      <BookSection sectionName="Liked" bookList={likedBooks} />
      <BookSection sectionName="Matches" bookList={[]} />
    </div>
  );
}

function BookSection({ sectionName, bookList }: {sectionName:string,bookList:Book[]}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{sectionName}</h2>
      <Carousel className="w-full h-[112px] ">
        <CarouselContent>
          {bookList.map((book: Book, index: number) => (
            <CarouselItem key={index} className="basis-1/5 bg-yellow-400 p-2 ">
              <img
                src={book.cover}
                alt={`${sectionName} book ${index + 1}`}
                className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg ml-2"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
