import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';



import { useColorScheme } from '@/hooks/useColorScheme';
import {Text, View} from "react-native";
import {AppStateProvider} from "@/state/Store";
import {GestureHandlerRootView} from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <AppStateProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>

          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <View style={{ flex: 1 , backgroundColor: Colors[colorScheme ?? 'light'].softBackground}}>
              <View style={{ flex: 1 }}>
                {/*<Text style={{ fontFamily: 'SpaceMono', fontSize: 24, textAlign: 'center', marginTop: 20 }}>*/}
                {/*  Welcome to My App*/}
                {/*</Text>*/}

                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>

              </View>
          </View>
        </ThemeProvider>
        </GestureHandlerRootView>
      </AppStateProvider>
);
}
