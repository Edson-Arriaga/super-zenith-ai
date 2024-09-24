import Image from "next/image";
import Link from "next/link";

export default async function InitialPage() {
    
    return (
        <main className="h-screen flex flex-col">
            <div className="flex items-center mx-20 pt-10">
                <Image
                    width={2100}
                    height={650}
                    src="/images/zenith-full-logo.png" 
                    alt="Full Zenith Logo"
                    quality={100}
                />
            </div>
            
            <div className="flex justify-center gap-32 mt-28">
                <div className="relative hover:scale-105 transition-transform">
                    <div className="absolute w-32 h-32 left-1 -top-[150px]">
                        <Image
                            width={1248}
                            height={1292}
                            src="/images/zenith-logo.png" 
                            alt="Zenith Logo" 
                        />
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
