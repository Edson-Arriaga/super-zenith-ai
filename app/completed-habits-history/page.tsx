import getHabitHistory from "@/actions/get-habit-history"
import PageTitle from "@/components/ui/PageTitle"
import { categories_ES } from "@/src/locales/categories"
import { frequency_ES } from "@/src/locales/frequency"
import { CgDetailsMore } from "react-icons/cg"
import Link from "next/link"

export default async function CompletedHabitsHistoryPage() {
    const habitHistory = await getHabitHistory()

    return (    
        <main className="h-full">
            <PageTitle>
                Historial de hábitos completos
            </PageTitle>

            <div className="overflow-x-auto">
                <table className="text-zenith-yellow border border-zenith-yellow w-full lg:w-[50rem] mx-auto">
                    <thead className="border border-zenith-yellow bg-purple-900 bg-opacity-50 text-lg">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Categoría</th>
                            <th className="px-4 py-2 text-left">Frecuencia</th>
                            <th className="px-4 py-2 text-left">Duración</th>
                            <th className="px-4 py-2 text-center">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitHistory.map((habit, i) => (
                            <tr key={habit.id} className="border-t border-zenith-yellow hover:bg-purple-800 hover:bg-opacity-30 transition-colors duration-200">
                                <td className="px-4 py-3">{i + 1}</td>
                                <td className="px-4 py-3">{habit.title}</td>
                                <td className="px-4 py-3">{categories_ES[habit.category]}</td>
                                <td className="px-4 py-3">{frequency_ES[habit.frequency]}</td>
                                <td className="px-4 py-3">{habit.plannedDays} días</td>
                                <td className="px-4 py-3 text-center">
                                    <Link 
                                        href={`/habit-details/${habit.id}`}
                                        className="inline-flex items-center justify-center p-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zenith-yellow focus:ring-opacity-50"
                                    >
                                        <CgDetailsMore size={24} className="text-zenith-yellow" />
                                        <span className="sr-only">Ver detalles</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}