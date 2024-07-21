import React from 'react';
import {Appearance, StyleSheet, Text, View} from 'react-native';

Appearance.getColorScheme = () => 'light';


export default function ZonesScreen() {
    return (
        <View style={styles.outerContainer}>
            <Text>Zones Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
