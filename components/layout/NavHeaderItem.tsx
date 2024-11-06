import { NavItem } from "@/src/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type NavHeaderItemProps = {
    navItem: NavItem,
    setIsMenuActive: Dispatch<SetStateAction<boolean>>
}

export default function NavHeaderItem({setIsMenuActive, navItem} : NavHeaderItemProps) {

    const pathName = usePathname()

    return (
        <Link 
            href={navItem.href}
            className={`font-black text-zenith-yellow text-3xl ${pathName === navItem.href && 'font-normal text-zenith-dark-yellow'}`}
            onClick={() => setIsMenuActive(false)}
        >
            <div className="flex items-center mx-10 gap-5">
                <navItem.icon size={40}/>
                <p>{navItem.pageName}</p>
            </div>
        </Link>
    )
}
