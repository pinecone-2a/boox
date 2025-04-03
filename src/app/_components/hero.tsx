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

  async function getFetchData() {
    try {
      const res = await fetch("/apiPublic/allBooks");
      if (!res.ok) throw new Error("Failed to fetch books");
      const books = await res.json();
      setData(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  useEffect(() => {
    getFetchData();
  }, []);

  useGSAP(() => {
    gsap.from(".hero-title", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".hero-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.from(".hero-img", {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 0.6,
      ease: "back.out(1.7)",
    });

    gsap.utils.toArray<HTMLElement>(".book-section").forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center py-16 bg-gradient-to-b from-amber-50 to-white">
        <h1 className="hero-title text-6xl font-extrabold text-yellow-700">
          Boox
        </h1>
        <p className="hero-text text-lg mt-3 text-gray-600 font-medium">
          "A home without books is a body without soul."
        </p>
        <motion.a
          href="/login"
          className="inline-block bg-yellow-600 text-white px-6 py-3 mt-6 rounded-md text-lg font-semibold transition hover:bg-yellow-500 hover:shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.a>
        <div className="hero-img flex justify-center mt-8">
          <img
            className="w-96 h-64 rounded-lg shadow-lg object-cover"
            src="book.jpeg"
            alt="Stack of books"
          />
        </div>
      </div>

      <div className="text-center mt-2">
        <h1 className="hero-title text-6xl font-extrabold text-yellow-700 mb-2">
          Boox
        </h1>
        <h2 className="text-3xl font-medium text-gray-800">
          Available for Exchange
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6 md:px-12 max-w-7xl">
          {data.map((book, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white border border-gray-200 rounded-lg shadow-md p-4 book-section transition flex flex-col items-center hover:ring-1 hover:ring-yellow-400 overflow-hidden"
            >
              <img
                className="w-[160px] h-[240px] object-cover rounded-lg shadow-md transition"
                src={book.cover}
                alt={book.title}
                loading="lazy"
              />
              <div className="absolute top-2 left-2">
                <Badge>{book.condition}</Badge>
              </div>
              <div className="mt-3 text-center">
                <p className="text-gray-800 text-lg font-semibold truncate w-40">
                  {book.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <motion.a
          href="/header"
          className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition hover:bg-yellow-500 hover:shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          View All
        </motion.a>
      </div>
      <div className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-medium italic">
            "Reading gives us someplace to go when we have to stay where we
            are."
          </p>
        </div>
      </div>
    </div>
  );
};
