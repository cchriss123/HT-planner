import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DonorZone, RecipientZone, useAppState, Zone } from "@/state/Store";
import FormStyles from "@/components/forms/styles/FormStyles";
import { valuesToCheck } from "@/components/forms/utility/valuesToCheck";

interface EditZoneProps {
    zones: Zone[];
    zone: Zone;
}


interface EditZoneArgs {
    name: string;
    caliber: string;
    fuPerCm2: string;
    hairsPerCm2: string;
    area: string;
    desiredCoverageValue: string;
}

function EditZone({ zones, zone }: EditZoneProps) {
    if (!zone) return;
    const [name, setName] = React.useState(zone.name);
    const [caliber, setCaliber] = React.useState(zone.caliber.toString());
    const [fuPerCm2, setFuPerCm2] = React.useState(zone.graftsPerCm2.toString());
    const [hairsPerCm2, setHairsPerCm2] = React.useState(zone.hairPerCm2.toString());
    const [area, setArea] = React.useState(zone.area.toString());
    const [desiredCoverageValue, setDesiredCoverageValue] = React.useState(zone.desiredCoverageValue.toString());
    const [message, setMessage] = React.useState('');
    const { setDonorZones, setRecipientZones, donorZones, recipientZones, updateTotalCounts } = useAppState();

    const { calculateDonorZoneValues, calculateRecipientZoneValues } = useAppState();
    const { styles, theme } = FormStyles();


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);



    function editZoneSubmit(args: EditZoneArgs) {


        const checkedValues = valuesToCheck(args);

        if (zones.some(z => z.name === args.name && z.name !== zone.name)) {
            setMessage('Zone with that name already exists.');
            return;
        }


        zone.name = args.name || zone.name;
        zone.caliber = checkedValues.caliber || zone.caliber;
        zone.graftsPerCm2 = checkedValues.fuPerCm2 || zone.graftsPerCm2;
        zone.hairPerCm2 = checkedValues.hairsPerCm2 || zone.hairPerCm2;
        zone.area = checkedValues.area || zone.area;
        zone.desiredCoverageValue = checkedValues.desiredCoverageValue || zone.desiredCoverageValue;

        if (zone.type === 'donor') {
            calculateDonorZoneValues(zone as DonorZone);
            updateTotalCounts();


            setDonorZones([...donorZones]);
        }
        else if (zone.type === 'recipient'){
            calculateRecipientZoneValues(zone as RecipientZone);
            setRecipientZones([...recipientZones]);
        }


        setMessage('Zone updated.');

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
            <TextInput
                label="Desired Coverage Value"
                mode="outlined"
                value={desiredCoverageValue}
                onChangeText={setDesiredCoverageValue}
                placeholder={zone.desiredCoverageValue.toString()}
                keyboardType="numeric"
                style={styles.input}
                theme={theme}
            />


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
                    })}
                >
                    <Text style={styles.buttonTitle}>Save Changes</Text>
                </TouchableOpacity>
                <View style={{ width: '10%'}}></View>
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
