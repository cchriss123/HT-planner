import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform, View, StyleSheet } from 'react-native';
import { isPhone } from '@/constants/DeviceType';

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
                    height: 80,
                },
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Editor',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.iconContainer}>

                            <TabBarIcon
                                name={focused ? 'aperture' : 'aperture-outline'}
                                color={color}
                                size={isPhone ? 28 : 45}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="calculator"
                options={{
                    title: 'Calculations',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.iconContainer}>
                            <TabBarIcon
                                name={focused ? 'calculator' : 'calculator-outline'}
                                color={color}
                                size={isPhone ? 28 : 40}
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="counter"
                options={{
                    title: 'Counter',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.iconContainer}>
                            <TabBarIcon
                                name={focused ? 'medkit' : 'medkit-outline'}
                                color={color}
                                size={isPhone ? 28 : 40}
                            />

                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: isPhone ? 'auto' : 60,
        marginHorizontal: isPhone ? 0 : 20,
    },
});
