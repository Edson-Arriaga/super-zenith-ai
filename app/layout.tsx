import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from '@clerk/localizations';
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import QueryClientProvider from "@/components/QueryClientProvider";

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
        <ClerkProvider localization={esES} appearance={{
          variables: {
            colorPrimary: "#fcc919",
            colorText: "#fcc919",
            colorBackground: "#28094f"
          },
          elements: {
            navbarItem: {
              color: "#fcc919",
            },
            navbarItem__active: {
              color: "#fcc919",
            },
          }
        }}>
            <html lang="en" className="overflow-x-hidden">
              <body className={`${nunito.className} antialiased flex flex-col lg:flex-row bg-zenith-dark-purple`}>

                  <Header />

                  <Aside />
                  
                  <div className="flex-grow lg:ml-24 px-3 sm:px-10 md:px-5 lg:px-14 xl:px-10 mb-10">
                    <QueryClientProvider>
                      {children}
                    </QueryClientProvider>
                  </div>
                  
                  <ToastContainer 
                      position="top-center"
                      pauseOnHover={false}
                      // rtl
                  />
              </body>
            </html>  
        </ClerkProvider>
    );
}
