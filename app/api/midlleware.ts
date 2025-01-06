import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

declare module "next/server" {
  interface NextRequest {
    userId?: string;
  }
}

export async function middleware(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token) {
      const decodedData = jwt.verify(token, "sEcReT"); // Use 'any' or specify the exact type of the decoded data
      if (decodedData) {
        req.userId = (decodedData as jwt.JwtPayload)?.id; // Now TypeScript knows that 'userId' exists on 'req'
      }
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Authentication error:", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Proceed to the next middleware or route handler
  return NextResponse.next();
}

// Specify which paths should be matched by this middleware
export const config = {
  matcher: "/api/:path*", // Adjust the matcher according to your API routes
};
