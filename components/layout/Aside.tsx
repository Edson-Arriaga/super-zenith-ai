"use client"

import { SignedIn, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getZenithPoints from "@/actions/get-zenith-points";
import { usePathname } from "next/navigation";
import NavAsideItem from "./NavAsideItem";
import { navItems } from "@/src/data/navItems";
import ZenithPointsButton from "./ZenithPointsButton";
import GettingStartButton from "./GettingStartButton";

export default function Aside() {
    const pathName = usePathname()
    const [propOverActive, setPropOverActive] = useState(-1)

    const {data : zenithPoints } = useQuery({
        queryKey: ['zenith-points'],
        queryFn: () => getZenithPoints(new Date()),
        placeholderData: 0,
        enabled: (pathName !== '/') && (pathName !== '/sign-up') && (pathName !== '/sign-in')
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
                    {navItems.map(navItem => (
                        <NavAsideItem 
                            key={navItem.id}
                            pathName={pathName} 
                            navItem={navItem} 
                            propOverActive={propOverActive}
                            setPropOverActive={setPropOverActive}
                            extraPadding={navItem.href === '/plans' || navItem.href === '/completed-habits-history'}
                        />
                    ))}
                </nav>

                {zenithPoints !== undefined && (
                    <div className="h-28"> 
                        <ZenithPointsButton zenithPoints={zenithPoints}/>
                    </div>
                )}
                
                <GettingStartButton /> 
            </aside>
        </SignedIn>
    )
}
