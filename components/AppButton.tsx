
type AppButtonProps = {
    children: React.ReactNode
    type: "submit" | "reset" | "button" | undefined
    className?: string
}

export default function AppButton({children, type, className} : AppButtonProps) {
    return (
        <button
            type={type}
            className={`${className} w-full capitalize text-zenith-yellow bg-zenith-dark-purple/50 py-3 rounded-lg text-center hover:scale-[1.025] border-b-4 border-r-2 border-l-2 border-zenith-yellow transition-all font-black text-lg`}
        >{children}</button>
    )
}
