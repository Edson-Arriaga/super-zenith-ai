"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidMedal } from "react-icons/bi";
import { HiCalendarDays } from "react-icons/hi2";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import PropOver from "./PropOver";
import { useQuery } from "@tanstack/react-query";
import getZenithPoints from "@/actions/get-zenith-points";
import { usePathname } from "next/navigation";

export default function Aside() {
    const pathName = usePathname()
    const [propOverActive, setPropOverActive] = useState(0)

    const {data : zenithPoints } = useQuery({
        queryKey: ['zenith-points'],
        queryFn: () => getZenithPoints(new Date()),
        placeholderData: 0,
        enabled: (pathName !== '/') && (pathName !== '/sign-up')
    })
    
    return (
        <SignedIn>
            <aside 
                className="hidden lg:flex bg-zenith-dark-purple w-20 h-screen fixed flex-col items-center py-5 border-r-2 border-zenith-yellow shadow-md shadow-zenith-yellow z-10"
            >
                <div className="shadow-inner shadow-black p-2 rounded-full grid hover:bg-zenith-purple transition-colors"> 
                    <UserButton appearance={{elements: { rootBox: "w-12 h-12 pt-[1px]", avatarBox: "w-14 h-14 -ml-1"}}}/>
                </div>
                <nav className="flex flex-col justify-evenly items-center h-full">
                    <Link
                        className={`relative rounded-lg ${pathName === '/habit-tracker' && 'bg-purple-500 bg-opacity-20'}`}
                        href='/habit-tracker'
                        onMouseEnter={() => setPropOverActive(1)}
                        onMouseLeave={() => setPropOverActive(0)}
                    >
                        <HiCalendarDays className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all duration-300" />
                        {propOverActive === 1 && <PropOver>Habit Tracker</PropOver>}
                    </Link>

                    <Link
                        className={`relative rounded-lg ${pathName === '/achievements' && 'bg-purple-500 bg-opacity-20'}`}
                        href='/achievements'
                        onMouseEnter={() => setPropOverActive(2)}
                        onMouseLeave={() => setPropOverActive(0)}
                        >
                        <BiSolidMedal className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all duration-500" />
                        {propOverActive === 2 && <PropOver>Logros</PropOver>}
                    </Link>

                    <Link
                        className={`relative rounded-lg ${pathName === '/completed-habits-history' && 'bg-purple-500 bg-opacity-20'}`}
                        href='/completed-habits-history'
                        onMouseEnter={() => setPropOverActive(3)}
                        onMouseLeave={() => setPropOverActive(0)}
                        >
                        <FaHistory className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-2 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all duration-500" />
                        {propOverActive === 3 && <PropOver>Historial De Hábitos Comp...</PropOver>}
                    </Link>

                    <Link
                        className={`relative rounded-lg ${pathName === '/plans' && 'bg-purple-500 bg-opacity-20'}`}
                        href='/plans'
                        onMouseEnter={() => setPropOverActive(4)}
                        onMouseLeave={() => setPropOverActive(0)}
                    >
                        <FaFileInvoiceDollar className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-2 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all duration-500" />
                        {propOverActive === 4 && <PropOver>Planes</PropOver>}
                    </Link>
                </nav>

                {zenithPoints !== undefined && (
                    <section className="flex flex-col gap-2 mb-5">
                        <div className="shadow-inner shadow-black p-1 rounded-full grid hover:bg-zenith-purple transition-colors"> 
                            <AiFillThunderbolt 
                                className={`${zenithPoints < 3 && 'opacity-35'} text-zenith-yellow`} 
                                size={25}/>
                        </div>
                        <div className="shadow-inner shadow-black p-1 rounded-full grid hover:bg-zenith-purple transition-colors"> 
                            <AiFillThunderbolt 
                            className={`${zenithPoints < 2 && 'opacity-35'} text-zenith-yellow`} 
                            size={25}/>
                        </div>
                        <div className="shadow-inner shadow-black p-1 rounded-full grid hover:bg-zenith-purple transition-colors"> 
                        <AiFillThunderbolt 
                            className={`${zenithPoints < 1 && 'opacity-35'} text-zenith-yellow`} 
                            size={25}/>
                        </div>
                    </section>
                )}
                
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
    )
}
