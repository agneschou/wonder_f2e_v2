import {getCookie, setCookie} from "cookies-next";

export interface ICookieClient {
    set(key: string, value: string): void;

    get(key: string): string | null;

    delete(key: string): void;
}

export const cookieClient: ICookieClient = {
    set(key: string, value: string) {
        setCookie(key, value);
    },
    get(key: string) : string | null {
        const value = getCookie(key, );
        return value ? value.toString() : null;
    },
    delete(key: string) {
        setCookie(key, '', {maxAge: -1});
    }
}



