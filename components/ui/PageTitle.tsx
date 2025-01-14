export default function PageTitle({children} : {children: React.ReactNode}) {
    return (
        <h1 
            className="text-zenith-yellow uppercase text-center font-bold text-4xl md:text-5xl lg:text-6xl py-5 mt-5 mb-8
            after:block after:animate-pulse after:w-[200px] after:h-[3px] after:rounded-lg after:bg-gradient-to-l after:via-zenith-yellow after:from-purple-500/0 after:mx-auto after:mt-3 after:-z-40
            before:block before:animate-pulse before:w-[200px] before:h-[3px] before:rounded-lg before:bg-gradient-to-l before:via-zenith-yellow before:from-purple-500/0 before:mx-auto before:mb-3  before:-z-40" 
        >
            {children}
        </h1>
    )
}
