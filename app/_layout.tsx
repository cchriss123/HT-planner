import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider as PaperProvider } from 'react-native-paper';



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

    const trialEndDate = new Date('2025-06-01');
    const now = new Date();

    return now > trialEndDate ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <Text style={{ color: '#fff', fontSize: 24 }}>
                Trial Ended on {trialEndDate.toLocaleDateString()}
            </Text>
        </View>
    ) : (
        <AppStateProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <PaperProvider>
                    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <View style={{ flex: 1 }}>
                            <Stack>
                                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                <Stack.Screen name="+not-found" />
                            </Stack>
                        </View>
                    </ThemeProvider>
                </PaperProvider>
            </GestureHandlerRootView>
        </AppStateProvider>
    );

}
