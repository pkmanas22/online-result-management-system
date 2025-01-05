import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req : NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token) {
      const decodedData = jwt.verify(token, "sEcReT");
      // @ts-ignore
        req.userId = decodedData?.id;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
  
  // Proceed to the next middleware or route handler
  return NextResponse.next();
}

// Specify which paths should be matched by this middleware
export const config = {
  matcher: "/api/:path*", // Adjust the matcher according to your API routes
};
