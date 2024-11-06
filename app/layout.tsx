import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from '@clerk/localizations';
import Header from "@/components/layout/Header";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import Aside from "@/components/layout/Aside";

const nunito = Nunito({
    weight: ['300', '500', '700'], 
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: "Super Zenith AI",
    description: "La App que te ayudará a convertirte en tu mejor versión.",
    icons: {
        icon: '/images/zenith-logo.png'
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="overflow-x-hidden">
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
                    }
                }
            }}>
                <QueryClientProvider>
                    <body className={`${nunito.className} antialiased flex flex-col lg:flex-row main-bg`}>
                        <Header />

                        <Aside />

                        <main className="flex-grow lg:ml-24 px-3 sm:px-10 md:px-5 lg:px-14 xl:px-10 h-full">
                            {children}
                        </main>

                        <ToastContainer 
                            position="top-center"
                            pauseOnHover={false}
                        />
                    </body>
                </QueryClientProvider>
            </ClerkProvider>
        </html>  
    );
}
