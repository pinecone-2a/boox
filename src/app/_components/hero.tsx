"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Book } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [data, setData] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function getFetchData() {
    try {
      const res = await fetch("/apiPublic/allBooks");
      if (!res.ok) throw new Error("Failed to fetch books");
      const books = await res.json();
      setData(books);
    } catch (error: any) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getFetchData();
  }, []);

  useGSAP(() => {
    gsap.from(".hero-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(".hero-text", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
    });
    gsap.from(".hero-img", {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: 0.4,
      ease: "back.out(1.7)",
    });

    gsap.utils.toArray<HTMLElement>(".book-section").forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.05,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center py-12 sm:py-16 bg-gradient-to-b from-amber-50 to-white">
        <h1 className="hero-title text-5xl sm:text-7xl font-extrabold text-yellow-700 px-4">
          Boox
        </h1>
        <p className="hero-text text-lg sm:text-xl mt-4 sm:mt-6 text-gray-700 font-medium px-4">
          "A home without books is a body without soul."
        </p>
        <motion.a
          href="/login"
          className="inline-block bg-yellow-600 text-white px-6 py-3 sm:px-8 sm:py-4 mt-6 sm:mt-8 rounded-lg text-lg sm:text-xl font-semibold transition transform hover:bg-yellow-500 hover:scale-105 hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.a>
        <div className="hero-img flex justify-center mt-8 sm:mt-12">
          <img
            className="w-80 h-56 sm:w-96 sm:h-64 rounded-xl shadow-xl object-cover transition-transform duration-300 transform hover:scale-105"
            src="book.jpeg"
            alt="Stack of books"
          />
        </div>
      </div>

      {/* Error Handling */}
      {error && !data.length && (
        <div className="text-center text-red-600 mt-8 text-lg">{`Error: ${error}`}</div>
      )}

      {/* No Books State */}
      {!data.length && !error && (
        <div className="text-center text-gray-600 mt-8 text-lg">
          No books available to show.
        </div>
      )}

      <div className="text-center mt-6 px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-4">
          Available for Exchange
        </h2>
        <p className="text-lg sm:text-xl font-medium text-gray-800 mb-6">
          Explore books that you can exchange with others. Find your next read!
        </p>
      </div>

      <div className="flex justify-center">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 sm:px-8 md:px-12 max-w-7xl">
          {data.length > 0 ? (
            data.map((book, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white border border-gray-200 rounded-xl shadow-lg p-6 book-section transition transform hover:ring-1 hover:ring-yellow-500 overflow-hidden"
              >
                <img
                  className="w-[160px] h-[240px] object-cover rounded-lg shadow-md transition-transform transform duration-300 hover:scale-105"
                  src={book.cover}
                  alt={book.title}
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <Badge>{book.condition}</Badge>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-800 text-base sm:text-lg font-semibold truncate w-40 sm:w-48">
                    {book.title}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-600 mt-6">No books available</div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8 sm:mt-12">
        <motion.a
          href="/dashboard"
          className="inline-block bg-yellow-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition transform hover:bg-yellow-500 hover:scale-105 hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          View All Books
        </motion.a>
      </div>

      <div className="bg-gray-900 text-white py-8 sm:py-12 mt-8 sm:mt-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-lg sm:text-xl font-medium italic">
            "Reading gives us someplace to go when we have to stay where we are."
          </p>
        </div>
      </div>
    </div>
  );
};
