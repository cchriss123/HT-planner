import React from 'react';
import { Appearance, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '@/constants/Colors';

Appearance.getColorScheme = () => 'light';

export default function ZonesScreen() {
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return (

        <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
            <View style={styles.outerContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter donor zone name here"
                        placeholderTextColor={colors.neutralGrey}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        outerContainer: {
            flex: 1,
            padding: 16,
            backgroundColor: colors.softBackground,
        },
        inputContainer: {
            marginBottom: 20,
        },
        input: {
            height: 40,
            borderColor: colors.neutralGrey,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            backgroundColor: colors.solidBackground,
            color: colors.primaryText,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },
        // placeholderTextColor: {
        //     color: 'black'
        // }

    });
}