"use client"

import { iconMapping } from "@/src/data/achievements";
import { Achievement } from "@/src/types"
import { User } from "@prisma/client"
import { motion } from "framer-motion";

type AchievementCardProps = {
    achievement: Achievement
    userAchievements: User['completedAchievements']
}

export default function AchievementCard({achievement, userAchievements} : AchievementCardProps) {
    const Icon = iconMapping[achievement.id]

    return (
        <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: achievement.id * 0.1, duration: 0.5 }}
            className={`bg-purple-500 bg-opacity-10 rounded-lg p-6 shadow-lg hover:shadow-sm hover:shadow-zenith-yellow transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}
        >
            <div className={`${!userAchievements.includes(achievement.id) && 'opacity-35'}`}>
                <section className="-z-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">{achievement.name}</h2>
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-tr flex items-center justify-center from-zenith-yellow to-zenith-purple`}>
                            <Icon className="w-10 h-10 text-purple-200"/>
                        </div>
                    </div>
                    <p className="text-purple-200">{achievement.description}</p>
                </section>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"/>
            </div>
        </motion.li>
    )
}
