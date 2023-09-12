import {NextRequest} from "next/server";
import {AuthData} from "@/domain/auth/model/AuthData";

export interface IAuthRepository {
    getAuthServerSide(request: NextRequest): AuthData | null;

    getAuth(request: NextRequest): AuthData | null;

    setAuth(authData: AuthData): void;
}
