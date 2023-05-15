import axios, { AxiosInstance } from "axios";
import { AppError } from "../utils/AppError";
import { StorageAuthToken } from "./storage";

type TApiInstance = AxiosInstance & {
    interceptTokenManager: (signOutMethod : any) => () => void
}

const api = axios.create({
    baseURL: 'http://192.168.1.3:3333'
}) as TApiInstance

api.interceptTokenManager = signOut => () => {
    const interceptor = api.interceptors.response.use(res => res, async reqError => {
        if (reqError?.response?.status == 401) {
            const unauthorizedMessage = reqError.response.data?.message
            if (unauthorizedMessage == 'token.expired' || unauthorizedMessage == 'token.invalid') {
                const storagedToken = await StorageAuthToken.get()
                if (!storagedToken) {
                    signOut()
                    return Promise.reject(reqError)
                }
            }
            signOut()
        }


        if (reqError.response && reqError.response.data) {
            return Promise.reject(new AppError(reqError.response.data.message))
        }
        return Promise.reject(reqError)
    })
    return () => api.interceptors.response.eject(interceptor)
}

export { api }