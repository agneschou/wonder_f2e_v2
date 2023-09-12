import {CountryDetail} from "@/domain/countryCode/model/CountryDetail";
import {apiClient} from "@/utils/apiClient";
import {GetCountryCodeListResponse} from "@/domain/countryCode/api/model/GetCountryCodeListResponse";

export const GET_COUNTRY_CODE_LIST_ROUTE ='/Event/GetEventCountries';

export const countryCodeApi = {
    getCountryCodeList: async () : Promise<CountryDetail[]> => {
        const res = await apiClient.get<GetCountryCodeListResponse>(GET_COUNTRY_CODE_LIST_ROUTE)
        return res.data.countries;
    }
}
