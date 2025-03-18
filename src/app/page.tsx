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
export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <div>
          <h1>Hello there</h1>
        </div>
      </SignedIn>
    </div>
  );
}
