import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes - client-side protection will handle the actual check
  // This middleware just allows the request to proceed
  // The page components will check localStorage and redirect if needed
  const protectedRoutes = ['/dashboard']
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // For protected routes, we'll let the client component handle the auth check
  // since we can't access localStorage in middleware
  if (isProtectedRoute) {
    // Allow the request - client-side protection will handle redirect
    return NextResponse.next()
  }

  // Allow access to all other routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

