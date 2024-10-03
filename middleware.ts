import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher(['/']);

// Clerk middleware
export default clerkMiddleware((req) => {
  // Ensure auth object exists and is correctly destructured from the request
  const { auth } = req as any;

  if (auth && isProtectedRoute(req)) {
    try {
      // Protect the route if it's a protected route
      auth.protect();
    } catch (error) {
      // Handle any errors from protecting the route
      console.error('Error protecting the route:', error);
      return NextResponse.redirect('/login');
    }
  }

  return NextResponse.next();
});

// Configuration for Clerk middleware
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
