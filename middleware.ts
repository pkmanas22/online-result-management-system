import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/admin", "/faculty", "/student", "/login"],
};

export default async function middleware(request: NextRequest) {
    const { nextUrl } = request;

    // Retrieve token from NextAuth
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    const isAuthRoute = nextUrl.pathname.startsWith("/login");
    const isRoleBasedRoute = ["/admin", "/faculty", "/student"].some((path) =>
        nextUrl.pathname.startsWith(path)
    );

    // Handle unauthenticated access
    if (!token) {
        if (isRoleBasedRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        // Allow access to login route for unauthenticated users
        if (isAuthRoute) {
            return NextResponse.next();
        }
    }

    // If user is logged in
    if (token) {
        const validRoles = ["student", "faculty", "admin"];
        const userRole = token.role as string;

        if (!validRoles.includes(userRole)) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        console.log("hello")

        // Redirect authenticated users away from login page to their dashboard
        if (isAuthRoute) {
            return NextResponse.redirect(new URL(`/${userRole}`, request.url));
        }

        // Ensure users access only their respective role-based paths
        if (isRoleBasedRoute) {
            const rolePath = `/${userRole}`;
            if (!nextUrl.pathname.startsWith(rolePath)) {
                return NextResponse.redirect(new URL(rolePath, request.url));
            }
        }
    }

    // Allow access to other routes
    return NextResponse.next();
}
