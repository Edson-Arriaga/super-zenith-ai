import Link from "next/link"

type AppButtonProps = {
    children: React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
    href?: string,
    onClick?: () => unknown,
    className?: string,
    disabled?: boolean
}

export default function AppButton({children, type, href, onClick, className, disabled} : AppButtonProps) {
    
    const buttonStyle = `w-full text-base xl:text-lg capitalize text-zenith-yellow py-3 rounded-lg text-center lg:hover:scale-[1.025] border-t-2 border-b-2 border-r-1 border-l-1 border-zenith-yellow transition-all duration-500 font-black lg:hover:bg-purple-500/10 disabled:hover:scale-100 disabled:opacity-40 ${className}`
    
    return (
        <>
            {href !== undefined ? (
                <>
                    {href !== '' ? (
                        <Link 
                            className={`${buttonStyle}`}
                            href={href}
                        >{children}</Link>
                    ) : (
                        <button
                            type={type}
                            className={buttonStyle}
                            onClick={onClick}
                            disabled={disabled}
                        >{children}</button>
                    )}
                </>
            ) : (
                <button
                    type={type}
                    className={buttonStyle}
                    onClick={onClick}
                    disabled={disabled}
                >{children}</button>
            )}
        </>
    )
    
}
