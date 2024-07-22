import React, { useRef, useState, useEffect } from 'react';
import {Animated, View, TouchableOpacity, Text, useColorScheme, StyleSheet, Dimensions, TextInput, Alert, Platform} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedView } from '@/components/AnimatedView';
import { DropdownComponent } from '@/components/DropdownComponent';
import {AppStateProvider, useAppState, Zone} from '@/state/ZoneState';


export default function CounterScreen() {

    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme);
    const zoneState = useAppState();
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    function updateZoneCounts(value: number) {

        if (!selectedZone) return;
        if (value > 4) return;

        if (value === 1) selectedZone.countOne ++;
        else if (value === 2) selectedZone.countTwo ++;
        else if (value === 3) selectedZone.countThree ++;
        else if (value === 4) selectedZone.countFour ++;
        else if (value === -1) {
            if (selectedZone.countOne <= 0) return;
            selectedZone.countOne --;
        }
        else if (value === -2) {
            if (selectedZone.countTwo <= 0) return;
            selectedZone.countTwo --;
        }
        else if (value === -3) {
            if (selectedZone.countThree <= 0) return;
            selectedZone.countThree --;
        }
        else if (value === -4) {
            if (selectedZone.countFour <= 0) return;
            selectedZone.countFour --;
        }

        value > 0 ? selectedZone.totalGraphs ++ : selectedZone.totalGraphs --;
        selectedZone.totalHair += value;
        selectedZone.averageHairPerFU = selectedZone.totalHair / selectedZone.totalGraphs;

        zoneState.setZones([...zoneState.zones]);
    }

    useEffect(() => {
        if (!selectedZone && zoneState.zones.length > 0) {
            console.log('Initializing selectedZone to the first zone');
            setSelectedZone(zoneState.zones[0]);
        }
    }, [zoneState.zones]);


    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 20}}>
            <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? Colors.dark.softBackground : Colors.light.softBackground }}>
                <View style={styles.topContainer}>
                    <View style={{ borderColor: 'black', width: '60%', alignItems: 'center' }}>
                        <DropdownComponent selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
                    </View>
                </View>


            {selectedZone ? (
                <View style={{ flex: 1, alignItems: 'center' }}>

                    <View style={styles.buttonAreaContainer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(-1)}>
                                <Icon name="remove-circle" size={60} color={Colors.light.solidBackground} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>{`Singles ${selectedZone?.countOne}`}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(1)}>
                                <Icon name="add-circle" size={60} color={Colors.light.solidBackground} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(-2)}>
                                <Icon name="remove-circle" size={60} color={Colors.light.solidBackground} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>{`Doubles ${selectedZone?.countTwo}`}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(2)}>
                                <Icon name="add-circle" size={60} color={Colors.light.solidBackground} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(-3)}>
                                <Icon name="remove-circle" size={60} color={Colors.light.solidBackground} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>{`Triples ${selectedZone?.countThree}`}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(3)}>
                                <Icon name="add-circle" size={60} color={Colors.light.solidBackground} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(-4)}>
                                <Icon name="remove-circle" size={60} color={Colors.light.solidBackground} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>{`Quadruples ${selectedZone?.countFour}`}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(4)}>
                                <Icon name="add-circle" size={60} color={Colors.light.solidBackground} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.countContainer}>
                            <Text style={styles.mediumText}>{`Graphs: ${selectedZone.totalGraphs}`}</Text>
                            <Text style={styles.mediumText}>{`Hairs: ${selectedZone?.totalHair}`}</Text>
                        <Text style={styles.mediumText}>Hairs/FU: {selectedZone.averageHairPerFU.toFixed(2)}</Text>
                    </View>

                    <View style={styles.outerInfoContainer}>
                        <View style={styles.innerInfoContainer}>

                            <Text style={{ fontWeight: 'bold'}}>Zone Info</Text>
                            <Text>{`Area: ${selectedZone.area} cm²`}</Text>

                        </View>
                        <View style={styles.innerInfoContainer}>
                            <Text style={{ fontWeight: 'bold'}}>Overall Info</Text>

                        </View>
                    </View>








                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.countContainer}>
                        <Text style={{ fontSize: 30, color: Colors.light.primaryText,}}>Please add a zone</Text>
                    </View>
                </View>
            )}


                </View>

        </SafeAreaView>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {

// function createStyles(colorScheme: "light" | "dark" | null | undefined, addMenuVisible: boolean, editMenuVisible: boolean) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return StyleSheet.create({
        topContainer: {
            // zIndex: 1000,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            width: '100%', // Use full width
            paddingHorizontal: '5%', // Add padding on both sides
            paddingBottom: '5%'

        },
        buttonAreaContainer: {

            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: 'lightgrey',
            paddingTop: 5,
            paddingBottom: 5,
        },
        buttonContainer: {

            flexDirection: 'row',
            borderRadius: 20,
            margin: 8,
            width: '90%',
            borderWidth: 2,
            height: 70,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.primaryBlue,
            borderTopColor: colors.secondaryBlue,
            borderLeftColor: colors.secondaryBlue,
            borderRightColor: colors.neutralGrey,
            borderBottomColor: colors.neutralGrey,

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },

        buttonText: {
            color: colors.solidBackground,
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        countContainer: {

            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // borderWidth: 1,
            height: 50,
            // paddingHorizontal: 5,
        },
        customTitle: {
            fontSize: 30,
        },
        largeText: {
            fontSize: 50,
            paddingTop: 30,
            marginTop: 20,
            marginBottom: 5,
            color: colors.primaryText,
            fontWeight: 'bold',

        },
        mediumText: {
            fontSize: 20,
            color: colors.primaryText,
            fontWeight: 'bold',
        },


        // addMenuIcon: {
        //     fontSize: 50,
        //     color: editMenuVisible ? colors.primaryBlue : colors.neutralGrey,
        //
        // },
        //
        // editMenuIcon: {
        //     fontSize: 50,
        //     color: addMenuVisible ? colors.primaryBlue : colors.neutralGrey,
        // },



        menuRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 80,


        },
        textInput: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            width: '70%',
            height: 50,
            backgroundColor: colors.softBackground,
            borderRadius: 15,
        },
        okButton: {
            padding: 10,
            borderRadius: 15,
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            borderWidth: 2,

            backgroundColor: colors.primaryBlue,
            borderTopColor: colors.secondaryBlue,
            borderLeftColor: colors.secondaryBlue,
            borderRightColor: colors.neutralGrey,
            borderBottomColor: colors.neutralGrey,

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,

        },
        okButtonText: {
            color: colors.solidBackground,
            fontSize: 18,
        },
        resetButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginTop: 10,
        },
        resetButton: {
            padding: 10,
            borderRadius: 15,
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            borderWidth: 2,
            backgroundColor: '#D9534F', // Softer red color
            borderTopColor: '#B94A48',
            borderLeftColor: '#B94A48',
            borderRightColor: colors.neutralGrey,
            borderBottomColor: colors.neutralGrey,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },
        resetButtonText: {
            color: colors.solidBackground,
            fontSize: 18,
        },
        button: {
            marginHorizontal: '5%',
            backgroundColor: colors.primaryBlue,
            borderTopColor: colors.secondaryBlue,
            borderLeftColor: colors.secondaryBlue,
            borderRightColor: colors.neutralGrey,
            borderBottomColor: colors.neutralGrey,
        },
        outerInfoContainer: {
            flexDirection: 'row',
            width: '100%',
            height: 400,
        },
        innerInfoContainer: {
            width: '50%',
            height: 400,
            padding: '2%',
            borderTopWidth: 1,
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor: 'lightgrey',
            borderRadius: 5,






        }
    });

}
