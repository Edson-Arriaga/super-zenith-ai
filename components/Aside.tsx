"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidMedal } from "react-icons/bi";
import { HiCalendarDays } from "react-icons/hi2";
import { PiListChecksBold } from "react-icons/pi";
import PropOver from "./PropOver";

export default function Aside() {
    
    const [isPropOverActive, setIsPropOverActive] = useState({id: 0})
    
    return (
        <>
            <SignedIn>
                <aside 
                    className="hidden lg:flex bg-zenith-dark-purple w-20 h-screen fixed flex-col items-center py-5 border-r-2 border-zenith-yellow shadow-md shadow-zenith-yellow z-10"
                >
                    <div className="shadow-inner shadow-black p-2 rounded-full grid hover:bg-zenith-purple transition-colors"> 
                        <UserButton appearance={{elements: { rootBox: "w-12 h-12 pt-[1px]", avatarBox: "w-12 h-12"}}}/>
                    </div>
                    <nav className="flex flex-col justify-evenly items-center h-full">
                        <Link
                            className="relative"
                            href='/habit-tracker'
                            onMouseEnter={() => setIsPropOverActive({id: 1})}
                            onMouseLeave={() => setIsPropOverActive({id: 0})}
                        >
                            <HiCalendarDays className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all" />
                            {isPropOverActive.id === 1 && <PropOver>Habit Tracker</PropOver>}
                        </Link>

                        <Link
                            className="relative"
                            href=''
                            onMouseEnter={() => setIsPropOverActive({id: 2})}
                            onMouseLeave={() => setIsPropOverActive({id: 0})}
                            >
                            <PiListChecksBold className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all" />
                            {isPropOverActive.id === 2 && <PropOver>Proximamente...</PropOver>}
                        </Link>

                        <Link
                            className="relative"
                            href=''
                            onMouseEnter={() => setIsPropOverActive({id: 3})}
                            onMouseLeave={() => setIsPropOverActive({id: 0})}
                            >
                            <BiSolidMedal className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all" />
                            {isPropOverActive.id === 3 && <PropOver>Proximamente...</PropOver>}
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
