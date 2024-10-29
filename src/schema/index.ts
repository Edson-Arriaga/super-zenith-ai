import { Category, Frequency } from '@prisma/client'
import {z} from 'zod'

export const HabitSchema = z.object({
    title: z.string()
            .trim()
            .min(1, 'El titulo es obligatorio')
    ,
    description: z.string().trim().optional(),
    category: z.nativeEnum(Category, {message: 'La categoría es obligatoria'}),
    frequency: z.nativeEnum(Frequency, {message: 'La Frecuencia es obligatoria'}),
    weeklyDays: z.array(z.number()),
    plannedDays: z.number(),
}).superRefine((data, ctx) => {
    if (data.frequency === 'WEEKLY' && data.weeklyDays.length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['weeklyDays'], 
            message: 'Selecciona al menos un día a la semana',
        });
    }
})

export type HabitFormData = z.infer<typeof HabitSchema>

export const HabitsAdviceSchema = z.object({
    introduction: z.string(),
    habits_advice: z.array(z.object({
        habit: z.string(),
        advice: z.string()
    })),
    habits_together: z.string()
})

export type HabitsAdvice = z.infer<typeof HabitsAdviceSchema>