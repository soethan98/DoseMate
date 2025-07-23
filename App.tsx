import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from './src/screens/AuthScreen';
import AppNavigations from './src/navigation/AppNavigations';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigations />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
