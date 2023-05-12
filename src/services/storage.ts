import AsyncStorage from '@react-native-async-storage/async-storage';
import { TUser, USER_AUTH_TOKEN_STORAGE, USER_STORAGE } from '../utils/types/UserDTO';

export const StorageUser = {
    save: async (user : TUser) => {
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
    },
    get: async () => {
        const userStoraged = await AsyncStorage.getItem(USER_STORAGE)
        return (userStoraged ? JSON.parse(userStoraged) : { signed: false } ) as TUser
    },
    remove: async () => {
        await AsyncStorage.removeItem(USER_STORAGE)
    }
}

export const StorageAuthToken = {
    save: async (token: string) => {
        await AsyncStorage.setItem(USER_AUTH_TOKEN_STORAGE, token)
    },
    get: async () => {
        return await AsyncStorage.getItem(USER_AUTH_TOKEN_STORAGE)
    },
    remove: async () => {
        return await AsyncStorage.removeItem(USER_AUTH_TOKEN_STORAGE)
    }
}