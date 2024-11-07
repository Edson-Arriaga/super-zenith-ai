import { Dispatch, SetStateAction, useEffect } from "react";
import Confetti from "react-confetti";

type ConfettiDecorProps = {
    isConfettiActive: boolean,
    setIsConfettiActive: Dispatch<SetStateAction<boolean>>
}

export default function ConfettiDecor({isConfettiActive, setIsConfettiActive} : ConfettiDecorProps ) {
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsConfettiActive(false)
        }, 4500)

        return () => clearTimeout(timeout)
    }, [isConfettiActive])
    
    return (
        <div className="fixed inset-0 z-50">
            <Confetti recycle={false} numberOfPieces={300} wind={0.05}/>
        </div>
    )
}
