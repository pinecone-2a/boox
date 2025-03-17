// // "use client"
// import { Button } from "@/components/ui/button"
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { CustomEase } from "gsap/CustomEase";
// import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
// import { Flip } from "gsap/Flip";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Observer } from "gsap/Observer";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { Draggable } from "gsap/Draggable";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { EaselPlugin } from "gsap/EaselPlugin";
// import { PixiPlugin } from "gsap/PixiPlugin";
// import { TextPlugin } from "gsap/TextPlugin";
// gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase);
// import { motion } from "framer-motion";
// import Link from "next/link";



// export const Hero = ()=> {
//     return <div>
//         <div className="bg-yellow-50">
//             <h1  className="pt-6.5 text-3xl font-medium flex justify-center">Boox</h1>
//             <p className="text-[14px] flex justify-center mt-5.5">A home without books is a body without soul. </p>
//             <div className="flex justify-center mt-5">
//             {/* <Button variant="outline">Read More</Button> */}
//             <a
//             href="/app/header"
//               className="bg-yellow-600 text-white px-4 py-2  hover:bg-yellow-100 flex justify-center"
//             >   
//               Read More
//             </a>
//             </div>
//             <div className="flex justify-center">
//             <img  className="w-66 h-46 mt-6.5 mb-6.5" src="book.jpeg" alt="" />
//             </div>
//         </div>

//         <div className="bg-amber-200">
//             <h1 className="pt-6.5 text-2xl font-medium flex justify-center">New Released Books</h1>
//             <p className="flex justify-center mt-5.5 ">A home without books is a body without soul.</p>
//             <div className="flex justify-around mt-5 ">
//                 <div>
//                 <img  className="w-30 h-40 rounded-xs" src="bookCover1.jpeg" alt="" /> 
//                     <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
//                     <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
//                 </div>
//                 <div>
//                 <img  className="w-30 h-40  " src="bookCover2.jpeg" alt="" />
//                     <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
//                     <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
//                 </div>
//             </div>
//             <div className="flex justify-around mt-9 mb-9">
//                 <div>
//                 <img  className="w-30 h-40  " src="bookCover3.jpeg" alt="" />
//                     <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
//                     <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
//                 </div>
//                 <div>
//                 <img  className="w-30 h-40  " src="bookCover4.jpeg" alt="" />
//                     <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
//                     <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
//                 </div>
//             </div>
//             <a
//             href="/header"
//               className="bg-yellow-600 text-white px-4 py-2  hover:bg-yellow-200 flex justify-center underline"
//             >   
//               View All.
//             </a>

//                 <div>
//                 <p className="bg-black text-white h-30 flex justify-center items-center opacity-80">Reading gives us someplace to go when we have to stay where we are. </p>
//                 </div>
//         </div>

//         <div className="bg-amber-300">
//             <h1 className="pt-6.5 text-2xl font-medium flex justify-center">Bestselling Books</h1>
//             <p className="flex justify-center mt-5.5 ">A home without books is a body without soul.</p>
//             <div className="flex justify-around mt-5 ">
//                 <div>
//                 <img  className="w-30 h-40 rounded-xs" src="bookCover1.jpeg" alt="" /> 
//                     <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
//                     <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
//                 </div>
//                 <div>
//                 <img  className="w-30 h-40  " src="bookCover2.jpeg" alt="" />
//                     <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
//                     <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
//                 </div>
//             </div>
//             <div className="flex justify-around mt-9 mb-9">
//                 <div>
//                 <img  className="w-30 h-40  " src="bookCover3.jpeg" alt="" />
//                     <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
//                     <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
//                 </div>
//                 <div>
//                 <img  className="w-30 h-40  " src="bookCover4.jpeg" alt="" />
//                     <p className="text-sm mt-3 font-medium">The Great Gatsby</p>
//                     <p className="text-sm mt-1 font-bold flex justify-center">31$</p>
//                 </div>
//             </div>
//             <a
//             href="/header"
//               className="bg-yellow-600 text-white px-4 py-2  hover:bg-yellow-200 flex justify-center underline"
//             >   
//               View All.
//             </a>

//         </div>
//     </div>
// }
"use client"
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
 
gsap.registerPlugin(ScrollTrigger);
 
export const Hero = () => {
  useGSAP(() => {
    gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, ease: "power3.out" });
    gsap.from(".hero-text", { opacity: 0, y: 30, duration: 1, delay: 0.3, ease: "power3.out" });
    gsap.from(".hero-img", { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.6, ease: "back.out(1.7)" });
    
    gsap.utils.toArray(".book-section").forEach((section) => {
      if (section instanceof HTMLElement) {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });
  }, []);
 
  return (
    <div>
      <div className="bg-yellow-50 text-center py-10">
        <h1 className="hero-title text-3xl font-medium">Boox</h1>
        <p className="hero-text text-[15px] mt-3 text-black opacity-45 font-normal">A home without books is a body without soul.</p>
        <motion.a
          href="/app/header"
          className="inline-block bg-yellow-600 text-white px-4 py-2 mt-5 hover:bg-yellow-100"
          whileHover={{ scale: 1.1 }}
        >
          Read More
        </motion.a>
        <div className="hero-img flex justify-center mt-6">
          <img className="w-66 h-46" src="book.jpeg" alt="Books" />
        </div>
      </div>

 
      {["New Released Books", "Bestselling Books"].map((title, index) => (
        <div key={index} className="book-section bg-amber-200 py-10 text-center">
          <h1 className="text-2xl font-medium">{title}</h1>
          <p className="mt-3">A home without books is a body without soul.</p>
          <div className="flex justify-center gap-6 mt-5">
            {["bookCover1.jpeg", "bookCover2.jpeg", "bookCover3.jpeg", "bookCover4.jpeg"].map((src, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <img className="w-30 h-40 rounded-xs " src={src} alt="Book Cover" />
                <p className="text-sm mt-2 font-medium">The Great Gatsby</p>
                <p className="text-sm font-bold">$31</p>
              </motion.div>
            ))}
          </div>
          <motion.a
            href="/header"
            className="inline-block bg-yellow-600 text-white px-4 py-2 mt-5 underline hover:bg-yellow-200"
            whileHover={{ scale: 1.1 }}
          >
            View All
          </motion.a>
          <div className="bg-black h-30 flex justify-center items-center opacity-80 pl-3 mt-6">
          <p className=" text-white font-bold "> "Reading gives us someplace to go when we have to stay where we are." </p>   
       </div>
          
        </div>
      ))}

    </div>
  );
}