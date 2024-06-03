import { NextRequest , NextResponse } from "next/server";
import types {NextRequest} from "next/server";
export {default} from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";



 export async function middleware(request : NextRequest){

    const token = await getToken({req : request})
    const url = request.nextUrl

    if(token && (url.pathname.startsWith('/sign-in'))){
        
    }
    return NextResponse.redirect(new URL('/home', request.url))
 };


 export const config = {
    matcher : [
        "/sign-in",
        "/sign-up",
        "/",
        "/dashboard/:path*",
        '/verify/:path*',
    ]
 }

