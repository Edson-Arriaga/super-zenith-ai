import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { HabitsAdvice } from "@/src/schema";
import AppButton from "../ui/AppButton";
import Image from "next/image";
import { motion } from "framer-motion";

type DeleteModalProps = {
    isAIModalOpen: boolean
    setIsAIModalOpen: Dispatch<SetStateAction<boolean>>
    habitsAdvice: HabitsAdvice 
}

export default function AIModal({isAIModalOpen, setIsAIModalOpen, habitsAdvice} : DeleteModalProps) {
    
    const [advice, setAdvice] = useState(-1)

    function handleClick(){
        if(advice < habitsAdvice.habits_advice.length){
            setAdvice(prev => prev + 1)
        } else{
            setIsAIModalOpen(false)
            setAdvice(-1)
        }
    }

    useEffect(() => {
        if(!isAIModalOpen){
            setAdvice(-1)
        }
    }, [isAIModalOpen])
    
    return (
        <Modal isModalOpen={isAIModalOpen} setIsModalOpen={setIsAIModalOpen} >
            {habitsAdvice && (
                <div className="text-yellow-50 p-10 -mx-8">
                    {advice === -1 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-20 h-20 relative mx-auto mb-3">
                                <Image src={'/images/zenith-logo.png'} fill alt="Zenith Logo"/>
                            </div>
                            <p className="text-justify text-xl">{habitsAdvice.introduction}</p>
                        </motion.div>
                    )}

                
                    {habitsAdvice.habits_advice?.map((habit, i) => (
                        <>
                            {advice === i && (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                    <h2 className="text-zenith-yellow font-black text-2xl mb-4">{habit.habit}</h2>
                                    <p className="text-justify">{habit.advice}</p>
                                    </motion.div>
                            )}   
                        </>
                    ))}

                    {advice === habitsAdvice.habits_advice?.length && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-zenith-yellow font-black text-2xl mb-4">Hábitos en conjunto</h2>
                            <p className="text-justify">{habitsAdvice.habits_together}</p>
                        </motion.div>
                    )}

                    <AppButton onClick={handleClick} className="mt-5 -mb-10">
                        Siguiente
                    </AppButton>
                </div>
            )}
        </Modal>
    )
}
