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

    function handlePlusPress(value: number) {
        if (!selectedZone) return;
        if (value === 1) selectedZone.countOne += 1;
        if (value === 2) selectedZone.countTwo += 1;
        if (value === 3) selectedZone.countThree += 1;


        selectedZone.totalHair += value;
        selectedZone.totalGraphs += 1;

        zoneState.setZones([...zoneState.zones]);
    }

    useEffect(() => {
        if (!selectedZone && zoneState.zones.length > 0) {
            console.log('Initializing selectedZone to the first zone');
            setSelectedZone(zoneState.zones[0]);
        }
    }, [zoneState.zones]);


    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10}}>

        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? Colors.dark.softBackground : Colors.light.softBackground }}>
                <View style={styles.topContainer}>


                    <View style={{ borderColor: 'black', width: '60%', alignItems: 'center' }}>
                        <DropdownComponent selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
                    </View>
                </View>


                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handlePlusPress(1)}>
                            <Text style={styles.buttonText}>{`Single (${selectedZone?.countOne})`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handlePlusPress(2)}>
                            <Text style={styles.buttonText}>{`Double (${selectedZone?.countTwo})`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handlePlusPress(3)}>
                            <Text style={styles.buttonText}>{`Triple (${selectedZone?.countThree})`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.countContainer}>
                        <ThemedText style={styles.largeText}>{`Count: ${selectedZone?.totalGraphs}`}</ThemedText>
                        <ThemedText style={styles.smallText}>{`Total Hair: ${selectedZone?.totalHair}`}</ThemedText>
                    </View>
                </View>

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

        },
        buttonContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: colors.tint,
            paddingTop: 10,
            paddingBottom: 10,
        },
        button: {

            borderRadius: 20,
            margin: 15,
            width: '90%',
            borderWidth: 2,
            height: 100,
            justifyContent: 'center',
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
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        countContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: colors.icon,
            height: 120,
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
        smallText: {
            fontSize: 20,
            marginBottom: 20,
            color: colors.primaryText,
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
            }



    }

    );
}
