"use client";
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
}
