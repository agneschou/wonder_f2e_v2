import {NextRequest, NextResponse} from 'next/server'
import {authRepository} from "@/domain/auth/repo";
import {AuthData} from "@/domain/auth/model/AuthData";

export function middleware(request: NextRequest) {
    const { nextUrl: { pathname } } = request;

    const authData = authRepository.getAuthServerSide(request);
    const nextPath = getNextPath(pathname, authData);
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en'

    return nextPath !== pathname ?
        NextResponse.redirect(new URL(`/${locale}${nextPath}`, request.nextUrl)) :
        NextResponse.next();
}

function getNextPath(pathname: string, authData: AuthData | null) {
    if(authData) {
        if(pathname === '/login') {
            return '/'
        }else if(authData.isFirstLogin) {
            return '/changePassword';
        }
    } else {
        return '/login'
    }
    return pathname;
}

export const config = {
    //Matcher ignoring `/_next/` and `/api/`
    matcher: [
        '/',
        '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|logo_bg.svg|manifest.json|mockServiceWorker).*)'
    ],
}
