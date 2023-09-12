import {LoginRequest} from "@/domain/login/api/model/LoginRequest";
import {LoginResponse} from "@/domain/login/api/model/LoginResponse";

export interface ILoginApi {
    login: (request: LoginRequest) => Promise<LoginResponse>;
}
