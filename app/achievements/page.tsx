import PageTitle from "@/components/ui/PageTitle";
import { achievements } from "@/src/data/achievements";
import prisma from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

export default async function AchievementsPage() {

    const { userId } = auth()

    let userAchievements : User['completedAchievements'] = []

    if(userId){
        const user = await prisma.user.findUnique( { where: { clerkId : userId } } )
        if(user){
            userAchievements = user.completedAchievements
        }
    }

    return (
        <main className="mb-16">
            <PageTitle>Logros</PageTitle>
            <p className="text-center text-zenith-yellow capitalize text-2xl mb-10 -mt-4">logros completados: <span className="font-bold text-3xl">{userAchievements.length} / {achievements.length}</span></p>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-zenith-yellow">
                {achievements.map(achievement => (
                    <div
                        key={achievement.id}
                        className={`${!userAchievements.includes(achievement.id) && 'opacity-50'}  bg-purple-500 bg-opacity-10 rounded-lg p-6 shadow-lg hover:shadow-sm hover:shadow-zenith-yellow transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}
                    >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-30 z-0"></div>
                        <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-semibold">{achievement.name}</h2>
                                    <div className={`${achievement.color} w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center`}>
                                        <achievement.icon className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <p className="text-purple-200">{achievement.description}</p>
                            </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"></div>
                    </div>
                ))}
            </section>
        </main>
    )
}
