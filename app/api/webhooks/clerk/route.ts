import prisma from "@/src/lib/prisma"
import { WebhookEvent } from "@clerk/nextjs/server"
import { Webhook } from 'svix'
import { headers } from 'next/headers'

export async function POST(req : Request){

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }
    
    const payload : WebhookEvent = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
          status: 400,
        })
    }


    if (evt.type === 'user.created') {
        const {id, email_addresses} = evt.data

        await prisma.user.create({
            data: { 
                clerkId : id, 
                email: email_addresses[0].email_address
            }
        })
    }

    if (evt.type === 'user.deleted'){
        const clerkId = payload.data.id
        
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
    }

    return new Response('', { status: 200 })
}