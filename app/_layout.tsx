import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './global.css';
export default function RootLayout() { 
  const [fontsLoaded , error] = useFonts({
    "QuickSand-Bold" : require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium" : require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular" : require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold" : require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light" : require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

// i change this safe are by myself using ai 
  return (<SafeAreaProvider>  
          <Stack screenOptions={{headerShown: false}}/>
        </SafeAreaProvider>);
}
