import Link from "next/link"

type AppButtonProps = {
    children: React.ReactNode
    type: "submit" | "reset" | "button" | undefined
    href?: string,
    onClick: () => any
}

export default function AppButton({children, type, href, onClick} : AppButtonProps) {
    
    const buttonStyle = 'w-full capitalize text-zenith-yellow py-3 rounded-lg text-center hover:scale-[1.025] border-t-2 border-b-2 border-r-1 border-l-1 border-zenith-yellow transition-all font-black text-lg bg-gradient-to-b from-zenith-dark-purple'
    
    return (
        <>
            {href ? (
                <Link 
                    className={`${buttonStyle}`}
                    href={href}
                >{children}</Link>
            ) : (
                <button
                    type={type}
                    className={buttonStyle}
                    onClick={onClick}
                >{children}</button>
            )}
        </>
    )
    
}
