import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import AuthRoutes from "./auth.routes";
import { useTheme } from "native-base";
import SignedRoutes from "./signed.routes";
import AuthContextProvider from "../contexts/AuthContext";

export default function Routes() {

    const { colors } = useTheme()

    const navigationTheme = DefaultTheme
    navigationTheme.colors.background = colors.gray[900]

    return (
        <NavigationContainer theme={navigationTheme}>
            <AuthContextProvider>
                <AuthRoutes />
            </AuthContextProvider>
        </NavigationContainer>
    )
}