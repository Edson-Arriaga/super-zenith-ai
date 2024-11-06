"use client";

import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { TbArrowWaveRightUp } from "react-icons/tb";
import { PiArrowArcLeftBold } from "react-icons/pi";
import PageTitle from "@/components/ui/PageTitle";

export default function SignInPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <main className="flex flex-col mb-10 items-center xl:justify-normal xl:flex-row xl:h-screen xl:mb-0 xl:gap-36">
            <section className="relative text-center flex">
                <PageTitle>Iniciar sesión</PageTitle>
                <TbArrowWaveRightUp size={150} className="hidden xl:block absolute rotate-45 text-zenith-yellow animate-pulse top-12 -right-36 z-50"/>
                
                <PiArrowArcLeftBold size={80} className="block xl:hidden absolute -rotate-[80deg] w-full text-zenith-yellow animate-pulse top-28 -left-36 z-50"/>
            </section>
            <SignIn />
        </main>
    )
}
