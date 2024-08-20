import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import {useAppState} from "@/state/Store";
import FormStyles from "@/components/buttons/styles/RedButtonStyles"
import BottomSheet from "@gorhom/bottom-sheet";


interface DeleteZonesButtonProps {
    bottomSheetRef: React.RefObject<BottomSheet>;
}

export default function DeleteZonesButton({bottomSheetRef}: DeleteZonesButtonProps) {
    const {styles} = FormStyles();
    const globalState = useAppState();
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function deleteZones() {
        Alert.alert(
            'Delete Zones',
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
                        bottomSheetRef.current?.close();
                    }
                }
            ],
            {cancelable: true}
        );
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.buttonReset}
                onPress={() => deleteZones()}>
                <Ionicons name="refresh" size={22} color="white"/>
                <Text style={styles.buttonResetText}>Delete Zones</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}


