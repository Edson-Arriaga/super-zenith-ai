import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { LiaCalendarCheck } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

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
                <div className="bg"><img src="/images/svg/logo.svg" alt="" /></div>
                <div className="bg bg1"><img src="/images/svg/logo.svg" alt="" /></div>
                <div className="bg bg2"><img src="/images/svg/logo.svg" alt="" /></div>
                <aside className="bg-zenith-yellow w-16 h-screen fixed py-2 text-center">
                  <UserButton appearance={{elements: { rootBox: "w-12 h-12", avatarBox: "w-12 h-12"}}}/>
                  <nav className="flex flex-col justify-between items-center mt-16">
                    <LiaCalendarCheck className="w-12 h-12 hover:scale-105 hover:cursor-pointer" />
                  </nav>
                  <img src="images/logo.png" alt="Zenith Logo" />
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
