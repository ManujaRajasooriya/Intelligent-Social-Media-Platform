import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Connect',
  description: 'A Next.js 13 Connect Aplication'
}

function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
      <h1>My App</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton/>
      </SignedOut>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <ClerkProvider>
        <html lang="en">
        {/* {children} */}
        <body className={inter.className}>
        {/* <Header /> */}
        <Topbar />
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">
            {children}
            </div>
          </section>
          <RightSidebar />
        </main>
          
          <Bottombar />
          </body>
          </html>
      </ClerkProvider>

  );
}

