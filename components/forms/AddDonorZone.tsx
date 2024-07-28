
import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { DonorZone } from "@/state/Store";

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

function AddDonorZone({ zones }: AddDonorZoneProps) {
    const [name, setName] = React.useState('');
    const [caliber, setCaliber] = React.useState('');
    const [fuPerCm2, setFuPerCm2] = React.useState('');
    const [hairsPerCm2, setHairsPerCm2] = React.useState('');
    const [area, setArea] = React.useState('');
    const [desiredCoverageValue, setDesiredCoverageValue] = React.useState('');

    function handleSubmit(args: HandleSubmitArgs) {

        if (args.name === '') {
            alert('Please enter a name for the zone.');
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
    }

    return (
        <View>
            <TextInput placeholder="Zone Name" onChangeText={setName} value={name}/>
            <TextInput placeholder="Caliber" onChangeText={setCaliber} value={caliber}/>
            <TextInput placeholder="Follicular Units per cm2" onChangeText={setFuPerCm2} value={fuPerCm2}/>
            <TextInput placeholder="Hairs per cm2" onChangeText={setHairsPerCm2} value={hairsPerCm2}/>
            <TextInput placeholder="Area in cm2" onChangeText={setArea} value={area}/>
            <TextInput placeholder="Desired Coverage Value" onChangeText={setDesiredCoverageValue}
                       value={desiredCoverageValue}/>
            <Button
                title="Add Zone"
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
        </View>
    );
}

export default AddDonorZone;
