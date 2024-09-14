import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { LiaCalendarCheck } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

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
        <html lang="en" className="overflow-x-hidden" >
            <body className={`${nunito.className} antialiased flex`}>
                <div className="bg"><img src="/images/svg/logo.svg" alt="" /></div>
                <div className="bg bg1"><img src="/images/svg/logo.svg" alt="" /></div>
                <div className="bg bg2"><img src="/images/svg/logo.svg" alt="" /></div>
                <aside className="bg-zenith-yellow w-16 h-screen fixed flex items-center justify-center">
                  <LiaCalendarCheck className="w-10 h-10" />
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
        </html>
    );
}
