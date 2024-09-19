import { Habit } from '@prisma/client'

export type AddHabitFormData = Pick<Habit, 'title' | 'description' | 'category' | 'frequency'> & {
    weeklyDays? : Habit['weeklyDays']
}