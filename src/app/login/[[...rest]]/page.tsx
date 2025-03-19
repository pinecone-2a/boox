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
export default function Login() {
  return (
    <ClerkProvider>
      <div className="flex justify-center mt-20">
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
    </ClerkProvider>
  );
}
