import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import { Nunito } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
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
          className={`${nunitoSans.variable} ${nunitoSans.variable} antialiased h-screen pt-15`}
        >
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-background fixed top-0 left-0 right-0 z-100 shadow-xl">
            <Link href={"/dashboard"} className="flex items-end">
              <img src="b-logo.png" alt="b" className="h-10 w-10" />
              <h1 className="pl-[2px] text-4xl font-bold">oox</h1>
            </Link>

            <SignedOut>
              <SignInButton
                mode="modal"
                appearance={{
                  elements: {
                    button:
                      "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600",
                  },
                }}
              >
                Login
              </SignInButton>
              <SignUpButton
                mode="modal"
                appearance={{
                  elements: {
                    button:
                      "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600",
                  },
                }}
              >
                Register
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
