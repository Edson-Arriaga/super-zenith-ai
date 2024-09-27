"use client"

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    
    const [isMenuActive, setIsMenuActive] = useState(false)

    return (
        <SignedIn>
            <header className="flex items-center justify-between px-2 lg:hidden h-20 border-b-2 border-zenith-yellow shadow-sm shadow-zenith-yellow">
                <div className="shadow-inner p-1 shadow-black rounded-full grid"> 
                    <UserButton appearance={{elements: { rootBox: "w-14 h-14 pt-[1px]", avatarBox: "w-14 h-14"}}}/>
                </div>

                <div className="relative w-14 h-14">
                    <Image
                        fill
                        src="/images/zenith-logo.png"
                        alt="Zenith Logo" 
                    />
                </div>

                <button type="button" onClick={() => setIsMenuActive(true)}>
                    <AiOutlineMenu className="text-zenith-yellow h-14 w-14"/>
                </button>

                {isMenuActive && (
                    <div className="fixed w-screen h-screen bg-zenith-dark-purple inset-0 z-50">
                        <nav className="flex flex-col gap-10 w-full h-full justify-center items-center">
                            <Link 
                                href={'/habit-tracker'}
                                className="text-zenith-yellow font-black text-3xl"
                                onClick={() => setIsMenuActive(false)}
                            >-- Habit Tracker --</Link>
                        </nav>
                    </div>
                )}
            </header>
        </SignedIn>
    )
}
