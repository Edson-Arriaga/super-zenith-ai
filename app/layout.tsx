import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { LiaCalendarCheck } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const nunito = Nunito({
  weight: ['300', '500', '700'], 
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Super Zenith AI",
  description: "La Web que te ayudará a convertirte en tu mejor versión.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="overflow-x-hidden">
          <ClerkProvider>
            <body className={`${nunito.className} antialiased flex`}>
                <div className="bg"></div>
                <div className="bg bg1"></div>
                <div className="bg bg2"></div>
                <aside className="bg-zenith-yellow w-16 h-screen fixed py-2 flex flex-col items-center">
                  <SignedOut>
                    <div className="w-12">
                      <img src="/images/zenith-logo.png" alt="Zenith Logo" />
                    </div>
                  </SignedOut>
                  <UserButton appearance={{elements: { rootBox: "w-12 h-12", avatarBox: "w-12 h-12"}}}/>
                  <nav className="flex flex-col justify-evenly items-center h-full">
                    <LiaCalendarCheck className="w-12 h-12 hover:scale-105 hover:cursor-pointer" />
                    <LiaCalendarCheck className="w-12 h-12 hover:scale-105 hover:cursor-pointer" />
                    <LiaCalendarCheck className="w-12 h-12 hover:scale-105 hover:cursor-pointer" />
                  </nav>
                  <SignedIn>
                    <div className="w-12 mt-auto">
                      <img src="/images/zenith-logo.png" alt="Zenith Logo" />
                    </div>
                  </SignedIn>
                </aside>
                
                <div className="flex-grow ml-16">
                    {children}
                </div>
                <ToastContainer 
                    position="top-center"
                    pauseOnHover={false}
                    rtl
                />
            </body>
          </ClerkProvider>
        </html>
    );
}
