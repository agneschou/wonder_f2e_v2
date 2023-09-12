import {cookieClient} from "@/utils/cookieClient";
import Router from "next/router";
import {routes} from "@/utils/routes";

export class LogoutService {
    async logout() {
        cookieClient.delete('authToken');
        await Router.push(routes.login);
    }
}
