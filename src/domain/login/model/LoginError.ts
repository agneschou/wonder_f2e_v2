export enum LoginErrorType {
    unknownError = 'login.error.unknownError',
    authFailed = 'login.error.authFailed',
    accountLocked = 'login.error.accountLocked',
}

export class LoginError extends Error {
    public type: LoginErrorType;
    constructor(type: LoginErrorType) {
        super(type.toString());
        this.type = type;
    }
}
