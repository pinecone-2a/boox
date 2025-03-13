// "use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import Link from "next/link";



export const Hero = ()=> {
    return <div>
        <div className="bg-yellow-50">
            <h1  className="pt-6.5 text-3xl font-medium flex justify-center">Boox</h1>
            <p className="text-[14px] flex justify-center mt-5.5">A home without books is a body without soul. </p>
            <div className="flex justify-center mt-5">
            {/* <Button variant="outline">Read More</Button> */}
            <a
            href="/app/header"
              className="bg-yellow-600 text-white px-4 py-2  hover:bg-yellow-100 flex justify-center"
            >   
              Read More
            </a>
            </div>
            <div className="flex justify-center">
            <img  className="w-66 h-46 mt-6.5 mb-6.5" src="book.jpeg" alt="" />
            </div>
        </div>

        <div className="bg-amber-200">
            <h1 className="pt-6.5 text-2xl font-medium flex justify-center">New Released Books</h1>
            <p className="flex justify-center mt-5.5 ">A home without books is a body without soul.</p>
            <div className="flex justify-around mt-5 ">
                <div>
                <img  className="w-30 h-40 rounded-xs" src="bookCover1.jpeg" alt="" /> 
                    <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
                    <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
                </div>
                <div>
                <img  className="w-30 h-40  " src="bookCover2.jpeg" alt="" />
                    <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
                    <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
                </div>
            </div>
            <div className="flex justify-around mt-9 mb-9">
                <div>
                <img  className="w-30 h-40  " src="bookCover3.jpeg" alt="" />
                    <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
                    <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
                </div>
                <div>
                <img  className="w-30 h-40  " src="bookCover4.jpeg" alt="" />
                    <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
                    <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
                </div>
            </div>
            <a
            href="/header"
              className="bg-yellow-600 text-white px-4 py-2  hover:bg-yellow-200 flex justify-center"
            >   
              View All.
            </a>

                <div>
                <p className="bg-black text-white h-30 flex justify-center items-center opacity-80">Reading gives us someplace to go when we have to stay where we are. </p>
                </div>
        </div>

        <div className="bg-amber-300">
            <h1 className="pt-6.5 text-2xl font-medium flex justify-center">Bestselling Books</h1>
            <p className="flex justify-center mt-5.5 ">A home without books is a body without soul.</p>
            <div className="flex justify-around mt-5 ">
                <div>
                <img  className="w-30 h-40 rounded-xs" src="bookCover1.jpeg" alt="" /> 
                    <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
                    <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
                </div>
                <div>
                <img  className="w-30 h-40  " src="bookCover2.jpeg" alt="" />
                    <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
                    <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
                </div>
            </div>
            <div className="flex justify-around mt-9 mb-9">
                <div>
                <img  className="w-30 h-40  " src="bookCover3.jpeg" alt="" />
                    <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
                    <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
                </div>
                <div>
                <img  className="w-30 h-40  " src="bookCover4.jpeg" alt="" />
                    <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
                    <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
                </div>
            </div>
            <a
            href="/header"
              className="bg-yellow-600 text-white px-4 py-2  hover:bg-yellow-200 flex justify-center"
            >   
              View All.
            </a>

        </div>
    </div>
}
