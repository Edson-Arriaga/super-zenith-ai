import { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import ZenithPointsModal from "./ZenithPointsModal";
import { getUser } from "@/actions/get-user";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ZenithPointsButton({zenithPoints} : {zenithPoints: number}) {
    
    const [isGettingStartModalOpen, setIsGettingStartModalOpen] = useState(false)

    const {data : user, isError} = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    if (isError) toast.error('Error al obtener el usuario. Por favor, intenta de nuevo más tarde.')
    
    function handleClick(){
        setIsGettingStartModalOpen(true)
    }
   
    if(user) return (
        <>
            <button
                className={`border-[3px] border-yellow-500 rounded-full p-2 hover:bg-purple-500/10 hover:shadow-none hover:scale-105 duration-500 transition-all ${zenithPoints === 0 && 'border-opacity-40'}`}
                onClick={handleClick}    
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
                user={user}
            />
        </>
    )
}
