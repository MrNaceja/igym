import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import AuthRoutes from "./auth.routes";
import { useTheme } from "native-base";
import SignedRoutes from "./signed.routes";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function Routes() {
    const { user, userStorageLoading } = useAuth()
    const { colors } = useTheme()

    const navigationTheme = DefaultTheme
    navigationTheme.colors.background = colors.gray[900]

    return (
        userStorageLoading ? <Loading /> : 
        <NavigationContainer theme={navigationTheme}>
            { user.signed? <SignedRoutes /> : < AuthRoutes /> }
        </NavigationContainer>
    )

}