import {AuthData} from "@/domain/auth/model/AuthData";
import {setApiAuthToken} from "@/utils/apiClient";
import {cookieClient} from "@/utils/cookieClient";
import {NextRequest} from "next/server";
import {IAuthRepository} from "@/domain/auth/repo/IAuthRepository";

const AUTH_TOKEN_KEY = 'authToken';
const IS_LOGIN_KEY = 'isFirstLogin';

export class AuthRepository implements IAuthRepository {
    getAuthServerSide(request: NextRequest): AuthData | null {
        const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;
        if (!authToken) return null;

        const isFirstLogin = request.cookies.get(IS_LOGIN_KEY)?.value === 'true';

        return {
            isFirstLogin,
            token: authToken.toString()
        }
    }

    getAuth(): AuthData | null {
        const authToken = cookieClient.get(AUTH_TOKEN_KEY);
        if (!authToken) return null;

        const isFirstLogin = cookieClient.get(IS_LOGIN_KEY) === 'true';

        return {
            isFirstLogin,
            token: authToken.toString()
        }
    }

    setAuth(authData: AuthData) {
        setApiAuthToken(authData.token);

        cookieClient.set(AUTH_TOKEN_KEY, authData.token);
        cookieClient.set(IS_LOGIN_KEY, authData.isFirstLogin.toString());
    }
}
