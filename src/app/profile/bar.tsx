"use client";

import {
  BookCheck,
  BookHeart,
  BookOpen,
  BookOpenCheck,
  BookUser,
  Heart,
  Home,
  MessageCircleHeart,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function Bar() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const navItems = [
    { id: "/dashboard", label: "Swipe", icon: BookOpenCheck },
    { id: "/liked-books", label: "Liked", icon: Heart },
    { id: "/chat", label: "Chat", icon: MessageCircleHeart },
    { id: "/profile", label: "My Books", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black flex justify-around items-center py-2">
      {navItems.map((item) => {
        const isActive = pathname === item.id;
        return (
          <button
            key={item.id}
            onClick={() => router.push(item.id)}
            className={`relative flex flex-col items-center px-3 py-2 transition-all ${
              isActive ? "text-white" : "text-gray-400"
            }`}
          >
            {isActive && (
              <div className="absolute -top-4 w-26 h-20 bg-indigo-600 rounded-2xl transition-all duration-300"></div>
            )}
            <item.icon className="w-6 h-6 relative" />
            <span className="text-xs relative mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
