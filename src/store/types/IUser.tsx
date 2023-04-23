
export interface IUser {
    [x: string]: string;
    username: string;
    email: string;
    password: string;
}

export interface IUserChange {
    username: string;
    image:FormData;
    email: string;
    password: string;
    changePassword: string;
}