import {test } from 'vitest'
import {ILoginApi} from "@/domain/login/api/ILoginApi";
import {LoginService} from "@/domain/login/service/LoginService";
import {IAuthRepository} from "@/domain/auth/repo/IAuthRepository";
import {It, Mock, Times} from "moq.ts";
import {NextRouter} from "next/router";
import {routes} from "@/utils/routes";
import {AuthData} from "@/domain/auth/model/AuthData";

test('should set auth and push to /changePassword when first login', async () => {
    const mockApi = new Mock<ILoginApi>()
        .setup(x => x.login(It.IsAny()))
        .returnsAsync({
            isFirstLogin: true,
            token: 'token',
            returnCode: 0,
        })
        .object();

    const mockRepo = new Mock<IAuthRepository>()
        .setup(x => x.setAuth(It.IsAny()))
        .returns();

    const mockRouter =
        new Mock<NextRouter>()
            .setup(x => x.push(It.IsAny()))
            .returnsAsync(true);
    const loginService = new LoginService(mockApi, mockRepo.object(), mockRouter.object());
    await loginService.login('agentId', 'password');

    mockRepo.verify(x => x.setAuth(It.Is<AuthData>((x)=>x.isFirstLogin && x.token === 'token')), Times.Once());
    mockRouter.verify(x => x.push(routes.changePassword), Times.Once());
})

test('should set auth and push to / when not first login', async () => {
    const mockApi = new Mock<ILoginApi>()
        .setup(x => x.login(It.IsAny()))
        .returnsAsync({
            isFirstLogin: false,
            token: 'token',
            returnCode: 0,
        })
        .object();

    const mockRepo = new Mock<IAuthRepository>()
        .setup(x => x.setAuth(It.IsAny()))
        .returns();

    const mockRouter =
        new Mock<NextRouter>()
            .setup(x => x.replace(It.IsAny()))
            .returnsAsync(true);
    const loginService = new LoginService(mockApi, mockRepo.object(), mockRouter.object());
    await loginService.login('agentId', 'password');

    mockRepo.verify(x => x.setAuth(It.Is<AuthData>((x)=>!x.isFirstLogin && x.token === 'token')), Times.Once());
    mockRouter.verify(x => x.replace(routes.home), Times.Once());
})
