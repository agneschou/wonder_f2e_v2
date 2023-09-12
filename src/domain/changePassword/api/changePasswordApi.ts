import {ChangePasswordRequest} from "@/domain/changePassword/api/model/ChangePasswordRequest";
import {apiClient} from "@/utils/apiClient";

export const CHANGE_PASSWORD_ROUTE = "/Account/UpdatePassword"

export const changePasswordApi = {
    async changePassword(request: ChangePasswordRequest){
        await apiClient.post(CHANGE_PASSWORD_ROUTE, request);
    }
}
