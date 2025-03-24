"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";

export default function Login() {
  const { isSignedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return (
    <ClerkProvider>
      <div className="flex justify-center mt-20">
        <SignedOut>
          <SignIn forceRedirectUrl={"/dashboard"} />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}
