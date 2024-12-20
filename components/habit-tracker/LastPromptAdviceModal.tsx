import { Dispatch, SetStateAction, useState } from "react"
import Modal from "../ui/Modal"
import AppButton from "../ui/AppButton"
import AIModal from "./AIModal"
import { IoWarningSharp } from "react-icons/io5";
import { HabitsAdvice, HabitsAdviceSchema } from "@/src/schema"
import { toast } from "react-toastify"
import LittleLoading from "../ui/LittleLoading"
import { getUser } from "@/actions/get-user"

type LastPromptAdviceModalProps = {
    isLastPromptAdviceModalOpen: boolean
    setIsLastPromptAdviceModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function LastPromptAdviceModal({isLastPromptAdviceModalOpen, setIsLastPromptAdviceModalOpen} : LastPromptAdviceModalProps) {
    const [isAIModalOpen, setIsAIModalOpen] = useState(false)
    const [lastPromptAdvice, setLastPromptAdvice] = useState<HabitsAdvice>()
    const [isLoading, setIsLoading] = useState(false)

    async function handleClick(){
        setIsLoading(true)
        const response = await getUser()
        const lastPromptAdvice = HabitsAdviceSchema.safeParse(response.lastAdvicePrompt)
        setIsLoading(false)
        if(lastPromptAdvice.success){
            setIsLastPromptAdviceModalOpen(false)
            setLastPromptAdvice(lastPromptAdvice.data)
            setIsAIModalOpen(true)
        } else{
            toast.error('Lo sentimos, ocurrió un problema al cargar los consejos.')
        }
    }

    return (
        <>
            <Modal isModalOpen={isLastPromptAdviceModalOpen} setIsModalOpen={setIsLastPromptAdviceModalOpen}>
                <div className="flex flex-col gap-3 items-center">
                    <IoWarningSharp className="text-red-600" size={50}/>
                    <h2 className="font-black text-red-600 text-xl pr-5">Ya no tienes suficientes puntos Zenith para generar consejos nuevos, espera al día de mañana.</h2>
                    <p className="text-zenith-yellow text-lg">Aquí puedes revisar tu último prompt generado con IA:</p>
                    <AppButton onClick={handleClick}>
                        {isLoading ? (
                            <LittleLoading/>
                        ) : (
                            <>Mostrar</>
                        )}
                    </AppButton>
                </div>
            </Modal>

            <AIModal isAIModalOpen={isAIModalOpen} setIsAIModalOpen={setIsAIModalOpen} habitsAdvice={lastPromptAdvice!}/>
        </>
    )
}
