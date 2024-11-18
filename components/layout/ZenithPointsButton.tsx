import { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import ZenithPointsModal from "./ZenithPointsModal";

export default function ZenithPointsButton({zenithPoints} : {zenithPoints: number}) {
    
    const [isGettingStartModalOpen, setIsGettingStartModalOpen] = useState(false)
    
    return (
        <>
            <button
                className={`border-[3px] border-yellow-500 rounded-full p-2 hover:bg-purple-500/10 hover:shadow-none hover:scale-105 duration-500 transition-all ${zenithPoints === 0 && 'border-opacity-40'}`}
                onClick={() => setIsGettingStartModalOpen(true)}    
            >
                {zenithPoints !== 0 ? (
                    <AiFillThunderbolt size={40} className="text-zenith-yellow"/>
                ) : (
                    <AiFillThunderbolt size={40} className="text-zenith-yellow opacity-40"/>
                )}
            </button>

            <ZenithPointsModal 
                isGettingStartModalOpen={isGettingStartModalOpen} 
                setIsGettingStartModalOpen={setIsGettingStartModalOpen}
                zenithPoints={zenithPoints}
            />
        </>
    )
}
