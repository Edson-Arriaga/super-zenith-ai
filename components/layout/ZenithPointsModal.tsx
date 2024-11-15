import { Dispatch, SetStateAction } from "react";
import Modal from "../ui/Modal";
import { AiFillThunderbolt } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { isUserPremium } from "@/actions/is-user-premium";

type GettingStartModalProps = {
    isGettingStartModalOpen: boolean
    setIsGettingStartModalOpen: Dispatch<SetStateAction<boolean>>,
    zenithPoints: number
}

export default function ZenithPointsModal({isGettingStartModalOpen, setIsGettingStartModalOpen, zenithPoints} : GettingStartModalProps) {
    
    const {data : user} = useQuery({
        queryKey: ['isUserPremium'],
        queryFn: async () => isUserPremium()
    })
    
    const totalZenithPoints = user?.isPremium ? 10 : 3
    
    const totalZenithPointsArray = Array(totalZenithPoints).fill(false).map((_, index) => index < zenithPoints)

    return (
        <Modal isModalOpen={isGettingStartModalOpen} setIsModalOpen={setIsGettingStartModalOpen}>
            <div className="text-zenith-yellow mt-10 space-y-5">
                <h2 className="text-3xl font-bold text-center">Tus Puntos Zenith</h2>
                <section className="grid grid-cols-3 gap-5 place-items-center pb-5">
                    {totalZenithPointsArray.map((zenithPoint, i) => (
                        <div key={i} className="rounded-full shadow-inner shadow-black p-2 hover:bg-purple-500/10">
                            <AiFillThunderbolt size={30} className={`text-zenith-yellow ${zenithPoint ? 'opacity-100' : 'opacity-30'}`}/>
                        </div>
                    ))}
                </section>
            </div>
        </Modal>
    )
}
