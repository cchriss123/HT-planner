import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopMenu from '../../components/TopMenu';
import {SafeAreaView} from "react-native-safe-area-context"; // Adjust the import path as needed

export default function HomeScreen() {
    return (
        <SafeAreaView>


        <View style={styles.outerContainer}>
            <TopMenu />
            <Text>Home Screen</Text>
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
