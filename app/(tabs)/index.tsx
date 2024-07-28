import React, { useState, useRef } from 'react';
import {Appearance, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Keyboard} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomSheet from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/Ionicons";
import logoImg from '@/assets/images/logo.png';
import CustomBottomSheet from "@/components/CustomBottomSheet";
import { useAppState, Zone } from "@/state/Store";
import AddDonorZone from "@/components/forms/AddDonorZone";
import AddRecipientZone from "@/components/forms/AddRecipientZone";

Appearance.getColorScheme = () => 'light';

export default function ZonesScreen() {
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const globalState = useAppState();

    const donorZones = globalState.donorZones;
    const recipientZones = globalState.recipientZones;
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    const bottomSheetRefs = {
        wheel: useRef<BottomSheet>(null),
        addDonor: useRef<BottomSheet>(null),
        addRecipient: useRef<BottomSheet>(null),
        editDonor: useRef<BottomSheet>(null),
        editRecipient: useRef<BottomSheet>(null)
    };

    const handleMenuPress = (ref: React.RefObject<BottomSheet>, zone: Zone | null = null) => {
        setSelectedZone(zone);
        ref.current?.expand();
        ref.current?.snapToIndex(1);
    };

    const DonorZoneComponents = () => donorZones.map((zone, i) => (
        <TouchableOpacity
            key={i}
            style={styles.zoneButton}
            onPress={() => handleMenuPress(bottomSheetRefs.editDonor, zone)}
        >
            <Text style={styles.zoneButtonText}>{zone.name}</Text>
        </TouchableOpacity>
    ));

    const RecipientZoneComponents = () => recipientZones.map((zone, i) => (
        <TouchableOpacity
            key={i}
            style={styles.zoneButton}
            onPress={() => handleMenuPress(bottomSheetRefs.editRecipient, zone)}
        >
            <Text style={styles.zoneButtonText}>{zone.name}</Text>
        </TouchableOpacity>
    ));

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
                        onPress={() => handleMenuPress(bottomSheetRefs.wheel)}
                    >
                        <FontAwesome gear="setting" size={35} color={globalState.menuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey} name="gear" />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonWrapper}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => handleMenuPress(bottomSheetRefs.addDonor)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Donor Zones</Text>
                        </View>
                        <DonorZoneComponents />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => handleMenuPress(bottomSheetRefs.addRecipient)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Recipient Zones</Text>
                        </View>
                        <RecipientZoneComponents />
                    </View>
                </View>
            </ScrollView>

            <CustomBottomSheet ref={bottomSheetRefs.wheel}>
                <Text>Wheel Menu Content</Text>
            </CustomBottomSheet>
            <CustomBottomSheet ref={bottomSheetRefs.addDonor}>
                <AddDonorZone zones={donorZones} />
            </CustomBottomSheet>
            <CustomBottomSheet ref={bottomSheetRefs.addRecipient}>
                <Text>Add Recipient Menu Content</Text>
                <AddRecipientZone zones={recipientZones} />
            </CustomBottomSheet>
            <CustomBottomSheet ref={bottomSheetRefs.editDonor}>
                <Text>Edit Donor Zone Menu for {selectedZone?.name}</Text>
            </CustomBottomSheet>
            <CustomBottomSheet ref={bottomSheetRefs.editRecipient}>
                <Text>Edit Recipient Zone Menu for {selectedZone?.name}</Text>
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

export { ZonesScreen };
