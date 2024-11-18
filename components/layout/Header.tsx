"use client"

import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import NavHeaderItem from "./NavHeaderItem";
import { navItems } from "@/src/data/navItems";
import ZenithPointsButton from "./ZenithPointsButton";
import GettingStartedButton from "./GettingStartedButton";
import usePointsAndRedirect from "@/src/hooks/usePointsAndRedirect";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
    
    const [isMenuActive, setIsMenuActive] = useState(false)
    const pathName = usePathname()

    const {zenithPoints} = usePointsAndRedirect(pathName)

    return (
        <header className="flex items-center justify-between px-2 lg:hidden h-20 border-b-2 border-zenith-yellow shadow-sm shadow-zenith-yellow">
            <div className="shadow-inner p-1 shadow-black rounded-full grid"> 
                <UserButton appearance={{elements: { rootBox: "w-14 h-14 pt-[1px]", avatarBox: "w-14 h-14"}}}/>
            </div>

            <section className="flex gap-5 justify-center">
                
                <GettingStartedButton/> 
                
                {zenithPoints !== undefined && (
                    <div>
                        <ZenithPointsButton zenithPoints={zenithPoints}/>
                    </div>
                )}
            </section>

            <button type="button" onClick={() => setIsMenuActive(true)}>
                <AiOutlineMenu className="text-zenith-yellow h-14 w-14"/>
            </button>

            {isMenuActive && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="fixed w-screen h-screen bg-zenith-dark-purple inset-0 z-50"
                >
                    <nav className="flex flex-col gap-20 w-full h-full justify-center text-left">
                        {navItems.map(navItem => (
                            <NavHeaderItem 
                                key={navItem.id} 
                                navItem={navItem} 
                                setIsMenuActive={setIsMenuActive}
                                pathName={pathName}
                                iconSmall={navItem.href === '/plans' || navItem.href === '/completed-habits-history'}
                            />
                        ))}
                    </nav>
                </motion.div>
            )}
        </header>
    )
}