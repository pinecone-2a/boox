import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "boox",
  description: "Creaded by team ctrlZ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-background fixed top-0 left-0 right-0 z-100 shadow-xl">
            <div className="flex items-end">
              <img src="b-logo.png" alt="b" className="h-10 w-10"/>
              <h1 className="pl-[2px] text-4xl font-bold">oox</h1>
            </div>
            
            <SignedOut>
              <SignInButton mode="modal" appearance={{
                elements: {
                  button: "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600",
                }
              }}>
                Login
              </SignInButton>
              <SignUpButton mode="modal" appearance={{
                elements: {
                  button: "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600",
                }
              }}>
                Register
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <div className="h-16"></div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
