import Image from "next/image";

export default function GettingStartButton() {    
    return (
        <button 
            className="relative border-[3px] border-zenith-yellow rounded-full p-7 hover:scale-105 hover:bg-purple-500/10 duration-500 transition-all"  
        >
            <Image
                className="p-2"
                fill
                src="/images/zenith-logo.png"
                alt="Zenith Logo" 
            />
        </button>
    )
}
