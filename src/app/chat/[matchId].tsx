// pages/chat/[matchId].tsx
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import Chat from "../_components/chat";

const ChatPage: React.FC = () => {
  const { userId } = useAuth(); // Get Clerk userId
  const router = useRouter();
  const { matchId } = router.query as { matchId?: string };

  if (!userId) {
    router.push("/sign-in"); // Redirect if not authenticated
    return null;
  }

  if (!matchId) return <p>Loading...</p>;

  return <Chat matchId={matchId} userId={userId} />;
};

export default ChatPage;
