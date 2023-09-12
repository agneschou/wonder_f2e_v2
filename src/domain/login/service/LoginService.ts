import {checkIsProcessing} from "@/utils/checkIsProcessing";
import {LoginError, LoginErrorType} from "@/domain/login/model/LoginError";
import {NextRouter} from "next/router";
import {ILoginApi} from "@/domain/login/api/ILoginApi";
import {IAuthRepository} from "@/domain/auth/repo/IAuthRepository";


export class LoginService {
    private _loginApi: ILoginApi;
    private _authRepository: IAuthRepository;
    private _router: NextRouter;

    constructor(loginApi: ILoginApi, authRepository: IAuthRepository, router: NextRouter) {
        this._loginApi = loginApi;
        this._authRepository = authRepository;
        this._router = router;
    }

    @checkIsProcessing
    async login(agentId: string, password: string) {
        const response = await this._loginApi.login({agentId, password})
        this.checkReturnCode(response.returnCode);

        this._authRepository.setAuth({
            token: response.token,
            isFirstLogin: response.isFirstLogin
        })

        response.isFirstLogin ?
            this._router.push('/changePassword') :
            this._router.replace('/');
    }

    checkReturnCode(returnCode: number) {
        if (returnCode !== 0) {
            switch (returnCode) {
                case 401:
                    throw new LoginError(LoginErrorType.authFailed);
                case 2:
                    throw new LoginError(LoginErrorType.accountLocked);
                default:
                    throw new LoginError(LoginErrorType.unknownError);
            }
        }
    }
}
