import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import { useAuthStore } from "../stores/authStore";
import { AuthenticationType } from "expo-local-authentication";


export default function AuthScreen() {

    const {
        isAuthenticated,
        authInProgress,
        authError,
        biometricType,
        checkBiometricSupport,
        authenticate,
        resetAuth,
    } = useAuthStore();


    useEffect(() =>{
        checkBiometricSupport();
    },[])
    return (
        <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="medical" size={80} color="white" />
                </View>
                <Text style={styles.title}>
                    DoseMate
                </Text>
                <Text style={styles.subtitle}>
                    Your Personal Medication Assistant
                </Text>
                <View style={styles.card}>
                    <Text style={styles.welcomeText}>
                        Welcome to Back!
                    </Text>
                    <Text style={styles.instructionText}>

                        {biometricType ? "Use Face ID/Touch ID or PIN to access your medications" : "Enter your PIN to access your medications"}

                    </Text>
                     <TouchableOpacity style={[styles.button, authInProgress && styles.buttonDisabled]} disabled={authInProgress} onPress={authenticate}>
                        <Ionicons name={
                            biometricType === AuthenticationType.FINGERPRINT ? "finger-print-outline" :
                                biometricType === AuthenticationType.FACIAL_RECOGNITION ? "finger-print-outline" : "keypad-outline"
                        } size={24} color="white" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>
                            {
                                authInProgress ? "Authenticating..." :
                                    biometricType ? "Authenticate" : "Enter PIN"
                            }
                        </Text>
                    </TouchableOpacity>
                    {
                        authError && (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={20} color="#f44336" />
                                <Text style={styles.errorText}>{authError}</Text>
                            </View>
                        )
                    } 
                </View>

            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle: {
        fontSize: 18,
        color: "rgba(255, 255, 255, 0.9)",
        marginBottom: 40,
        textAlign: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: "#ffebee",
        borderRadius: 8,
    },
    errorText: {
        color: "#f44336",
        marginLeft: 8,
        fontSize: 14
    }

});