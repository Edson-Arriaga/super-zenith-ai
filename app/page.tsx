import InitialRedirect from "@/components/initialPage/InitialRedirect";
import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function InitialPage() {
    const clerkUser = await currentUser();
    let user

    if(clerkUser){
        user = await prisma.user.findUnique({ where: { clerkId: clerkUser.id }, select: {plan: true} });
    }

    return (
        <>
            {user && <InitialRedirect userPlan={user.plan}/>}
            <main className="h-screen flex flex-col justify-center -mb-10 xl:p-10 lg:-ml-24">
                <div className="flex items-center xl:mx-20 my-24 xl:my-16">
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
                        href={'sign-in' } 
                        className="relative w-9/12 uppercase text-zenith-purple bg-zenith-yellow py-3 xl:py-4 rounded-lg text-center hover:bg-zenith-dark-yellow font-black border-b-4 border-r-4 border-zenith-dark-purple transition-colors text-lg lg:text-2xl">
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
                        className="uppercase w-9/12 text-center text-zenith-yellow ring-1 ring-zenith-yellow py-3 xl:py-4 rounded-lg font-black hover:bg-white/10 text-lg lg:text-2xl"
                    >Registrarse</Link>
                </section>
            </main>
        </>
    )
}
