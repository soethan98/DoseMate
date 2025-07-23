import { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppNavigationParamList } from "../navigation/AppNavigations";


type SplashScreenProps = NativeStackScreenProps<AppNavigationParamList, 'Splash'>;

export default function SplashScreen({route, navigation}: SplashScreenProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;


    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            })
        ]).start();

        const timer = setTimeout(() => {
            // Navigate to the next screen or perform any action after the splash screen
            // For example, you can use navigation.navigate('NextScreen');
            navigation.replace('Auth'); // Replace with your Auth screen
        }, 2000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <View style={styles.container}>
            <Animated.View style={[
                styles.iconContainer,
                {
                    opacity: fadeAnim,
                    transform: [
                        {
                            scale: scaleAnim
                        }
                    ]
                }
            ]}>
                <Ionicons name="medical" size={100} color="white" />
                <Text style={styles.appName}>DoseMate</Text>

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4CAF50",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {

        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,

    },
    appName: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 20,
        letterSpacing: 1,
    }
});