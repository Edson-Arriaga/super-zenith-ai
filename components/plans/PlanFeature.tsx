import { PiSealCheckDuotone } from "react-icons/pi";

export default function PlanFeature({children} : {children: React.ReactNode}) {
    return (
        <li className='flex items-center justify-center gap-5'>
            <div>
                <PiSealCheckDuotone className="text-zenith-yellow" size={30}/>
            </div>
            <p className='text-lg w-1/2'>{children}</p>
        </li>
    )
}
