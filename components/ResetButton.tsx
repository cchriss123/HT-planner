import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from 'react';
import { Appearance, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useAppState, DonorZone, RecipientZone } from "@/state/Store";

export default function ResetButton() {
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const globalState = useAppState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function resetZones(donorZones: DonorZone[], recipientZones: RecipientZone[]) {
        Alert.alert(
            'Delete Zone',
            `Are you sure you want to delete all zones?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => console.log('Cancel Pressed')
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        globalState.setDonorZones([]);
                        globalState.setRecipientZones([]);
                        setMessage('Zones deleted');
                    }
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.buttonReset}
                onPress={() => resetZones(globalState.donorZones, globalState.recipientZones)}>
                <Ionicons name="refresh" size={22} color="white" />
                <Text style={styles.buttonResetText}>Reset Zones</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        buttonContainer: {
            flex: 1,
            marginTop: 30,
            // borderTopWidth: 1,
            // borderBottomColor: 'lightgray',
            width: '100%',
            alignItems: 'center'},
            buttonReset: {
            height: 40,


            backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            margin: 5,
            color: colors.primaryText,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowRadius: 5,
            elevation: 5,
            width: '40%',

        },
        buttonResetText: {
            color: 'white',
            fontSize: 16,
            marginLeft: 5,
        },
        message: {
            marginTop: 10,
            color: colors.primaryText,
        }
    });
}
