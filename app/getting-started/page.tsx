import AppButton from "@/components/ui/AppButton";
import PageTitle from "@/components/ui/PageTitle";
import { currentUser } from "@clerk/nextjs/server";
import { SiListmonk } from "react-icons/si";

export default async function GettingStartedPage() {

    const clerkUser = await currentUser()

    return (
        <div className="mb-10 mx-2 mr-5">
            <PageTitle>Guía de inicio</PageTitle>
            
            <section className="mx-auto max-w-screen-sm">
                <h2 className="text-2xl font-bold text-zenith-yellow uppercase mb-2">Super zenith AI:</h2>
                <ul className="text-white space-y-5">
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <p>
                            <span className="font-bold text-zenith-yellow">Super Zenith AI</span> es una 
                            herramienta poderosa que te ayudará a mejorar de forma
                            significativa tu productividad a lo largo del día e incluso de tu vida a largo
                            plazo, todo esto gracias a su gestor de hábitos o Habit Tracker el cuál te
                            permitirá realizar un seguimiento de todos los hábitos que quieras comenzar
                            a realizar en tu vida o de los que ya estés realizando en la actualidad. <br />
                            Por si fuera poco, <span className="font-bold text-zenith-yellow">Super Zenith AI</span> 
                            {' '}se encarga de leer y analizar tus hábitos mediante inteligencia artificial
                            siendo capaz de generar por su cuenta consejos totalmente únicos y especialmente
                            personalizados para ti acorde a cada uno de estos, además te brida sugerencias
                            sobre como puedes relacionar cada uno de tus hábitos para que el realizarlos se
                            te facilite aún más.  
                        </p>
                    </li>
                </ul>
            </section>

            <section className="mx-auto max-w-screen-sm text-justify mt-16">
                <h2 className="text-2xl font-bold text-zenith-yellow uppercase mb-2">Fallos:</h2>
                <ul className="text-white space-y-5">
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <p>
                            Para asegurar que verdaderamente estés cumpliendo tus hábitos, Super Zenith AI
                            se encargará gracias a su algoritmo de detección de fallos de no poder seguir
                            realizando todos aquellos hábitos que no hayas estado marcando como completados
                            según los días planificados.
                        </p>
                    </li>
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <div>
                            <p>
                                Tus hábitos tienen un rango del 5% en fallos, así que se
                                reiniciarán de manera forzosa y automática si es qué lo
                                sobrepasas, haciendo que lo vuelvas a comenzarlo desde 0.
                            </p>
                            <br />
                            <p>
                                De este modo dependiendo de la duración de tus hábitos,
                                el número de fallos permitidos antes de tenerse que reiniciar
                                forzosamente será el siguiente: <br />
                                <span className="font-black text-zenith-yellow">Corta:</span> 1 fallo. <br />
                                <span className="font-black text-zenith-yellow">Media:</span> 2 Fallos. <br />
                                <span className="font-black text-zenith-yellow">Definitiva:</span> 3 Fallos.

                            </p>
                        </div>
                    </li>
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <p>
                            Mientras no pases de los fallos permitidos, los días fallados serán contados
                            como días completados, aunque claro, en el calendario se podrá visualizar
                            qué día es el que fallaste.
                        </p>
                    </li>
                </ul>
            </section>

            <section className="mx-auto max-w-screen-sm mt-16">
                <h2 className="text-2xl font-bold text-zenith-yellow uppercase mb-2">puntos zenith:</h2>
                <ul className="text-white space-y-5">
                    <li className="flex items-center gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow" size={20}/>
                        </div>
                        <p>
                            Cada día se te regenerarán tus Puntos Zenith, 3 o 10, dependiendo tu plan.
                        </p>
                    </li>
                </ul>
            </section>

            <section className="mx-auto max-w-screen-sm mt-16">
                <h2 className="text-2xl font-bold text-zenith-yellow uppercase mb-2">función IA:</h2>
                <ul className="text-white space-y-5">
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <p>
                            Debes tener por lo menos dos hábitos creados si quieres usar la función con IA,
                            esto para poder relacionar tus hábitos y crear consejos específicamente para tí.
                        </p>
                    </li>
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <p>
                            Si se te acaban tus puntos Zenith, podrás consultar tus últimos consejos
                            generados por IA en el mismo botón de generación de consejos 
                            (botón con destellos en Habit Tracker).
                        </p>
                    </li>
                </ul>
            </section>

            <section className="mx-auto max-w-screen-sm mt-16">
                <h2 className="text-2xl font-bold text-zenith-yellow uppercase mb-2">Planes: </h2>
                <ul className="text-white space-y-5">
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-zenith-yellow">Plan Gratis: </h3>
                            <ul>
                                <li>- Crear hasta 2 hábitos. </li>
                                <li>- Recibir 3 puntos zenith al día.</li>
                                <li>- Solo hábitos con una duración de 45 días.</li>
                            </ul>
                        </div>
                    </li>
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-zenith-yellow">Plan Premium: </h3>
                            <ul>
                                <li>- Crear hasta 10 hábitos. </li>
                                <li>- Recibir 10 puntos zenith al día.</li>
                                <li>- Crear hábitos con las 3 duraciones disponibles.</li>
                                <li>- Acceso a niveles en los hábitos.</li>
                                <li>- Historial de hábitos completos.</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </section>

            {!clerkUser && (
                <section className="mx-auto max-w-screen-sm text-justify mt-16">
                    <h2 className="text-2xl font-bold text-zenith-yellow uppercase mb-2">Comienza Ahora:</h2>
                    <div className="flex mt-3 max-w-52">
                        <AppButton href="/sign-in">
                            Iniciar Sesión
                        </AppButton>
                    </div>
                </section>
            )}
        </div>
    )
}
