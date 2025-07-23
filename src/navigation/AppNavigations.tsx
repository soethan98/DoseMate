import { NavigationContainer, NavigationProp } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import AuthScreen from "../screens/AuthScreen";

export type AppNavigationParamList = {
    Splash: undefined,
    Auth: undefined
}

// export type StackNavigation = NavigationProp<AppNavigationParamList>;
const Stack = createNativeStackNavigator<AppNavigationParamList>();

export default function AppNavigations() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen} // Replace with your Splash component
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen} // Replace with your Auth component
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}