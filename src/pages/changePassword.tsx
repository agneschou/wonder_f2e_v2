import {ChangePasswordForm} from "@/components/changePassword/ChangePasswordForm";
import {cookieClient} from "@/utils/cookieClient";

const isFirstLogin = cookieClient.get('isFirstLogin') === 'true';

export default function ChangePassword() {
    return (
        <ChangePasswordForm isFirstLogin={isFirstLogin}  />
    )
}
