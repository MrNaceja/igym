import { ReactNode, createContext, useState } from "react";
import { User } from "../utils/types/UserDTO";

export interface AuthContextProps {
    user: User
}
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
    children: ReactNode
}
export default function AuthContextProvider({ children } : AuthContextProviderProps) {
    const [user, setUser] = useState<User>({
        id: '1',
        name: 'Eduardo',
        email: 'edutoriani13@gmail.com',
        password: 'pass123'
    })

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}