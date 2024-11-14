import prisma from "@/src/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req : NextRequest){
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_USER_DELETED

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }
    
    try {
        const payload = await req.json()

        if (!payload.data || !payload.data.id) {
            return NextResponse.json({ error: "Invalid payload data" }, { status: 400 });
        }

        const clerkId = payload.data.id;

        
        await prisma.habit.deleteMany({
            where: { 
                user: {
                    clerkId
                }
            }
        })

        await prisma.user.delete({
            where: { clerkId }
        })

        return NextResponse.json({ message: "User deleted successfully" })
    } catch (error) {
        console.error("Error processing webhook:", error);
    }
}