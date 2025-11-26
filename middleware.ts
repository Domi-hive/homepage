import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('authToken')?.value;
    const userRole = request.cookies.get('userRole')?.value;
    const { pathname } = request.nextUrl;

    // Paths that require authentication
    const isClientPath = pathname.startsWith('/client');
    const isAgentPath = pathname.startsWith('/agent');

    if (isClientPath || isAgentPath) {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        if (isClientPath && userRole !== 'user') {
            return NextResponse.redirect(new URL('/agent/dashboard', request.url));
        }

        if (isAgentPath && userRole !== 'agent') {
            return NextResponse.redirect(new URL('/client/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/client/:path*', '/agent/:path*'],
};
