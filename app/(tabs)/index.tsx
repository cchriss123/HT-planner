import React from 'react';
import {Appearance, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

Appearance.getColorScheme = () => 'light';


export default function ZonesScreen() {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10}}>
            <View style={styles.outerContainer}>
                <Text>Zones Screen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
