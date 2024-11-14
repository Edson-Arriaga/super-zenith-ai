import prisma from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req : Request){
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_USER_CREATED  

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }
    
    try {
        const payload = await req.json()

        if (!payload.data || !payload.data.id) {
            return NextResponse.json({ error: "Invalid payload data" }, { status: 400 })
        }

        const clerkId = payload.data.id
        const email = payload.data.clerkUser.email_addresses?.[0]?.email_address

        await prisma.user.create({
            data: { 
                clerkId, email
            }
        })

        return NextResponse.json({ message: "User created successfully" })
    } catch (error) {
        console.error("Error processing webhook:", error)
    }
}