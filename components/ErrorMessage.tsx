export default function ErrorMessage({children} : {children: React.ReactNode}){
    return (
        <p className="text-center w-full bg-red-500 p-2 rounded-lg text-white capitalize">{children}</p>
    )
}