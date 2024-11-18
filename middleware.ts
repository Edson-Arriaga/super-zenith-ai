import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPortectedRoute = createRouteMatcher([
  '/habit-tracker(.*)',
  '/create-habit(.*)',
  '/plans(.*)',
  '/successful-payment(.*)',
  '/completed-habits-history(.*)',
  '/achievements(.*)'
])

export default clerkMiddleware((auth, req) => {
  if(isPortectedRoute(req)) auth().protect()
})

export const config = { 
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc|)(.*)',
  ],
}