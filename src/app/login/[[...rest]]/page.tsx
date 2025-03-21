"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard"); // Preload the dashboard for faster navigation
  }, [router]);

  return (
    <ClerkProvider>
      <div className="flex justify-center mt-20">
        <SignedOut>
          <SignIn forceRedirectUrl={"/dashboard"} />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}
