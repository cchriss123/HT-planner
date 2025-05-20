import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useAppState } from "@/state/Store";
import FormStyles from "@/components/forms/styles/FormStyles";
import { valuesToCheck } from "@/components/forms/utility/valuesToCheck";
import BottomSheet from "@gorhom/bottom-sheet";
import {DonorZone, RecipientZone, Zone} from "@/types/zones";

interface EditZoneProps {
    zones: Zone[];
    zone: Zone;
    bottomSheetRef: React.RefObject<BottomSheet>;
}

interface EditZoneArgs {
    name: string;
    caliber: string;
    fuPerCm2: string;
    hairsPerCm2: string;
    area: string;
    desiredCoverageValue?: string;
    minimumCoverageValue?: string;
    bottomSheetRef: React.RefObject<BottomSheet>;
}

function EditZone({ zones, zone, bottomSheetRef }: EditZoneProps) {
    const { setDonorZones, setRecipientZones, donorZones, recipientZones, updateTotalCounts, performCalculationsAndRerender } = useAppState();
    const { styles, theme } = FormStyles();

    const [name, setName] = React.useState(zone?.name ?? '');
    const [caliber, setCaliber] = React.useState(zone?.caliber.toString() ?? '');
    const [fuPerCm2, setFuPerCm2] = React.useState(zone?.graftsPerCm2.toString() ?? '');
    const [hairsPerCm2, setHairsPerCm2] = React.useState(zone?.hairPerCm2.toString() ?? '');
    const [area, setArea] = React.useState(zone?.area.toString() ?? '');
    const [desiredCoverageValue, setDesiredCoverageValue] = React.useState(zone?.type === 'recipient' ? (zone as RecipientZone).desiredCoverageValue.toString() : '');
    const [minimumCoverageValue, setMinimumCoverageValue] = React.useState(zone?.type === 'donor' ? (zone as DonorZone).minimumCoverageValue.toString() : '');
    const [message, setMessage] = React.useState('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        if (zone) {
            setName(zone.name ?? '');
            setCaliber(zone.caliber?.toString() ?? '');
            setFuPerCm2(zone.graftsPerCm2?.toString() ?? '');
            setHairsPerCm2(zone.hairPerCm2?.toString() ?? '');
            setArea(zone.area?.toString() ?? '');

            if (zone.type === 'recipient') {
                setDesiredCoverageValue((zone as RecipientZone).desiredCoverageValue?.toString() ?? '');
            }

            if (zone.type === 'donor') {
                setMinimumCoverageValue((zone as DonorZone).minimumCoverageValue?.toString() ?? '');
            }
        }
    }, [zone]);



    if (!zone) return <View style={{ display: 'none' }} />;

    function editZoneSubmit(args: EditZoneArgs) {
        const checkedValues = valuesToCheck({
            name: args.name,
            caliber: args.caliber,
            fuPerCm2: args.fuPerCm2,
            hairsPerCm2: args.hairsPerCm2,
            area: args.area,
            desiredCoverageValue: args.desiredCoverageValue,
            minimumCoverageValue: args.minimumCoverageValue,
        }, zone.type);

        if (zones.some(z => z.name === args.name && z.name !== zone.name)) {
            setMessage('Zone with that name already exists.');
            return;
        }

        zone.name = args.name || zone.name;
        zone.caliber = checkedValues.caliber || zone.caliber;
        zone.graftsPerCm2 = checkedValues.fuPerCm2 || zone.graftsPerCm2;
        zone.hairPerCm2 = checkedValues.hairsPerCm2 || zone.hairPerCm2;
        zone.area = checkedValues.area || zone.area;

        if (zone.type === 'donor') {
            const donorZone = zone as DonorZone;
            donorZone.minimumCoverageValue = checkedValues.minimumCoverageValue || donorZone.minimumCoverageValue;
        } else if (zone.type === 'recipient') {
            const recipientZone = zone as RecipientZone;
            recipientZone.desiredCoverageValue = checkedValues.desiredCoverageValue || recipientZone.desiredCoverageValue;
        }

        performCalculationsAndRerender();
        updateTotalCounts();
        setMessage('Zone updated.');
        bottomSheetRef.current?.close();
    }

    function deleteZone(zone: Zone) {
        Alert.alert(
            'Delete Zone',
            `Are you sure you want to delete ${zone.name}?`,
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
                        if (zone.type === 'donor')
                            setDonorZones(donorZones.filter(z => z !== zone));
                        else if (zone.type === 'recipient')
                            setRecipientZones(recipientZones.filter(z => z !== zone));

                        console.log(`Zone ${zone.name} deleted.`);
                        setMessage('Zone deleted.');
                        bottomSheetRef.current?.close();
                    }
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Zone Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                placeholder={zone.name}
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Caliber"
                mode="outlined"
                value={caliber}
                onChangeText={setCaliber}
                placeholder={zone.caliber.toString()}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Follicular Units per cm2"
                mode="outlined"
                value={fuPerCm2}
                onChangeText={setFuPerCm2}
                placeholder={zone.graftsPerCm2.toString()}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Hairs per cm2"
                mode="outlined"
                value={hairsPerCm2}
                onChangeText={setHairsPerCm2}
                placeholder={zone.hairPerCm2.toString()}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Area in cm2"
                mode="outlined"
                value={area}
                onChangeText={setArea}
                placeholder={zone.area.toString()}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />
            {zone.type === 'recipient' && (
                <TextInput
                    label="Desired Coverage Value"
                    mode="outlined"
                    value={desiredCoverageValue}
                    onChangeText={setDesiredCoverageValue}
                    placeholder={(zone as RecipientZone).desiredCoverageValue?.toString()}
                    keyboardType="numeric"
                    style={styles.input}
                    theme={theme}
                />
            )}
            {zone.type === 'donor' && (
                <TextInput
                    label="Minimum Coverage Value"
                    mode="outlined"
                    value={minimumCoverageValue}
                    onChangeText={setMinimumCoverageValue}
                    placeholder={(zone as DonorZone).minimumCoverageValue?.toString()}
                    keyboardType="numeric"
                    style={styles.input}
                    theme={theme}
                />
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => editZoneSubmit({
                        name,
                        caliber,
                        fuPerCm2,
                        hairsPerCm2,
                        area,
                        desiredCoverageValue,
                        minimumCoverageValue,
                        bottomSheetRef,
                    })}
                >
                    <Text style={styles.buttonTitle}>Save Changes</Text>
                </TouchableOpacity>
                <View style={{ width: '10%' }}></View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red' }]}
                    onPress={() => deleteZone(zone)}
                >
                    <Text style={styles.buttonTitle}>Delete Zone</Text>
                </TouchableOpacity>
            </View>
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

export default EditZone;
