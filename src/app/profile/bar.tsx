"use client";

import { BookOpen, Home, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";

export function Bar() {
    const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "faq", label: "FAQ", icon: Search },
    { id: "contact", label: "Contact", icon: ShoppingBag },
  ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black py-4 flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex flex-col items-center px-3 py-2 transition-all ${
              activeTab === item.id ? "text-white" : "text-gray-400"
            }`}
          >
            {activeTab === item.id && (
              <div className="absolute -top-4 w-26 h-20 bg-indigo-600 rounded-2xl transition-all duration-300"></div>
            )}
            <item.icon className={`w-6 h-6 relative ${activeTab === item.id ? "text-white" : ""}`} />
            <span className="text-xs relative mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    );
}