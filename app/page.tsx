import Image from "next/image";
import Link from "next/link";

export default async function InitialPage() {

    return (
        <main className="h-screen-without-header flex flex-col justify-center -mb-10 xl:p-10">
            <div className="flex items-center lg:mx-20 my-24 lg:my-16">
                <Image
                    width={2100}
                    height={650}
                    src="/images/zenith-full-logo.png" 
                    alt="Full Zenith Logo"
                    quality={100}
                />
            </div>
            
            <section className="flex flex-col lg:flex-row items-center justify-center gap-5 flex-grow lg:mx-20">
                <Link 
                    href='/sign-in' 
                    className="relative w-full uppercase text-zenith-purple bg-zenith-yellow py-3 xl:py-4 rounded-lg text-center hover:bg-zenith-dark-yellow font-black border-b-4 border-r-4 border-zenith-dark-purple transition-colors text-lg lg:text-2xl">

                        <div className="absolute w-32 h-32 -top-[125px] hover:brightness-75">
                            <Image
                                fill
                                src="/images/zenith-logo.png" 
                                alt="Zenith Logo" 
                            />
                        </div>
                        
                        <p>Iniciar Sesión</p>

                    
                </Link>

                <Link 
                    href='/sign-up'
                    className="uppercase text-center text-zenith-yellow ring-1 ring-zenith-yellow py-3 xl:py-4 rounded-lg font-black w-full hover:bg-white/10 text-lg lg:text-2xl"
                >Registrarse</Link>

            </section>
        </main>
    );
}
