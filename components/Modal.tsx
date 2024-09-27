import { Dispatch, SetStateAction, useEffect } from "react"
import { motion } from 'framer-motion'
import { RxCross2 } from "react-icons/rx"

type ModalProps = {
    children: React.ReactNode
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal({children, isModalOpen, setIsModalOpen} : ModalProps) {
    
    useEffect(() => {
        if(isModalOpen){
            document.documentElement.style.overflow = 'hidden'
            document.body.style.paddingRight = '15px'
        } 

        return () => {
            document.documentElement.style.overflow = ''
            document.body.style.paddingRight = '0'
        }
    }, [isModalOpen])

    if (!isModalOpen) return null
    
    return (
        <div 
            className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center bg-black/50"
            onClick={() => setIsModalOpen(false)}
        >
            <motion.div 
                className="p-6 rounded-md shadow-md w-96 bg-zenith-dark-purple relative mx-3"
                onClick={e => e.stopPropagation()}
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.3}}
            >
                <button className="absolute right-5 text-white" onClick={() => setIsModalOpen(false)}>
                    <RxCross2 size={30}/>
                </button>
                {children}
            </motion.div>
        </div>
    )
}
