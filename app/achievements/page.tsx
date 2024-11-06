import { getUser } from "@/actions/get-user";
import AchievementCard from "@/components/achievements/AchievementCard";
import PageTitle from "@/components/ui/PageTitle";
import { achievements } from "@/src/data/achievements";
import { User } from "@prisma/client";

export default async function AchievementsPage() {
    
    const user = await getUser()
    const userAchievements : User['completedAchievements'] = user.completedAchievements

    return (
        <div className="mb-10">
            <PageTitle>Logros</PageTitle>
            <p className="text-center text-zenith-yellow capitalize text-2xl mb-10 -mt-4">logros completados: <span className="font-bold text-3xl">{userAchievements.length} / {achievements.length}</span></p>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-zenith-yellow">
                {achievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} userAchievements={userAchievements}/>
                ))}
            </ul>
        </div>
    )
}
