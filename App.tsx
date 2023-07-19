import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import fonts from './config/fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';


export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  return !fontsLoaded ? null : (
    <AuthProvider>
      <Provider store={store}>
        <SafeAreaProvider style={{ flex: 1 }} >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootNavigator />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </Provider>
    </AuthProvider>

  );
}
