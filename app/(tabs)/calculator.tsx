import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import PdfExporter from "@/components/PdfExporter";

export default function CalculatorScreen() {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10}}>


            <View style={styles.outerContainer}>
                <PdfExporter />
                <Text>Calculator Screen</Text>
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
