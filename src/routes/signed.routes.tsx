import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import { Ionicons } from '@expo/vector-icons'

import Home from "../Screens/Home";
import History from "../Screens/History";
import Profile from "../Screens/Profile";
import Exercise from "../Screens/Exercise";

export type TExerciseRouteParams = {
    exerciseId: string
}

export type TSignedRoutes = {
    HOME_ROUTE: undefined,
    HISTORY_ROUTE: undefined,
    PROFILE_ROUTE: undefined,
    EXERCISE_ROUTE: TExerciseRouteParams
}

export type TSignedNavigationRoutesProps = BottomTabNavigationProp<TSignedRoutes>

const { Navigator, Screen } = createBottomTabNavigator<TSignedRoutes>()
export default function SignedRoutes() {
    const { sizes, fontSizes, colors } = useTheme()
    
    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.indigo[500],
            tabBarInactiveTintColor: colors.gray[600],
            tabBarStyle: {
                paddingVertical: sizes[2],
                paddingBottom: sizes[2],
                height: sizes[16],
                backgroundColor: colors.gray[900],
                borderTopColor: colors.gray[600]
            }
        }}>
            <Screen 
                name="HOME_ROUTE"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="home-outline" color={color} size={sizes[6]}/>,
                    tabBarLabel: "Início",
                    tabBarLabelStyle: {
                        fontSize: fontSizes.md
                    }
                }}
            /> 
            <Screen 
                name="HISTORY_ROUTE"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="time-outline" color={color} size={sizes[6]}/>,
                    tabBarLabel: "Histórico",
                    tabBarLabelStyle: {
                        fontSize: fontSizes.md
                    }
                }}
            />
            <Screen 
                name="PROFILE_ROUTE"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="person-outline" color={color} size={sizes[6]}/>,
                    tabBarLabel: "Perfil",
                    tabBarLabelStyle: {
                        fontSize: fontSizes.md
                    }
                }}
            />
            <Screen 
                name="EXERCISE_ROUTE"
                component={Exercise}
                options={{
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    )
}