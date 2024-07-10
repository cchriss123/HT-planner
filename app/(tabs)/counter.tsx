import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

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
                <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
                    <Text style={styles.buttonText}>{`Increment 1 (${countOne})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress(2)}>
                    <Text style={styles.buttonText}>{`Increment 2 (${countTwo})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress(3)}>
                    <Text style={styles.buttonText}>{`Increment 3 (${countThree})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setCountOne(0);
                    setCountTwo(0);
                    setCountThree(0);
                    setCountTotalGraphs(0);
                    setCountTotalHair(0);
                }}>
                    <Text style={styles.buttonText}>Reset All</Text>
                </TouchableOpacity>
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
        borderWidth: 1,
        borderColor: Colors.dark.icon,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.dark.icon,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.dark.icon,
    },
    button: {
        backgroundColor: Colors.dark.icon,
        borderRadius: 10,
        margin: 10,
        width: '95%',
        borderWidth: 1,
        borderColor: Colors.dark.text,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: Colors.white,
        fontSize: 30,
        fontWeight: 'bold',
        width: 300,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    countContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.dark.icon,
    },
    customTitle: {
        fontSize: 30,
        color: Colors.dark.text,
    },
    largeText: {
        fontSize: 24,
        color: Colors.dark.text,
    },
});
