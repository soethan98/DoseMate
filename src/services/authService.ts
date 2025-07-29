import * as LocalAuthentication from 'expo-local-authentication';



interface AuthenticationService {
    checkBiometricSupport: () => Promise<boolean>;
    getEnrolledLevel: () => Promise<LocalAuthentication.SecurityLevel>;
    authenticateAsync: (options?: LocalAuthentication.LocalAuthenticationOptions) => Promise<LocalAuthentication.LocalAuthenticationResult>;
    checkHardwareSupport: () => Promise<boolean>;

}

export const authService: AuthenticationService = {
    checkHardwareSupport: async (): Promise<boolean> => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            console.log('Local authentication hardware support:', hasHardware);
            return hasHardware;
        } catch (error) {
            console.error('Error checking hardware support:', error);
            throw new Error('Failed to check hardware support for local authentication.');

        }
        return true;
    },
    checkBiometricSupport: async (): Promise<boolean> => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        return hasHardware && isEnrolled;
    },
    getEnrolledLevel: async (): Promise<LocalAuthentication.SecurityLevel> => {
        try {
            const level = await LocalAuthentication.getEnrolledLevelAsync();
            console.log('Enrolled authentication level:', level);
            return level;
        } catch (error) {
            console.error('Error getting enrolled authentication level:', error);
            throw new Error('Failed to get enrolled authentication level');
        }
    },
    authenticateAsync: async (options?: LocalAuthentication.LocalAuthenticationOptions): Promise<LocalAuthentication.LocalAuthenticationResult> => {
        try {
            const result = await LocalAuthentication.authenticateAsync(options);
            console.log('Authentication result:', result);
            return result;
        } catch (error) {
            console.error('Error during authentication:', error);
            throw new Error('Local authentication failed.');
        }
    },



}