export type TUser = {
    id:string,
    name:string,
    email:string,
    password:string,
    avatar: string,
    signed: boolean
}

export type TUserCredentials = Pick<TUser, 'email' | 'password'>
export type TUserInformation = Pick<TUser, 'name' | 'email' | 'password'>

export const USER_STORAGE            = '@igym:user'
export const USER_AUTH_TOKEN_STORAGE = '@igym:token'