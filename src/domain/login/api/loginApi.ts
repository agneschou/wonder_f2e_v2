import {LoginRequest} from "@/domain/login/api/model/LoginRequest";
import {LoginResponse} from "@/domain/login/api/model/LoginResponse";
import {apiClient} from "@/utils/apiClient";
import {ILoginApi} from "@/domain/login/api/ILoginApi";

export const LOGIN_ROUTE = '/login';

export const loginApi: ILoginApi = {
    login: async (request: LoginRequest) : Promise<LoginResponse> => {
        const { data } = await apiClient.post<LoginResponse>(LOGIN_ROUTE, request);
        return data;
    }
}
