export interface ISetFavoriteFood {
    foodId: number | undefined;
}

export interface IGetFavoriteFood {
    email: string;
    id: string;
    username: string;
    __userConnection__: string;
}
