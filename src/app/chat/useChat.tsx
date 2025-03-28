import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { Message } from "@prisma/client";

export function useChat(matchId: string) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!matchId) {
            console.error("matchId is missing");
            return;
        }

        async function fetchMessages() {
            try {
                const res = await fetch(`/api/messages?matchId=${matchId}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch messages: ${res.statusText}`);
                }
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }

        fetchMessages();

        if (!process.env.NEXT_PUBLIC_PUSHER_KEY || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) {
            console.error("Pusher environment variables are missing");
            return;
        }

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        });
        const channel = pusher.subscribe(`chat-${matchId}`);

        channel.bind("new-message", (newMessage: Message) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [matchId]);

    return messages;
}
