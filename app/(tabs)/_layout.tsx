import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';

export default function TabLayout() {

    const colorScheme = useColorScheme();
    const isAndroid = Platform.OS === 'android';
    return (
        <Tabs
            screenOptions={{
                tabBarHideOnKeyboard: isAndroid,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primaryBlue,
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme ?? 'light'].solidBackground,
                    borderTopWidth: 1,
                    borderTopColor: 'lightgrey',
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
