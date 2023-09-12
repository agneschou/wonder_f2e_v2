import {rest} from "msw";
import {CHANGE_PASSWORD_ROUTE} from "@/domain/changePassword/api/changePasswordApi";
import {getBaseUrl} from "@/utils/apiClient";

export function changePasswordApiMock() {
    return rest.post(getBaseUrl()+CHANGE_PASSWORD_ROUTE, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({}),
        )
    })
}
