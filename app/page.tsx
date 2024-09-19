import Image from "next/image";
import Link from "next/link";

export default async function InitialPage() {
    
    return (
        <main className="h-screen">
            <div className="flex items-center mx-20 pt-10">
                <img src="/images/zenith-full-logo.png" alt="sdf" />
            </div>
            
            <div className="flex justify-center gap-32 mt-28">
                <div className="relative hover:scale-105 transition-transform">
                    <div className="absolute w-28 -top-[125px]">
                        <img src="images/zenith-logo.png" alt="" />
                    </div>
                    <Link 
                        href={'/sign-in'}
                        className="uppercase text-zenith-purple bg-zenith-yellow px-5 py-3 rounded-lg text-center hover:bg-yellow-500 font-black text-2xl border-b-4 border-r-4 border-zenith-dark-purple transition-colors"
                    >Iniciar Sesión</Link>
                </div>
                
                <div className="hover:scale-105 transition-transform">
                    <Link 
                        href={'/sign-up'}
                        className="uppercase text-zenith-yellow ring-1 ring-zenith-yellow px-5 py-3 rounded-lg font-black text-2xl"
                    >Registrarse</Link>
                </div>

            </div>
        </main>
    );
}
