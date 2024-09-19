export default function PageTitle({children} : {children: React.ReactNode}) {
    return (
        <h1 
            className="text-zenith-yellow uppercase font-bold text-7xl py-5 mt-5 mb-10 ml-10 after:w-[500px] after:h-3 after:-ml-32 after:absolute after:rounded-lg after:top-32 after:left-52 after:animate-bounce after:bg-gradient-to-l after:from-zenith-yellow animate-pulse"
        >
            {children}
        </h1>
    )
}
