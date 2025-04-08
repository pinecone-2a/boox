"use client";

import { BookCheck, BookHeart, BookOpen, BookOpenCheck, BookUser, Heart, Home, MessageCircleHeart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function Bar() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const navItems = [
    { id: "/dashboard", label: "Swipe", icon: BookOpenCheck },
    { id: "/likedBooks", label: "Liked", icon: Heart },
    { id: "/chat", label: "Chat", icon: MessageCircleHeart },
    { id: "/profile", label: "User", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black flex justify-around items-center py-2">
      {navItems.map(({ id, label, icon: Icon }) => {
        const isActive = pathname === id;

        return (
          <button
            key={id}
            onClick={() => router.push(id)}
            aria-label={label}
            className={`relative flex flex-col items-center px-3 py-2 transition-all ${
              isActive ? "text-white" : "text-gray-400"
            } focus:ring-2 focus:ring-indigo-500`}
          >
            {isActive && (
              <div className="absolute -top-4 w-26 h-20 bg-indigo-600 rounded-2xl transition-all duration-300"></div>
            )}
            <Icon className={`w-6 h-6 relative transition-transform duration-300 ${isActive ? "scale-110 text-white" : ""}`} />
            <span className="text-xs relative mt-1">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
