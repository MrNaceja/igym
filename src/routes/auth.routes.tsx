import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import SignIn from "../Screens/SignIn"
import SignUp from "../Screens/SignUp"

type TAuthRoutes = {
    SIGN_IN_ROUTE: undefined,
    SIGN_UP_ROUTE: undefined
} 
export type TAuthRoutesNavigationProps = NativeStackNavigationProp<TAuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<TAuthRoutes>()

export default function AuthRoutes() {
    return (
        <Navigator initialRouteName="SIGN_IN_ROUTE" screenOptions={{
            animation: "slide_from_left",
            headerShown: false
        }}>
            <Screen 
                name="SIGN_IN_ROUTE"
                component={SignIn}
            />
            <Screen 
                name="SIGN_UP_ROUTE"
                component={SignUp}
            />
        </Navigator>
    )
}