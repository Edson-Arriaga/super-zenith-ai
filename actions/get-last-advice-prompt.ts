"use server"

import { getUser } from "./get-user"

export async function getLastAdvicePrompt() {
    const user = await getUser()
    if(!user.lastAdvicePrompt) throw new Error('No tienes un prompt guardado')
    return user.lastAdvicePrompt
}