import React from 'react';
import {Button, TextInput, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RecipientZone, useAppState} from "@/state/Store";
import FormStyles from "@/components/forms/styles/FormStyles";

export interface AddDonorZoneProps {
    zones: RecipientZone[];
}

interface HandleSubmitArgs {
    name: string;
    caliber: string;
    fuPerCm2: string;
    hairsPerCm2: string;
    area: string;
    desiredCoverageValue: string;
    zones: RecipientZone[];
}

const AddRecipientZone: React.FC<AddDonorZoneProps> = ({ zones }) => {
    const [name, setName] = React.useState('');
    const [caliber, setCaliber] = React.useState('');
    const [fuPerCm2, setFuPerCm2] = React.useState('');
    const [hairsPerCm2, setHairsPerCm2] = React.useState('');
    const [area, setArea] = React.useState('');
    const [desiredCoverageValue, setDesiredCoverageValue] = React.useState('');
    const [message, setMessage] = React.useState('');
    const globalState = useAppState();

    const styles = FormStyles();


    const handleSubmit = (args: HandleSubmitArgs) => {
        if (!args.name || !args.caliber || !args.fuPerCm2 || !args.hairsPerCm2 || !args.area || !args.desiredCoverageValue) {
            setMessage('Please enter all fields.');
            return;
        }

        const newZone: RecipientZone = {
            name: args.name,
            caliber: parseFloat(args.caliber) || 0,
            fuPerCm2: parseFloat(args.fuPerCm2) || 0,
            hairPerCm2: parseFloat(args.hairsPerCm2) || 0,
            area: parseFloat(args.area) || 0,
            desiredCoverageValue: parseFloat(args.desiredCoverageValue) || 0,
        };


        globalState.calculateRecipientZoneValues(newZone);


        zones.push(newZone);

        setMessage('Recipient zone added successfully!');

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
            {/*<Text style={styles.title}>Add Recipient Zone</Text>*/}

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
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Follicular Units per cm2"
                onChangeText={setFuPerCm2}
                value={fuPerCm2}
                placeholderTextColor={styles.input.color}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Hairs per cm2"
                onChangeText={setHairsPerCm2}
                value={hairsPerCm2}
                placeholderTextColor={styles.input.color}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Area in cm2"
                onChangeText={setArea}
                value={area}
                placeholderTextColor={styles.input.color}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Desired Coverage Value"
                onChangeText={setDesiredCoverageValue}
                value={desiredCoverageValue}
                placeholderTextColor={styles.input.color}
                keyboardType="numeric"
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

export default AddRecipientZone;
