import React from 'react';
import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import { RecipientZone } from "@/state/Store";

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

    const handleSubmit = (args: HandleSubmitArgs) => {
        if (!args.name) {
            setMessage('Please enter a name for the zone.');
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


        newZone.hairPerFu = newZone.hairPerCm2 / newZone.fuPerCm2;
        newZone.startingCoverageValue = newZone.caliber * newZone.hairPerCm2;
        newZone.coverageValueDifference = newZone.desiredCoverageValue - newZone.startingCoverageValue;
        newZone.fuImplantedToReachDesiredRecipientCoverageValue = (newZone.area * newZone.coverageValueDifference) / (newZone.caliber * newZone.hairPerFu);


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
        <View>
            <TextInput placeholder="Zone Name" onChangeText={setName} value={name} />
            <TextInput placeholder="Caliber" onChangeText={setCaliber} value={caliber} />
            <TextInput placeholder="Follicular Units per cm2" onChangeText={setFuPerCm2} value={fuPerCm2} />
            <TextInput placeholder="Hairs per cm2" onChangeText={setHairsPerCm2} value={hairsPerCm2} />
            <TextInput placeholder="Area in cm2" onChangeText={setArea} value={area} />
            <TextInput placeholder="Desired Coverage Value" onChangeText={setDesiredCoverageValue} value={desiredCoverageValue} />
            <Button
                title="Add Recipient Zone"
                onPress={() => handleSubmit({
                    name,
                    caliber,
                    fuPerCm2,
                    hairsPerCm2,
                    area,
                    desiredCoverageValue,
                    zones,
                })}
            />
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    message: {
        marginTop: 10,
        color: 'green',
        textAlign: 'center',
    },
});

export default AddRecipientZone;
