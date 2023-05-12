import AsyncStorage from '@react-native-async-storage/async-storage';
import { TUser, USER_STORAGE } from '../utils/types/UserDTO';

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