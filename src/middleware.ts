import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/jwtTokenControl";

export const middleware = async (req: NextRequest) => {

    const result = await isAuthenticated(req)

    if (!result) {
        return NextResponse.json({ success: false, message: 'Invalid token.' }, { status: 401 })
    }

    const response = NextResponse.next()
    response.cookies.set('user_id', result.payload?._id as string)

    return response
}

export const config = {
    matcher: [
        '/api/profile', 
        '/api/message/:path*',
        '/api/contacts/:path*',
        '/api/messages/:path*',
        '/api/conversations/:path*'
    ]
}