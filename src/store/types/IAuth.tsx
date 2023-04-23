// login
export interface ILoginRequest {
    [x: string]: string;
    email: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string | undefined;
}

// signup
export interface IRegisterRequest {
    [x: string]: string;
    username: string;
    email: string;
    password: string;
}
// Fogot

export interface IForgotRequest {
    email: string;
}
export interface IForgotResponse {
    link: string;
}
//reset
export interface IResetRequest {
    password: string;
    token: string;
}