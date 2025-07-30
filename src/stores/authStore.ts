import * as LocalAuthentication from 'expo-local-authentication'; // For types only
import { create, createStore } from 'zustand';
import { authService } from '../services/authService';


interface AuthState {
    isAuthenticated: boolean;
    authInProgress: boolean;
    authError: string | null;
    biometricType: LocalAuthentication.AuthenticationType | null;
    checkBiometricSupport: () => Promise<void>;
    resetAuth: () => void;
    authenticate: () => Promise<void>;

}

export const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    authInProgress: false,
    authError: null,
    biometricType: null,
    checkBiometricSupport: async () => {
        set({ authInProgress: true, authError: null });
        try {
            const hasHardware = await authService.checkHardwareSupport();
            if (hasHardware) {
                const enrolledLevel = await authService.getEnrolledLevel();
                if (enrolledLevel !== LocalAuthentication.SecurityLevel.NONE) {
                    const supportTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
                    if (supportTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
                        set({ biometricType: LocalAuthentication.AuthenticationType.FINGERPRINT });
                    } else if (supportTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                        set({ biometricType: LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION });
                    }

                }
            }
            set({ authInProgress: false, authError: null });
        } catch (error: any) {
            console.error('Error checking biometric support:', error);
            set({ authInProgress: false, authError: error.messsage || "Failed to check biometric support" });

        }
    },
    authenticate: async () => {
        set({ authInProgress: true, authError: null });
        try {
            console.log('Starting authentication process...');
            const result = await authService.authenticateAsync({
                promptMessage: "Autheticate to access DoseMate",
                fallbackLabel: "Use PIN",
            });
            if (result.success) {
                set({ isAuthenticated: true, authInProgress: false, authError: null });
            } else {
                let errorMessage = 'Authentication failed';
                if (result.error === 'user_cancel') {
                    errorMessage = 'Authentication cancelled by user.';
                } else if (result.error === 'system_cancel') {
                    errorMessage = 'Authentication cancelled by system.';
                } else if (result.error === 'lockout') {
                    errorMessage = 'Too many attempts. Device locked.';
                }
                set({ isAuthenticated: false, authInProgress: false, authError: errorMessage });
            }

        } catch (error: any) {
            console.error('Authentication error:', error);
            set({ isAuthenticated: false, authInProgress: false, authError: error.message || "Un excepted authentication error occurred" });
        }
    },
    resetAuth: () => {
        set({ isAuthenticated: false, authInProgress: false, authError: null, biometricType: null });
    }
}));