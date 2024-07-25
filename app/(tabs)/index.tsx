import React, { useState, useRef } from 'react';
import { Appearance, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomSheet from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/Ionicons";

import logoImg from '@/assets/images/logo.png';
import CustomBottomSheet from "@/components/CustomBottomSheet";
import {useAppState} from "@/state/ZoneState";

Appearance.getColorScheme = () => 'light';



export default function ZonesScreen() {
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const [wheelMenuVisible, setWheelMenuVisible] = useState(false);
    const [donorMenuVisible, setDonorMenuVisible] = useState(false);
    const [recipientMenuVisible, setRecipientMenuVisible] = useState(false);
    const wheelBottomSheetRef = useRef<BottomSheet>(null);
    const donorBottomSheetRef = useRef<BottomSheet>(null);
    const recipientBottomSheetRef = useRef<BottomSheet>(null);

    const globalState = useAppState();


    const donorZones = globalState.donorZones;

    const [donorZoneMenuVisible, setDonorZoneMenuVisible] = useState<boolean[]>(donorZones.map(() => false));
    const donorBottomSheetRefs = useRef<React.RefObject<BottomSheet>[]>(donorZones.map(() => React.createRef<BottomSheet>()));

    const setSpecificDonorZoneMenuVisible = (i: number, visible: boolean) => {

        setDonorZoneMenuVisible((prev) => {
            const newStates = [...prev];
            newStates[i] = visible;
            return newStates;
        });
    };

    const handleMenuPress = (
        menuVisible: boolean,
        setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
        bottomSheetRef: React.RefObject<BottomSheet>

    ) => {
        console.log(menuVisible);
        if (menuVisible) {
            setMenuVisible(false);
            bottomSheetRef.current?.close();
        } else {
            setMenuVisible(true);
            bottomSheetRef.current?.expand();
        }
    };

    const handleSheetClose = (setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
        setMenuVisible(false);
    };

    function ZoneComponent() : React.JSX.Element[] {
        let elements = [];
        for (let i = 0; i < donorZones.length; i++) {
            elements.push(
                <TouchableOpacity
                    key={i}
                    style={styles.zoneButton}
                    onPress={() => {
                        handleMenuPress(
                            donorZoneMenuVisible[i],
                            () => setSpecificDonorZoneMenuVisible(i, !donorZoneMenuVisible[i]),
                            donorBottomSheetRefs.current[i]
                        );
                    }}
                >
                    <Text style={styles.zoneButtonText}>{donorZones[i].name}</Text>
                </TouchableOpacity>
            );
        }
        return elements;
    }




    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.placeholderContainer} />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image source={logoImg} style={styles.logo} />
                    </View>
                    <TouchableOpacity
                        style={styles.placeholderContainer}
                        onPress={() => handleMenuPress(wheelMenuVisible, setWheelMenuVisible, wheelBottomSheetRef)}
                    >
                        <FontAwesome gear="setting" size={35} color={wheelMenuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey} name="gear" />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonWrapper}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => handleMenuPress(donorMenuVisible, setDonorMenuVisible, donorBottomSheetRef)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Donor Zones</Text>
                        </View>



                        <ZoneComponent>

                        </ZoneComponent>

                    </View>







                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => handleMenuPress(recipientMenuVisible, setRecipientMenuVisible, recipientBottomSheetRef)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Recipient Zones</Text>
                        </View>
                        <TouchableOpacity style={styles.zoneButton}>
                            <Text style={styles.zoneButtonText}>Recipient Zone 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.zoneButton}>
                            <Text style={styles.zoneButtonText}>Recipient Zone 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.zoneButton}>
                            <Text style={styles.zoneButtonText}>Recipient Zone 3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>




            <CustomBottomSheet
                ref={wheelBottomSheetRef}
                onClose={() => handleSheetClose(setWheelMenuVisible)}
            >
                <Text>Wheel Menu Content</Text>
            </CustomBottomSheet>

            <CustomBottomSheet
                ref={donorBottomSheetRef}
                onClose={() => handleSheetClose(setDonorMenuVisible)}
            >
                <Text>Donor Menu Content</Text>
            </CustomBottomSheet>

            <CustomBottomSheet
                ref={recipientBottomSheetRef}
                onClose={() => handleSheetClose(setRecipientMenuVisible)}
            >
                <Text>Recipient Menu Content</Text>
            </CustomBottomSheet>
        </SafeAreaView>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        outerContainer: {
            flex: 1,
            backgroundColor: colors.softBackground,
        },
        topContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            width: '95%',
            paddingBottom: '5%',
            marginHorizontal: '2.5%',
            marginTop: 10,
        },
        placeholderContainer: {
            width: 50,
        },
        logo: {
            width: 35,
            height: 35,
            resizeMode: 'contain',
        },
        buttonWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderColor: 'lightgrey',
            paddingTop: 20,
        },
        buttonContainer: {
            flex: 1,
            marginHorizontal: 10,
        },
        button: {
            padding: 10,
            backgroundColor: colors.solidBackground,
            borderRadius: 8,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            alignItems: 'center',
        },
        buttonText: {
            color: colors.solidBackground,
            fontSize: 16,
        },
        zoneListTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.primaryText,
        },
        zoneButton: {
            marginVertical: 5,
            height: 50,
            padding: 10,
            backgroundColor: colors.solidBackground,
            borderRadius: 8,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        zoneButtonText: {
            color: colors.primaryText,
        },
    });
}
