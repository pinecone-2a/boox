"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignedOut, useAuth } from "@clerk/nextjs";

export default function Login() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center mt-20">
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}
