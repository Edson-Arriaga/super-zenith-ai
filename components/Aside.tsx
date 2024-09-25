import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { BiSolidMedal } from "react-icons/bi";
import { HiCalendarDays } from "react-icons/hi2";
import { PiListChecksBold } from "react-icons/pi";

export default function Aside() {
    return (
        <>
            <SignedIn>
                <aside className="hidden lg:flex bg-zenith-dark-purple w-20 h-screen fixed flex-col items-center py-5 border-r-2 border-zenith-yellow shadow-md shadow-zenith-yellow">
                    <div className="shadow-inner shadow-black p-2 rounded-full grid hover:bg-zenith-purple transition-colors"> 
                        <UserButton appearance={{elements: { rootBox: "w-12 h-12 pt-[1px]", avatarBox: "w-12 h-12"}}}/>
                    </div>
                    <nav className="flex flex-col justify-evenly items-center h-full">
                        <Link href='/habit-tracker'>
                            <HiCalendarDays className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all" />
                        </Link>
                        <Link href='/habit-tracker'>
                            <PiListChecksBold className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all" />
                        </Link>
                        <Link href='/habit-tracker'>
                            <BiSolidMedal className="w-12 h-12 hover:scale-105 hover:cursor-pointer text-yellow-400 border-x-2 border-zenith-yellow p-1 rounded-lg hover:text-zenith-yellow hover:bg-white/10 transition-all" />
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
