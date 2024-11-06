import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import ConfettiDecor from "../ui/ConfettiDecor";
import { achievements, iconMapping } from "@/src/data/achievements";
import { Achievement } from "@/src/types";

export default function AchievementModal() {
  const [isConfettiActive, setIsConfettiActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean[]>([])
  const [achievementsCompleted, setAchievementCompleted] = useState<Achievement[]>([])

  const router = useRouter()
  const searchParams = useSearchParams()

  const queryAchievements = searchParams.get("achievements")

  useEffect(() => {
    setIsConfettiActive(true)

    if (queryAchievements) {
        const ach = queryAchievements.split(",").map(Number)
        const newAchievements = achievements.filter((achiv) => ach.includes(achiv.id))
        setAchievementCompleted(newAchievements)
        setIsModalOpen(new Array(newAchievements.length).fill(true))
        router.push("habit-tracker")
    } 
  }, [queryAchievements, router])

  const closeModal = (index: number) => {
    setIsModalOpen((prev) => {
        const newModalState = [...prev]
        newModalState[index] = false
        return newModalState
    })
  }

  if (achievementsCompleted.length > 0) {
    return (
        <>
            {achievementsCompleted.map((ach, index) => {
                const Icon = iconMapping[ach.id]
                
                return (
                    <Modal
                        isModalOpen={isModalOpen[index]}
                        setIsModalOpen={() => closeModal(index)} 
                        key={ach.id}
                    >
                        <div className="text-zenith-yellow space-y-5">
                            <h1 className="text-2xl font-black text-center">
                                <span className="block">FELICIDADES!</span> Haz completado un nuevo logro, sigue así
                            </h1>
                            <section className="bg-black/20 flex flex-col items-center p-4 rounded-lg">
                                <div className={`${ach.color} w-16 h-16 rounded-full bg-gradient-to-b flex items-center justify-center`}>
                                <Icon className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="font-bold text-xl">{ach.name}</h2>
                                <p className="text-white mt-3 text-center">{ach.description}</p>
                            </section>
                        </div>
                    </Modal>
                )
            })}

            {isConfettiActive && (
                <ConfettiDecor isConfettiActive={isConfettiActive} setIsConfettiActive={setIsConfettiActive} />
            )}
        </>
    )
}

  return null
}
