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
import { Viewport } from "next";

const nunito = Nunito({
    weight: ['300', '500', '700'], 
    subsets: ['latin'],
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    title: "Super Zenith AI - Mejora Un 1% Cada Día",
    description: "Super Zenith AI es una herramienta avanzada de inteligencia artificial diseñada para mejorar tu productividad y ayudarte a alcanzar tus objetivos personales mediante un seguimiento de hábitos personalizado. ¡Empieza tu viaje hacia una mejor versión de ti mismo hoy!",
    icons: {
        icon: '/images/zenith-logo.png',
    },
    keywords: 'Super Zenith AI, inteligencia artificial para hábitos, productividad, seguimiento de hábitos, gestión de metas, inteligencia artificial personalizada, hábitos saludables, mejora personal, app de productividad, asistente de productividad',
    applicationName: "Super Zenith AI",
    creator: 'Super Zenith AI Team',
    robots: {index: true, follow: true },
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
