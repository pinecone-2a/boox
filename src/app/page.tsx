"use client";

<<<<<<< HEAD
=======
import { SignedIn } from "@clerk/nextjs";
import SignupHandler from "./_components/signup";

>>>>>>> main
export default function Home() {
  return (
    <div className="bg-cyan-950 flex justify-center items-center">
      <SignedIn>
        <SignupHandler />
      </SignedIn>
    </div>
  );
}
