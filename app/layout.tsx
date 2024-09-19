import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PiListChecksBold  } from "react-icons/pi";
import { ImCalendar } from "react-icons/im";
import { HiCalendarDays } from "react-icons/hi2";
import { BiSolidMedal } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

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
                <aside className="bg-zenith-dark-purple bg-opacity-50 w-16 h-screen fixed flex flex-col items-center shadow-2xl shadow-black drop-shadow-2xl py-5">
                  <div className="h-full w-10 absolute aside-decor top-0 -right-10 -z-10 shadow-sm shadow-black drop-shadow-2xl bg-gradient-to-r from-zenith-dark-purple"></div>
                  <SignedIn>
                    
                    <div className="shadow-inner shadow-black ml-9 p-2 rounded-full grid hover:bg-zenith-purple transition-colors"> 
                      <UserButton appearance={{elements: { rootBox: "w-14 h-14", avatarBox: "w-14 h-14"}}}/>
                    </div>
                    <nav className="flex flex-col justify-evenly items-center h-full">
                      <Link href='/habit-tracker'>
                          <HiCalendarDays className="w-14 h-14 ml-8 hover:scale-105 hover:cursor-pointer text-zenith-yellow shadow-inner shadow-black p-1 rounded-lg hover:bg-zenith-purple transition-colors" />
                      </Link>
                      <Link href='/habit-tracker'>
                          <PiListChecksBold className="w-14 h-14 ml-8 hover:scale-105 hover:cursor-pointer text-zenith-yellow shadow-inner shadow-black p-1 rounded-lg hover:bg-zenith-purple transition-colors" />
                      </Link>
                      <Link href='/habit-tracker'>
                          <BiSolidMedal className="w-14 h-14 ml-8 hover:scale-105 hover:cursor-pointer text-zenith-yellow shadow-inner shadow-black p-1 rounded-lg hover:bg-zenith-purple transition-colors" />
                      </Link>
                    </nav>
                    
                    <div className="w-16 h-16 shadow-inner shadow-black ml-9 p-2 rounded-full hover:bg-zenith-purple transition-colors">
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
