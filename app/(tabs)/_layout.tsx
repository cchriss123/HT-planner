import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Follicle Calculator',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'calculator' : 'calculator-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Follicle Counter',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'medkit' : 'medkit-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
