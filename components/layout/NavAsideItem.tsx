import Link from "next/link";
import PropOver from "./PropOver";
import { Dispatch, SetStateAction } from "react";
import { NavItem } from "@/src/types";

type NavAsideItemProps = {
    pathName: string,
    setPropOverActive: Dispatch<SetStateAction<number>>
    navItem: NavItem
    propOverActive: number
    extraPadding?: boolean
}

export default function NavAsideItem({pathName, navItem, propOverActive, setPropOverActive, extraPadding} : NavAsideItemProps) {
    return (
        <Link
            className={`
                relative rounded-full hover:bg-purple-500/10 duration-500 transition-all hover:shadow-md p-1
                ${pathName === navItem.href && 'scale-105 bg-purple-500/10 hover:bg-transparent shadow-md'}
            `}
            href={navItem.href}
            onMouseEnter={() => setPropOverActive(navItem.id)}
            onMouseLeave={() => setPropOverActive(-1)}
        >
            <navItem.icon 
            className={`
                w-12 h-12 hover:scale-110 hover:cursor-pointer text-yellow-500/80 rounded-lg hover:text-zenith-yellow duration-500 transition-all p-1
                ${extraPadding && 'p-2'}
                ${pathName === navItem.href && 'text-yellow-500 hover:scale-95 hover:text-yellow-500/70'}`
            }/>
            {propOverActive === navItem.id && <PropOver>{navItem.pageName}</PropOver>}
        </Link>
    )
}
