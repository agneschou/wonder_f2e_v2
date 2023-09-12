import {rest} from "msw";
import {GET_COUNTRY_CODE_LIST_ROUTE} from "@/domain/countryCode/api/countryCodeApi";
import {GetCountryCodeListResponse} from "@/domain/countryCode/api/model/GetCountryCodeListResponse";
import {getBaseUrl} from "@/utils/apiClient";

export function countryCodeApiMock() {
    return rest.get(`${getBaseUrl()}${GET_COUNTRY_CODE_LIST_ROUTE}`, (req, res, ctx) => {
        const response: GetCountryCodeListResponse = {
            countries:  [
                {
                    languageCode: 'zh-CN',
                    language: 'zh-CN',
                    isoCode: 'CN',
                    countryName: 'China',
                },
            ],
        }
        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json(response),
        )
    })
}
