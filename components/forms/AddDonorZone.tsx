import React from 'react';
import {Button, TextInput, View, Text, TouchableOpacity} from 'react-native';
import { DonorZone } from "@/state/Store";
import FormStyles from "@/components/forms/styles/FormStyles";

export interface AddDonorZoneProps {
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

    const styles = FormStyles(); // Invoke the function to get the styles

    const handleSubmit = (args: HandleSubmitArgs) => {
        if (!args.name) {
            setMessage('Please enter a name for the zone.');
            return;
        }

        const newZone: DonorZone = {
            name: args.name,
            caliber: parseFloat(args.caliber) || 0,
            fuPerCm2: parseFloat(args.fuPerCm2) || 0,
            hairPerCm2: parseFloat(args.hairsPerCm2) || 0,
            area: parseFloat(args.area) || 0,
            desiredCoverageValue: parseFloat(args.desiredCoverageValue) || 0,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hairs: 0,
            hairPerCountedFu: 0,
        };

        newZone.hairPerFu = newZone.hairPerCm2 / newZone.fuPerCm2;
        newZone.fuPerZone = newZone.area * newZone.fuPerCm2;
        newZone.coverageValue = newZone.caliber * newZone.hairPerCm2;
        newZone.hairPerZone = newZone.area * newZone.hairPerCm2;
        newZone.fuExtractedToReachDonorDesiredCoverageValue =
            newZone.fuPerZone - ((newZone.area * newZone.desiredCoverageValue) / (newZone.caliber * newZone.hairPerFu));

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
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Donor Zone</Text>

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
                onChangeText={setCaliber}
                value={caliber}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Follicular Units per cm2"
                onChangeText={setFuPerCm2}
                value={fuPerCm2}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Hairs per cm2"
                onChangeText={setHairsPerCm2}
                value={hairsPerCm2}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Area in cm2"
                onChangeText={setArea}
                value={area}
                placeholderTextColor={styles.input.color}
            />
            <TextInput
                style={styles.input}
                placeholder="Desired Coverage Value"
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
