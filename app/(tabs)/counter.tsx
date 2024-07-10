import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [countThree, setCountThree] = useState(0);
    const [countTotalGraphs, setCountTotalGraphs] = useState(0);
    const [countTotalHair, setCountTotalHair] = useState(0);

    function handlePress(value: number) {
        if (value === 1) setCountOne(countOne + 1);
        if (value === 2) setCountTwo(countTwo + 1);
        if (value === 3) setCountThree(countThree + 1);

        setCountTotalGraphs(countTotalGraphs + 1);
        setCountTotalHair(countTotalHair + value);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.titleContainer}>
                <ThemedText type="title" style={styles.customTitle}>Counter</ThemedText>
            </View>

            <View style={styles.buttonContainer}>
                <Button title={`Increment 1 (${countOne})`} onPress={() => handlePress(1)} />
                <Button title={`Increment 2 (${countTwo})`} onPress={() => handlePress(2)} />
                <Button title={`Increment 3 (${countThree})`} onPress={() => handlePress(3)} />
                <Button title={`Reset All`} onPress={() => {
                    setCountOne(0);
                    setCountTwo(0);
                    setCountThree(0);
                    setCountTotalGraphs(0);
                    setCountTotalHair(0);
                }} />
            </View>

            <View style={styles.countContainer}>
                <ThemedText style={styles.largeText}>{`Total Hair: ${countTotalHair}`}</ThemedText>
                <ThemedText>{`Count: ${countTotalGraphs}`}</ThemedText>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 10,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    customTitle: {
        fontSize: 30,
        color: 'green',
    },
    largeText: {
        fontSize: 24, // Change the font size as needed
    },
});
