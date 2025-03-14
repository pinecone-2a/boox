import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
    { image: "image 8.jpg" },
    { image: "image 9.png" },
    { image: "image 10.png" },
    { image: "image 11.png" },
    { image: "image 12.png" },
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
    <div className="p-6">
      <BookSection sectionName="Wishlist" bookList={wishlistBooks} />
      <BookSection sectionName="Matches" bookList={matchesBooks} />
    </div>
  );
}

function BookSection({ sectionName, bookList }: BookSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{sectionName}</h2>
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {bookList.map((book: Book, index: number) => (
            <CarouselItem
              key={index}
              className="basis-1/3 sm:basis-1/4 md:basis-1/5 bg-yellow-400 p-2"
            >
              <img
                src={book.image}
                alt={`${sectionName} book ${index + 1}`}
                className="w-24 h-32 object-cover rounded-xl shadow-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
