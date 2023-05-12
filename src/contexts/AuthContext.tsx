import { ReactNode, createContext, useState } from "react";
import { User } from "../utils/types/UserDTO";
import { api } from "../services/api";

export interface AuthContextProps {
    user: User,
    signIn: (userCredentials : Pick<User, 'email' | 'password'>)          => Promise<void>
    signUp: (userInformation : Pick<User, 'name' | 'email' | 'password'>) => Promise<void>
}
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
    children: ReactNode
}
export default function AuthContextProvider({ children } : AuthContextProviderProps) {
    const [user, setUser] = useState<User>({} as User)

    async function signIn(userCredentials : Pick<User, 'email' | 'password'>) {
        try {
           const {data:user} = await api.post('/sessions', userCredentials) 
           setUser(user)
        } catch (error) {
            throw error
        }
    }

    async function signUp(userInformation : Pick<User, 'name' | 'email' | 'password'>) {
        try {
            await api.post('/users', userInformation)
        } catch (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}