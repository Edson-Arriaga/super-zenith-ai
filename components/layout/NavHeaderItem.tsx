import { NavItem } from "@/src/types";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type NavHeaderItemProps = {
    navItem: NavItem,
    setIsMenuActive: Dispatch<SetStateAction<boolean>>,
    pathName: string,
    iconSmall?: boolean
}

export default function NavHeaderItem({setIsMenuActive, navItem, pathName, iconSmall} : NavHeaderItemProps) {

    return (
        <Link 
            href={navItem.href}
            className={`font-normal text-zenith-yellow text-3xl ${pathName === navItem.href && 'font-black bg-purple-500/10 leading-[4.5rem]'}`}
            onClick={() => setIsMenuActive(false)}
        >
            <div className="flex items-center mx-10 gap-5">
                <navItem.icon size={iconSmall ? 30 : 40}/>
                <p>{navItem.pageName}</p>
            </div>
        </Link>
    )
}
