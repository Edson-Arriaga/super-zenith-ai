import Link from "next/link"

type AppButtonProps = {
    children: React.ReactNode
    type: "submit" | "reset" | "button" | undefined
    href?: string
}

export default function AppButton({children, type, href} : AppButtonProps) {
    return (
        <>
            {href ? (
                <Link 
                    className={`w-full capitalize text-zenith-yellow py-3 rounded-lg text-center hover:scale-[1.025] border-b-4 border-r-2 border-l-2 border-zenith-yellow transition-all font-black text-lg`}
                    href={href}
                >{children}</Link>
            ) : (
                <button
                    type={type}
                    className={`w-full capitalize text-zenith-yellow py-3 rounded-lg text-center hover:scale-[1.025] border-b-4 border-r-2 border-l-2 border-zenith-yellow transition-all font-black text-lg`}
                >{children}</button>
            )}
        </>
    )
    
}
