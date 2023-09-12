import axios from "axios";
import {logoutService} from "@/domain/logout/service";

export const apiClient = axios.create(
    {
        baseURL: `${getBaseUrl()}`,
        validateStatus: (status) => {
            return (status >= 200 && status <= 400)
        },
    }
)

apiClient.interceptors.response.use((response) => response, async (error) => {
    const { status } = error.response;

    if (status === 401) {
        await logoutService.logout();
    }

    return Promise.reject(error);
});

export function getBaseUrl() {
    if(process.env.NODE_ENV === 'development') return 'http://u2f9u0ze6peftv.funkytest.com/agent/api';
    switch (process.env.NEXT_PUBLIC_ENV) {
        case 'uat':
        default:
            return 'http://u2f9u0ze6peftv.funkytest.com/agent/api';
    }
}

export function setApiAuthToken(token: string) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
