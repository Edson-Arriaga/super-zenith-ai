import getHabitHistory from "@/actions/get-habit-history"
import PageTitle from "@/components/ui/PageTitle"
import { CgDetailsMore } from "react-icons/cg"
import Link from "next/link"
import { isUserPremium } from "@/actions/is-user-premium"

export default async function CompletedHabitsHistoryPage() {
    const habitHistory = await getHabitHistory()
    const user = await isUserPremium() 


    return (    
        <div className="mb-10">
            <PageTitle>
                Historial de hábitos completos
            </PageTitle>


            {user.isPremium ? (
                <section className="overflow-x-auto">
                    {habitHistory.length !== 0 ? (
                        <table className="text-zenith-yellow w-full lg:w-[50rem] mx-auto max-w-screen-md">
                            <thead className="bg-opacity-50 text-xl">
                                <tr className="uppercase font-bold">
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2 border-x border-zenith-yellow">Título</th>
                                    <th className="px-4 py-2">Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {habitHistory.map((habit, i) => (
                                    <tr key={habit.id} className="text-lg border-t border-zenith-yellow hover:bg-purple-800 hover:bg-opacity-30 transition-colors duration-200">
                                        <td className="border-r border-zenith-yellow px-4 py-3 font-black">{i + 1}</td>
                                        <td className="border-x border-zenith-yellow px-4 py-3 text-white">{habit.title}</td>
                                        <td className="border-l border-zenith-yellow px-4 py-3 text-center">
                                            <Link 
                                                href={`/completed-habits-history/${habit.id}`}
                                                className="inline-flex items-center justify-center p-1 rounded-xl border border-zenith-yellow hover:bg-purple-500/10 hover:scale-105 transition-all duration-500"
                                            >
                                                <CgDetailsMore size={30} className="text-zenith-yellow" />
                                                <span className="sr-only">Ver detalles</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ): (
                        <p className="text-zenith-yellow font-bold text-center mt-5 text-lg">No tienes hábitos completos aún.</p>
                    )}
                </section>
            ) : (
                <p className="text-zenith-yellow font-bold text-center mt-5 text-lg">Actualiza tu plan para ver tus hábitos completos.</p>
            )}
        </div>
    )
}