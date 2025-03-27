// components/Chat.tsx
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Message } from "@prisma/client";

const socket: Socket = io("http://localhost:3000"); // Adjust to your deployed URL in production

interface ChatProps {
  matchId: string;
  userId: string;
}

interface Match {
  id: string;
  like1: { userId: string };
  like2: { userId: string };
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ matchId, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.emit("joinMatch", { matchId, userId });

    socket.on("joined", () => {
      console.log("Joined match room:", matchId);
    });

    socket.on("message", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("error", ({ message }: { message: string }) => {
      console.error(message);
    });

    return () => {
      socket.off("message");
      socket.off("joined");
      socket.off("error");
    };
  }, [matchId, userId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const res = await fetch(`/api/matches/${userId}`);
    const matches: Match[] = await res.json();
    const match = matches.find((m) => m.id === matchId);
    if (!match) return;

    const receiverId =
      match.like1.userId === userId ? match.like2.userId : match.like1.userId;

    socket.emit("sendMessage", {
      matchId,
      senderId: userId,
      receiverId,
      text: message,
    });
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.senderId === userId ? "You" : "Them"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
