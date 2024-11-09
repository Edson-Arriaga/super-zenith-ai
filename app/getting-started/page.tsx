import PageTitle from "@/components/ui/PageTitle";
import { SiListmonk } from "react-icons/si";

export default function page() {
    return (
        <div className="mb-10 mx-2 mr-5">
            <PageTitle>Guía de inicio</PageTitle>

            <section className="mx-auto max-w-screen-sm text-justify">
                <h2 className="text-2xl font-bold text-zenith-yellow uppercase mb-2">Fallos:</h2>
                <ul className="text-white space-y-5">
                    <li className="flex gap-5">
                        <div>
                            <SiListmonk className="text-zenith-yellow mt-2" size={20}/>
                        </div>
                        <div>
                            <p>
                                Tus hábitos tienen un rango del 5% en fallos,así que se
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
        </div>
    )
}
