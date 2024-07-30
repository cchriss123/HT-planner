import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DonorZone, useAppState } from "@/state/Store";
import FormStyles from "@/components/forms/styles/FormStyles";

interface AddDonorZoneProps {
    zones: DonorZone[];
}

interface AddZoneArgs {
    name: string;
    caliber: string;
    fuPerCm2: string;
    hairsPerCm2: string;
    area: string;
    desiredCoverageValue: string;
    zones: DonorZone[];
}



function AddDonorZone({ zones }: AddDonorZoneProps) {

    const [name, setName] = React.useState('');
    const [caliber, setCaliber] = React.useState('');
    const [fuPerCm2, setFuPerCm2] = React.useState('');
    const [hairsPerCm2, setHairsPerCm2] = React.useState('');
    const [area, setArea] = React.useState('');
    const [desiredCoverageValue, setDesiredCoverageValue] = React.useState('');
    const [message, setMessage] = React.useState('');
    const replaceCommaWithDot = (value: string) => value.replace(',', '.');
    const { styles, theme } = FormStyles();
    const { calculateDonorZoneValues } = useAppState();

    function addZone(args: AddZoneArgs) {
        const valuesToCheck = {
            caliber: parseFloat(replaceCommaWithDot(args.caliber)),
            fuPerCm2: parseInt(args.fuPerCm2),
            hairsPerCm2: parseInt(args.hairsPerCm2),
            area: parseFloat(replaceCommaWithDot(args.area)),
            desiredCoverageValue: parseFloat(replaceCommaWithDot(args.desiredCoverageValue))
        };

        if (!args.name || !args.caliber || !args.fuPerCm2 || !args.hairsPerCm2 || !args.area || !args.desiredCoverageValue) {
            setMessage('Please enter all fields.');
            return;
        }
        if (zones.some(zone => zone.name === args.name)) {
            setMessage('Zone with that name already exists.');
            return;
        }

        if (Object.values(valuesToCheck).some(isNaN)) {
            setMessage('Please enter correct value types.');
            return;
        }

        const newZone: DonorZone = {
            name: args.name,
            caliber: valuesToCheck.caliber,
            fuPerCm2: valuesToCheck.fuPerCm2,
            hairPerCm2: valuesToCheck.hairsPerCm2,
            area: valuesToCheck.area,
            desiredCoverageValue: valuesToCheck.desiredCoverageValue,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hairs: 0,
            hairPerCountedFu: 0,
            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            fuExtractedToReachDonorDesiredCoverageValue: 0,
            fuLeftToReachDonorDesiredCoverageValue: 0,
        };

        calculateDonorZoneValues(newZone);
        zones.push(newZone);
        setMessage('Donor zone added successfully!');

        setName('');
        setCaliber('');
        setFuPerCm2('');
        setHairsPerCm2('');
        setArea('');
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
            <TextInput
                label="Desired Coverage Value"
                mode="outlined"
                value={desiredCoverageValue}
                onChangeText={setDesiredCoverageValue}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => addZone({
                    name,
                    caliber,
                    fuPerCm2,
                    hairsPerCm2,
                    area,
                    desiredCoverageValue,
                    zones,
                })}
            >
                <Text style={styles.buttonTitle}>Add Donor Zone</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
};

export default AddDonorZone;
