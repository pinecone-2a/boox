import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignupHandler() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        }),
      });
    }
  }, [user]);

  return null;
}
