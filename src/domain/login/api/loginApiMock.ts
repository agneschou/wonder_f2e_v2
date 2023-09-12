import {rest} from "msw";
import {LoginResponse} from "@/domain/login/api/model/LoginResponse";
import {LOGIN_ROUTE} from "@/domain/login/api/loginApi";
import {getBaseUrl} from "@/utils/apiClient";

export function loginApiMock() {
    return rest.post(getBaseUrl()+LOGIN_ROUTE, (req, res, ctx) => {
        const response:  LoginResponse = {
            isFirstLogin: false,
            token: "1234",
            returnCode: 0
        }
        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json(response),
        )
    })
}
