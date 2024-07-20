import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
