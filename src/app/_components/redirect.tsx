import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function RedirectPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return <div>Redirecting...</div>;
}
