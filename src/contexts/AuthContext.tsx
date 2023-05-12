import { ReactNode, createContext, useState, useEffect } from "react";
import { TUser, TUserCredentials, TUserInformation } from '../utils/types/UserDTO';
import { api } from "../services/api";
import { StorageUser } from "../services/storage";

export interface AuthContextProps {
    user: TUser,
    userStorageLoading: boolean,
    signIn: (userCredentials : TUserCredentials) => Promise<void>
    signUp: (userInformation : TUserInformation) => Promise<void>
    signOut: () => Promise<void>
}
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
    children: ReactNode
}
export default function AuthContextProvider({ children } : AuthContextProviderProps) {
    const [user, setUser] = useState<TUser>({} as TUser)
    const [userStorageLoading, setUserStorageLoading] = useState(true)

    async function signIn(userCredentials : TUserCredentials) {
        try {
           const { data } = await api.post('/sessions', userCredentials) 
           if (data.user) {
                const signedUser : TUser = data.user
                signedUser.signed = true
                setUser(signedUser)
                StorageUser.save(signedUser)
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
            const userStoraged = await StorageUser.get()
            if (userStoraged) {
                setUser(userStoraged)
            } 
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
    return (
        <AuthContext.Provider value={{ user, userStorageLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}