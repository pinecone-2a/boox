import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Book {
  image: string;
}

interface BookSectionProps {
  sectionName: string;
  bookList: Book[];
}

export default function BookLists() {
  const wishlistBooks: Book[] = [
    { image: "image 10.png" },
    { image: "image 11.png" },
    { image: "image 12.png" },
    { image: "image 8.jpg" },
    { image: "image 9.png" },
    { image: "image 10.png" },
    { image: "image 11.png" },
    { image: "image 12.png" },
    { image: "image 8.jpg" },
    { image: "image 9.png" },
  ];

  const matchesBooks: Book[] = [
    { image: "image 8.jpg" },
    { image: "image 9.png" },
    { image: "image 10.png" },
    { image: "image 11.png" },
    { image: "image 12.png" },
    { image: "image 8.jpg" },
    { image: "image 9.png" },
    { image: "image 10.png" },
    { image: "image 11.png" },
    { image: "image 12.png" },
  ];

  return (
    <div>
      <BookSection sectionName="Wishlist" bookList={wishlistBooks} />
      <BookSection sectionName="Matches" bookList={matchesBooks} />
    </div>
  );
}

function BookSection({ sectionName, bookList }: BookSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{sectionName}</h2>
      <Carousel className="w-full h-[112px] ">
        <CarouselContent>
          {bookList.map((book: Book, index: number) => (
            <CarouselItem key={index} className="basis-1/5 bg-yellow-400 p-2 ">
              <img
                src={book.image}
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
