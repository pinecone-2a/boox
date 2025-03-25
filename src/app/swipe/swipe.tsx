"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { X, Heart } from "lucide-react";
import type { Book,Swipe } from "../types/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function SwipeBooks(){
  const [books,setBooks] = useState<Book[]>([]);
  useEffect(()=>{
    async function fetchBooks() {
      try {
        const response = await fetch(`/api/suggestion-books`);
        const data = await response.json();
        setBooks(data);
      } catch (err) {
      } finally {
        // console.log("done")
      }
    }
    fetchBooks();

  },[]);
  return (
    <div
      className="grid h-[500px] w-full place-items-center bg-background"
    >
      <Skeleton className="absolute h-96 w-72 bg-zinc-300" />
      {books.length > 0 && books.map(book => {return <Book 
        key={book.id}
        book={book} 
        books={books}
        setBooks={setBooks}
        />}).reverse()}
    </div>
  );
}

const Book = ({
  book,
  books,
  setBooks,
}: {
  book: Book;
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
}) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const opacityLike = useTransform(x, [0, 1], [0, 1]);
  const opacityNope = useTransform(x, [0, -1], [0, 1]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const [profile,setProfile] = useState('');
  
  const fetchUserImage = async (userId: string) => {
    try{
      const res = await fetch(`/api/user?userId=${userId}`);
      if (!res.ok) {
        if (res.status === 500) {
          throw new Error('Internal Server Error (500)');
        } else {
          throw new Error('Something went wrong');
        }
      }
      const data = await res.json();
      setProfile(data.imageUrl);
    }catch{
      setProfile("");
    }
    
  };
  useEffect(()=>{
    if (book.owner?.clerkId) {
      fetchUserImage(book.owner.clerkId);
    }
  },[])
  async function Swipe(like:boolean) {
    try {
      const swipe: Swipe = {
        id: "",
        bookId: book.id || "",
        userId: "",
        liked: like,
      };
      const response = await fetch(`/api/like`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(swipe),
      });
      const data = await response.json();
      // console.log(data);
      // console.log(data);
    } catch (err) {
      // console.log(err);
      // console.log(err);
    } finally {
      if(like){
        // console.log("like");
      }else{
        // console.log("nope")
      }
    }
  }

  const handleDragEnd = () => {
    if (x.get() > 20) {
      Swipe(true);
      subBook();
    } else if (x.get() < -20) {
      Swipe(false);
      subBook();
    }
  };

  const subBook = () => {
    setBooks((pv) => pv.filter((v) => v.id != book.id));
  };

  return <motion.div
    className="h-96 w-72 hover:cursor-grab active:cursor-grabbing absolute flex items-center justify-center bg-secondary rounded-lg"
    style={{
      gridRow:1,
      gridColumn:1,
      x,
      rotate
    }}
    drag = "x"
    dragConstraints = {{left:0,right:0}}
    onDragEnd={handleDragEnd}>
      <motion.div
        className="absolute top-5 left-5 z-10 text-[#00ce90] p-2 text-5xl font-extrabold rounded-lg border-5 border-[#00ce90]"
        style={{ opacity: opacityLike }}
      >
        Like
      </motion.div>
      <motion.div
        className="absolute top-5 right-5 z-10 text-[#fe4f66] p-2 text-5xl font-extrabold rounded-lg border-5 border-[#fe4f66]"
        style={{ opacity: opacityNope }}
      >
        Nope
      </motion.div>
    <motion.img
      className="h-96 w-72 object-cover rounded-lg"
      style={{opacity}}
      src={book.cover}/>
    <div className="p-5 pb-10 absolute w-full h-full flex flex-col justify-end items-start bg-gradient-to-b from-tranperand to-zinc-900 to-90% text-white rounded-lg">
      <Badge className="rounded-full pl-3 pr-3 font-bold text-sm h-fit w-fit absolute top-5 right-5" variant="secondary">{book.condition}</Badge>
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-lg">Description</p>
      {profile && profile.trim() !== "" ? (
        <img
          className="w-12 h-12 rounded-full absolute top-5 left-5"
          src={profile}
          alt="Profile"
        />
      ) : (
        <img
          className="w-12 h-12 rounded-full absolute top-5 left-5"
          src="/profile.jpg"
        />
      )}
      <p className="text-sm max-h-20 overflow-x-auto">{book.description}</p>
    </div>
    <button onClick={()=>{
      Swipe(false);
      const interval = setInterval(()=>{
        x.set(x.get()-1);
        if(x.get() < -100){
          clearInterval(interval);
          subBook();
        } 
      },2);
    }} className="absolute -bottom-7 text-7xl left-15 rounded-full w-15 h-15 bg-white flex justify-center items-center">
      <X strokeWidth={5} color="#fe4f66" size={32}/>
    </button>
    <button onClick={()=>{
      Swipe(true);
      const interval = setInterval(()=>{
        x.set(x.get()+1);
        if(x.get() > 100){
          clearInterval(interval);
          subBook();
        } 
      },2);
    }} className="absolute -bottom-7 right-15 rounded-full w-15 h-15 bg-white flex justify-center items-center">
      <Heart strokeWidth={4} color="#00ce90" size={32}/>
    </button>
    </motion.div>
  );
};
