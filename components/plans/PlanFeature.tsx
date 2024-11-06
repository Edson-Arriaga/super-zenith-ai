import { PiSealCheckDuotone } from "react-icons/pi";
import { FaTimesCircle } from "react-icons/fa";

export default function PlanFeature({children, notIncluded} : {children: React.ReactNode, notIncluded?: boolean}) {
    return (
        <li className='flex items-center justify-center gap-5'>
            <div>
                {notIncluded ? (
                    <FaTimesCircle className="text-red-500" size={23}/>
                ) : (
                    <PiSealCheckDuotone className="text-zenith-yellow" size={30}/>
                )}
            </div>
            <p className='text-lg w-10/12 font-black text-left'>{children}.</p>
        </li>
    )
}
