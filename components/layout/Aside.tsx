"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidMedal } from "react-icons/bi";
import { HiCalendarDays } from "react-icons/hi2";
import PropOver from "./PropOver";

export default function Aside() {
    
    const [propOverActive, setPropOverActive] = useState(0)
    
    return (
        <>
            <SignedIn>
                <aside 
                    className="hidden lg:flex bg-zenith-dark-purple w-20 h-screen fixed flex-col items-center py-5 border-r-2 border-zenith-yellow shadow-md shadow-zenith-yellow z-10"
                >
                    <div className="shadow-inner shadow-black p-2 rounded-full grid hover:bg-zenith-purple transition-colors"> 
                        <UserButton appearance={{elements: { rootBox: "w-12 h-12 pt-[1px]", avatarBox: "w-14 h-14 -ml-1"}}}/>
                    </div>
                    <nav className="flex flex-col justify-evenly items-center h-full">
                        <Link
                            className="relative"
                            href='/habit-tracker'
                            onMouseEnter={() => setPropOverActive(1)}
                            onMouseLeave={() => setPropOverActive(0)}
                        >
                            <HiCalendarDays className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all" />
                            {propOverActive === 1 && <PropOver>Habit Tracker</PropOver>}
                        </Link>

                        <Link
                            className="relative"
                            href='/achievements'
                            onMouseEnter={() => setPropOverActive(3)}
                            onMouseLeave={() => setPropOverActive(0)}
                            >
                            <BiSolidMedal className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all" />
                            {propOverActive === 3 && <PropOver>Logros</PropOver>}
                        </Link>
                    </nav>
                    
                    <div className="relative shadow-inner shadow-black rounded-full hover:bg-zenith-purple p-8 transition-colors">
                        <Image
                        className="p-2"
                        fill
                        src="/images/zenith-logo.png"
                        alt="Zenith Logo" 
                        />
                    </div>
                </aside>
                
            </SignedIn>
            <SignedOut>
                <aside 
                    className="hidden lg:flex bg-zenith-yellow w-20 h-screen fixed flex-col items-center py-5 border-r-2 border-zenith-yellow">
                </aside>
            </SignedOut>
        </>
        
    )
}
