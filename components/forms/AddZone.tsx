import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useAppState } from "@/state/Store";
import FormStyles from "@/components/forms/styles/FormStyles";
import { valuesToCheck, ZoneArgs } from "@/components/forms/utility/valuesToCheck";
import BottomSheet from "@gorhom/bottom-sheet";
import {DonorZone, RecipientZone, Zone} from "@/types/zones";

interface AddZoneProps {
    zones: Zone[];
    zoneType: 'donor' | 'recipient';
    bottomSheetRef: React.RefObject<BottomSheet>;
}

function AddZone({ zones, zoneType, bottomSheetRef }: AddZoneProps) {

    const [name, setName] = React.useState('');
    const [caliber, setCaliber] = React.useState('');
    const [fuPerCm2, setFuPerCm2] = React.useState('');
    const [hairsPerCm2, setHairsPerCm2] = React.useState('');
    const [area, setArea] = React.useState('');
    const [minimumCoverageValue, setMinimumCoverageValue] = React.useState('');
    const [desiredCoverageValue, setDesiredCoverageValue] = React.useState('');
    const [message, setMessage] = React.useState('');
    const { styles, theme } = FormStyles();
    const globalState = useAppState();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function addZoneSubmit(args: ZoneArgs) {
        const checkedValues = valuesToCheck(args, zoneType);

        if (!args.name || !args.caliber || !args.fuPerCm2 || !args.hairsPerCm2 || !args.area ||
            (zoneType === 'donor' && !args.minimumCoverageValue) ||
            (zoneType === 'recipient' && !args.desiredCoverageValue)) {
            setMessage('Please enter all fields.');
            return;
        }

        if (zones.some(zone => zone.name === args.name)) {
            setMessage('Zone with that name already exists.');
            return;
        }

        if (Object.values(checkedValues).some(value => value === undefined || isNaN(value))) {
            console.log(checkedValues);
            setMessage('Please enter correct value types.');
            return;
        }

        if (zoneType === 'donor') addDonorZone(args, checkedValues);
        else addRecipientZone(args, checkedValues);
    }


    function addDonorZone(args: ZoneArgs, checkedValues: any) {
        const newZone: DonorZone = {
            type: 'donor',
            name: args.name,
            caliber: checkedValues.caliber,
            graftsPerCm2: checkedValues.fuPerCm2,
            hairPerCm2: checkedValues.hairsPerCm2,
            area: checkedValues.area,
            minimumCoverageValue: checkedValues.minimumCoverageValue,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graftsCounted: 0,
            hairsCounted: 0,
            hairPerCountedGraft: 0,
            graftsInZone: 0,
            coverageValue: 0,
            hairInZone: 0,
            availableForExtraction: 0,
            graftsToExtract: 0,
            graftsToExtractLeft: 0,
        };

        //globalState.calculateDonorZoneValues(newZone);

        globalState.donorZones.push(newZone);
        globalState.performCalculationsAndRerender();

        setMessage('Donor zone added successfully!');
        resetForm();
        bottomSheetRef.current?.close();
    }

    function addRecipientZone(args: ZoneArgs, checkedValues: any) {
        const newZone: RecipientZone = {
            type: 'recipient',
            name: args.name,
            caliber: checkedValues.caliber,
            graftsPerCm2: checkedValues.fuPerCm2,
            hairPerCm2: checkedValues.hairsPerCm2,
            area: checkedValues.area,
            desiredCoverageValue: checkedValues.desiredCoverageValue,
            startingCoverageValue: 0,
            coverageValueDifference: 0,
            graftsImplantedToReachRecipientDesiredCoverageValue: 0,
            grafts: 0,
        };

        globalState.recipientZones.push(newZone);
        globalState.performCalculationsAndRerender();
        setMessage('Recipient zone added successfully!');
        resetForm();
        bottomSheetRef.current?.close();
    }

    function resetForm() {
        setName('');
        setCaliber('');
        setFuPerCm2('');
        setHairsPerCm2('');
        setArea('');
        setMinimumCoverageValue('');
        setDesiredCoverageValue('');

        setTimeout(() => {
            setMessage('');
        }, 3000);
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Zone Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Caliber"
                mode="outlined"
                value={caliber}
                onChangeText={setCaliber}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Follicular Units per cm2"
                mode="outlined"
                value={fuPerCm2}
                onChangeText={setFuPerCm2}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Hairs per cm2"
                mode="outlined"
                value={hairsPerCm2}
                onChangeText={setHairsPerCm2}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />
            <TextInput
                label="Area in cm2"
                mode="outlined"
                value={area}
                onChangeText={setArea}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />

            {zoneType === 'donor' ? (
                <TextInput
                    label="Minimum Coverage Value"
                    mode="outlined"
                    value={minimumCoverageValue}
                    onChangeText={setMinimumCoverageValue}
                    keyboardType="numeric"
                    style={styles.input}
                    theme={theme}
                />
            ) : (
                <TextInput
                    label="Desired Coverage Value"
                    mode="outlined"
                    value={desiredCoverageValue}
                    onChangeText={setDesiredCoverageValue}
                    keyboardType="numeric"
                    style={styles.input}
                    theme={theme}
                />
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={() => addZoneSubmit({
                    name,
                    caliber,
                    fuPerCm2,
                    hairsPerCm2,
                    area,
                    minimumCoverageValue,
                    desiredCoverageValue,
                })}
            >
                <Text style={styles.buttonTitle}>Add {zoneType.charAt(0).toUpperCase() + zoneType.slice(1)}</Text>

            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

export default AddZone;
