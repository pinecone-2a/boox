"use client";

import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Login() {
  <div>
    <SignedOut>
      <SignIn />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </div>;
}
