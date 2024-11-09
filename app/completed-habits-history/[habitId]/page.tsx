import AppButton from "@/components/ui/AppButton";
import PageTitle from "@/components/ui/PageTitle";
import { weekDays } from "@/src/data/weekDays";
import prisma from "@/src/lib/prisma";
import { frequency_ES } from "@/src/locales/frequency";
import { redirect } from "next/navigation";

export default async function HabitCompletedDetails({params} : {params : {habitId: string}}) {
    
    const habit = await prisma.completedHabitHistory.findUnique({where: {id: +params.habitId}})

    if(!habit) redirect('/not-found')

    return (
        <div className="flex flex-col justify-center mb-10">
            <PageTitle>Detalles del Hábito</PageTitle>
            <section className="grid lg:grid-cols-2 gap-10 mx-auto max-w-screen-xl">
                <div>
                    <h2 className="text-2xl font-bold text-zenith-yellow">Título:</h2>
                    <p className="text-lg text-white max-w-96">{habit.title}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-zenith-yellow">Descripción:</h2>
                    {habit.description ? (
                        <p className="text-lg text-white">{habit.description}</p>
                    ) : (
                        <p className="text-lg text-white max-w-96">Sin Descripción disponible.</p>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-zenith-yellow capitalize">Frecuencia:</h2>
                    <p className="text-lg text-white">{frequency_ES[habit.frequency]}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-zenith-yellow capitalize">Duración:</h2>
                    <p className="text-lg text-white">{habit.plannedDays} días</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-zenith-yellow capitalize">Fecha de inicio:</h2>
                    <p className="text-lg text-white">{habit.startDay.toLocaleDateString()}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-zenith-yellow capitalize">Fecha de finalización:</h2>
                    <p className="text-lg text-white">{habit.completedDay.toLocaleDateString()}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-zenith-yellow capitalize">Veces Completado:</h2>
                    <p className="text-lg text-white">{habit.timesCompleted}</p>
                </div>
                {habit.weeklyDays.length !== 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-zenith-yellow capitalize">Días de la semana realizado:</h2>
                        <p className="text-lg text-white">
                            {habit.weeklyDays.map((day, i) => (
                                <span key={day} className={i === 0 ? 'capitalize' : ''}>
                                    {weekDays[day]}
                                    {habit.weeklyDays.length - 1 === i ? '.' :  habit.weeklyDays.length - 2 === i ? ' y ' : ', '}
                                </span>
                            ))}
                        </p>
                    </div>
                )}
            </section>
            
            <AppButton className="mx-auto mt-12 max-w-36" href="/completed-habits-history">Volver</AppButton>
        </div>
    )
}
