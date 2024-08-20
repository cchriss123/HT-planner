import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { useAppState } from "@/state/Store";
import FormStyles from "@/components/buttons/styles/RedButtonStyles"


export default function ResetZoneCountButton() {
    const { styles} = FormStyles();

    const globalState = useAppState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function resetZones() {
        Alert.alert(
            'Reset Zones',
            `Are you sure you want to reset all zone counts?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => console.log('Cancel Pressed')
                },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => {
                        globalState.donorZones.forEach(zone => {
                            zone.singles = 0
                            zone.doubles = 0
                            zone.triples = 0
                            zone.quadruples = 0
                            zone.grafts = 0
                            zone.hairs = 0
                            zone.hairPerGraft = 0
                            globalState.donorZones.forEach(zone => globalState.calculateDonorZoneValues(zone));
                        });

                        globalState.updateTotalCounts();

                        globalState.setDonorZones([...globalState.donorZones]);
                        setMessage('Zone counts reset');
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
                onPress={() => resetZones()}>
                <Ionicons name="refresh" size={22} color="white" />
                <Text style={styles.buttonResetText}>Reset Counts</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

