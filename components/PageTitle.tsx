export default function PageTitle({children} : {children: React.ReactNode}) {
    return (
        <h1 
            className="text-zenith-yellow uppercase text-center lg:text-start font-bold text-5xl lg:text-7xl lg:ml-5 py-5 mt-5 mb-10 after:w-[500px] lg:after:h-3 after:absolute after:rounded-lg after:top-32 after:left-24 after:animate-bounce after:bg-gradient-to-l after:from-zenith-yellow animate-pulse"
        >
            {children}
        </h1>
    )
}
