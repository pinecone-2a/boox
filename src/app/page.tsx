"use client";
<<<<<<< HEAD

export default function Home() {
  return <div className="bg-cyan-950 flex justify-center items-center"></div>;
=======
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import SignupHandler from "./_components/signup";
export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <div>
          <SignupHandler />
        </div>
      </SignedIn>
    </div>
  );
>>>>>>> 3-dashboard
}
