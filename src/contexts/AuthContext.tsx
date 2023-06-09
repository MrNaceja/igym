import { ReactNode, createContext, useState, useEffect } from "react";
import { TUser, TUserCredentials, TUserInformation } from '../utils/types/UserDTO';
import { api } from "../services/api";
import { StorageUser, StorageAuthToken } from "../services/storage";

export interface AuthContextProps {
    user: TUser,
    userStorageLoading: boolean,
    signIn:            (userCredentials : TUserCredentials) => Promise<void>
    signUp:            (userInformation : TUserInformation) => Promise<void>
    updateUserProfile: (userUpdated: TUser)                 => Promise<void>
    signOut: () => Promise<void>,
}
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
    children: ReactNode
}
export default function AuthContextProvider({ children } : AuthContextProviderProps) {
    const [user, setUser] = useState<TUser>({} as TUser)
    const [userStorageLoading, setUserStorageLoading] = useState(true)

    function authUserToken(userLogged : TUser, token : string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(userLogged)
    }

    async function storageUserAuth(userLogged : TUser, token: string) {
        try {
            setUserStorageLoading(true)
            await StorageUser.save(userLogged)
            await StorageAuthToken.save(token)
            authUserToken(userLogged, token)
        } 
        catch (error) {
            throw error
        }
        finally {
            setUserStorageLoading(false)
        }
    }

    async function signIn(userCredentials : TUserCredentials) {
        try {
           const { data } = await api.post('/sessions', userCredentials) 
           if (data.user && data.token) {
                const signedUser : TUser = data.user
                signedUser.signed = true
                storageUserAuth(signedUser, data.token)
           }
        } catch (error) {
            throw error
        }
    }

    async function signUp(userInformation : TUserInformation) {
        try {
            await api.post('/users', userInformation)
        } catch (error) {
            throw error
        }
    }

    async function signOut() {
        try {
            setUserStorageLoading(true) 
            setUser({ signed: false } as TUser)
            StorageUser.remove()
            StorageAuthToken.remove()
        } 
        catch (error) {
            throw error
        }
        finally {
            setUserStorageLoading(false)
        }
    }

    async function loadStoragedUser() {
        try {
            setUserStorageLoading(true)
            const userStoraged = await StorageUser.get()
            const tokenStoraged = await StorageAuthToken.get()
            if (userStoraged && tokenStoraged) {
                authUserToken(userStoraged, tokenStoraged)
            } 
        } catch (error) {
            throw error
        }
        finally {
            setUserStorageLoading(false)
        }
    }

    async function updateUserProfile(userUpdated : TUser) {
        try {
            setUserStorageLoading(true)
            setUser(userUpdated)
            StorageUser.save(userUpdated)
        } catch (error) {
            throw error
        }
        finally {
            setUserStorageLoading(false)
        }
    }

    useEffect(() => {
        loadStoragedUser()
    }, [])
    useEffect(() => {
        const subscribe = api.interceptTokenManager(signOut)
        return () => subscribe()
    }, [signOut])
    return (
        <AuthContext.Provider value={{ user, userStorageLoading, updateUserProfile, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}