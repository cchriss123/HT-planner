import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';

export default function TabLayout() {

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const isAndroid = Platform.OS === 'android';
    return (
        <Tabs
            screenOptions={{
                tabBarHideOnKeyboard: isAndroid,
                tabBarActiveTintColor: colors.primaryBlue,
                tabBarStyle: {
                    backgroundColor: colors.solidBackground,
                    borderTopWidth: 1,
                    borderTopColor: colors.themedGrey,
                },
                headerShown: false,
            }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Editor',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'aperture' : 'aperture-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="calculator"
                options={{
                    title: 'Calculations',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'calculator' : 'calculator-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="counter"
                options={{
                    title: 'Counter',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'medkit' : 'medkit-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
