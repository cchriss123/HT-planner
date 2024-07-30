import React from 'react';
import { Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { DonorZone, useAppState } from "@/state/Store";
import FormStyles from "@/components/forms/styles/FormStyles";

interface AddDonorZoneProps {
    zones: DonorZone[];
}

interface HandleSubmitArgs {
    name: string;
    caliber: string;
    fuPerCm2: string;
    hairsPerCm2: string;
    area: string;
    desiredCoverageValue: string;
    zones: DonorZone[];
}

const AddDonorZone: React.FC<AddDonorZoneProps> = ({ zones }) => {
    const [name, setName] = React.useState('');
    const [caliber, setCaliber] = React.useState('');
    const [fuPerCm2, setFuPerCm2] = React.useState('');
    const [hairsPerCm2, setHairsPerCm2] = React.useState('');
    const [area, setArea] = React.useState('');
    const [desiredCoverageValue, setDesiredCoverageValue] = React.useState('');
    const [message, setMessage] = React.useState('');
    const replaceCommaWithDot = (value: string) => value.replace(',', '.');

    const styles = FormStyles();
    const { calculateDonorZoneValues } = useAppState(); // Call useAppState at the top level

    function handleSubmit(args: HandleSubmitArgs) {
        if (!args.name || !args.caliber || !args.fuPerCm2 || !args.hairsPerCm2 || !args.area || !args.desiredCoverageValue) {
            setMessage('Please enter all fields.');
            return;
        }

        const newZone: DonorZone = {
            name: args.name,
            caliber: parseFloat(replaceCommaWithDot(args.caliber)) || 0,
            fuPerCm2: parseInt(args.fuPerCm2) || 0,
            hairPerCm2: parseInt(args.hairsPerCm2) || 0,
            area: parseFloat(replaceCommaWithDot(args.area)) || 0,
            desiredCoverageValue: parseFloat(replaceCommaWithDot(args.desiredCoverageValue)) || 0,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hairs: 0,
            hairPerCountedFu: 0,
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
            {/*<Text style={styles.title}>Add Donor Zone</Text>*/}

            <TextInput
                style={styles.input}
                placeholder="Zone Name"
                onChangeText={setName}
                value={name}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Caliber"
                keyboardType="numeric"
                onChangeText={setCaliber}
                value={caliber}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Follicular Units per cm2"
                keyboardType="numeric"
                onChangeText={setFuPerCm2}
                value={fuPerCm2}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Hairs per cm2"
                keyboardType="numeric"
                onChangeText={setHairsPerCm2}
                value={hairsPerCm2}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Area in cm2"
                keyboardType="numeric"
                onChangeText={setArea}
                value={area}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Desired Coverage Value"
                keyboardType="numeric"
                onChangeText={setDesiredCoverageValue}
                value={desiredCoverageValue}
                placeholderTextColor={styles.input.color}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit({
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
