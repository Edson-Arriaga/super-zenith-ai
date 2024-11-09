import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const isPortectedRoute = createRouteMatcher([
  '/habit-tracker(.*)',
  '/create-habit(.*)',
  '/plans(.*)',
  '/successful-payment(.*)',
  '/completed-habits-history(.*)',
  '/achievements(.*)'
])

export default clerkMiddleware((auth, req) => {
  if(isPortectedRoute(req)){
    const user = auth()
    if (!user) {
      return redirect('/sign-in')
    }
    user.protect()
  } 
    
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc|)(.*)',
  ],
}