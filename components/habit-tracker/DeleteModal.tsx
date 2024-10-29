import { Dispatch, SetStateAction } from "react"
import AppButton from "../ui/AppButton"
import Modal from "../ui/Modal"
import { UseMutateFunction } from "@tanstack/react-query"

type DeleteModalProps = {
    isDeleteModalOpen: boolean
    setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
    deleteHabitMutate: UseMutateFunction<string, Error, void, unknown>
}

export default function DeleteModal({isDeleteModalOpen, setIsDeleteModalOpen, deleteHabitMutate} : DeleteModalProps) {
    return (
        <Modal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen}>
            <div className="flex flex-col gap-5 w-full">
                <p className="text-zenith-yellow font-bold pr-6 text-xl">¿Estás seguro que quieres eliminar el hábito?</p>
                <AppButton
                    type="button" 
                    onClick={() => {
                        setIsDeleteModalOpen(false)
                        deleteHabitMutate()
                    }}
                >
                    Eliminar
                </AppButton>
            </div>
        </Modal>
    )
}
