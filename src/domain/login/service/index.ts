import {LoginService} from "@/domain/login/service/LoginService";
import Router from "next/router";
import {loginApi} from "@/domain/login/api/loginApi";
import {authRepository} from "@/domain/auth/repo";

export const loginService = new LoginService(loginApi, authRepository, Router);
