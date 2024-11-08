"use client";

import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { TbArrowWaveRightUp } from "react-icons/tb";
import { PiArrowArcLeftBold } from "react-icons/pi";
import PageTitle from "@/components/ui/PageTitle";

export default function SignInPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])
   
    if (!isMounted) return null;

    return (
        <div className="flex flex-col mb-10 items-center lg:justify-center lg:flex-row lg:h-screen lg:mb-0 lg:gap-36 lg:-ml-24">
            <section className="relative text-center flex">
                <PageTitle><span className="lg:text-5xl xl:text-6xl">Iniciar sesión</span></PageTitle>
                <TbArrowWaveRightUp size={150} className="hidden lg:block absolute rotate-45 text-zenith-yellow animate-pulse top-12 -right-36 z-50"/>
                
                <PiArrowArcLeftBold size={80} className="block lg:hidden absolute -rotate-[80deg] w-full text-zenith-yellow animate-pulse top-28 -left-36 z-50"/>
            </section>
            <SignIn />
        </div>
    )
}
