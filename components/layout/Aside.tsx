"use client"

import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { usePathname } from "next/navigation";
import NavAsideItem from "./NavAsideItem";
import { navItems } from "@/src/data/navItems";
import ZenithPointsButton from "./ZenithPointsButton";
import GettingStartedButton from "./GettingStartedButton";
import useRedirect from "@/src/hooks/useRedirect";

export default function Aside() {
    const pathName = usePathname()
    const [propOverActive, setPropOverActive] = useState(-1)
    
    useRedirect(pathName)
    
    return (
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

            
            <div className="h-28"> 
                <ZenithPointsButton />
            </div>
          
            
            <GettingStartedButton /> 
        </aside>
    )
}
