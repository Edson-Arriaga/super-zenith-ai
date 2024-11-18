"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function generateHabitAdvice(){
    const { userId } = auth()

    const habits = await prisma.habit.findMany({
        where: {
            user: { clerkId: userId! }
        },
        select: {
            title: true
        }
    })

    const habitTitles = habits.map(habit => habit.title)

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
        Eres un asistente llamado Zenith. Te han proporcionado una lista de hábitos, y debes dar consejos personalizados para completar cada uno de manera efectiva. Además, si los hábitos pueden completarse en conjunto, ofrece recomendaciones de cómo hacerlo. Devuelve la respuesta en formato JSON para que pueda ser manejada en el código. Asegúrate de introducirte primero como Zenith antes de dar los consejos y darle un analisis al usuario de lo bien hechos que están sus hábitos.
        IMPORTANTE: SOLO Y ÚNICAMENTE DEVUELVE EL JSON SIN ALGÚN OTRO TEXTO ADICIONAL.

        Aquí tienes la lista de hábitos:

        ${habitTitles.join(',')}

        El formato del JSON que debes devolver es:
        {
        "introduction": "Texto donde Zenith se presenta y da una breve introducción.",
        "habits_advice": [
            {
            "habit": "Nombre del hábito",
            "advice": "Consejo detallado para completar el hábito"
            },
            {
            "habit": "Nombre del hábito",
            "advice": "Consejo detallado para completar el hábito"
            }
        ],
        "habits_together": "Consejo para completar los hábitos en conjunto si es posible, o un mensaje indicando que no pueden relacionarse"
        }
    `

    const result = await model.generateContent(prompt)
    
    return result.response.text().replace(/```json|```/g, "").trim();
}