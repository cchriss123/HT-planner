import React, { useState, useRef, useCallback } from 'react';
import { Appearance, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
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

    const [wheelMenuVisible, setWheelMenuVisible] = useState(false);
    const [addDonorMenuVisible, setAddDonorMenuVisible] = useState(false);
    const [addRecipientMenuVisible, setAddRecipientMenuVisible] = useState(false);
    const [editDonorZoneVisible, setEditDonorZoneVisible] = useState(false);
    const [editRecipientZoneVisible, setEditRecipientZoneVisible] = useState(false);

    const wheelBottomSheetRef = useRef<BottomSheet>(null);
    const addDonorBottomSheetRef = useRef<BottomSheet>(null);
    const addRecipientBottomSheetRef = useRef<BottomSheet>(null);
    const editDonorZoneBottomSheetRef = useRef<BottomSheet>(null);
    const editRecipientZoneBottomSheetRef = useRef<BottomSheet>(null);

    const handleMenuPress = useCallback(
        (
            menuVisible: boolean,
            setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
            bottomSheetRef: React.RefObject<BottomSheet>,
            zone: Zone | null = null
        ) => {
            if (menuVisible) {
                setMenuVisible(false);
                bottomSheetRef.current?.close();
            } else {
                setSelectedZone(zone);
                setMenuVisible(true);
                bottomSheetRef.current?.expand();
                bottomSheetRef.current?.snapToIndex(2);
            }
        },
        []
    );


    const DonorZoneComponents = () => donorZones.map((zone, i) => (
        <TouchableOpacity
            key={i}
            style={styles.zoneButton}
            onPress={() => handleMenuPress(
                editDonorZoneVisible,
                setEditDonorZoneVisible,
                editDonorZoneBottomSheetRef,
                zone
            )}
        >
            <Text style={styles.zoneButtonText}>{zone.name}</Text>
        </TouchableOpacity>
    ));

    const RecipientZoneComponents = () => recipientZones.map((zone, i) => (
        <TouchableOpacity
            key={i}
            style={styles.zoneButton}
            onPress={() => handleMenuPress(
                editRecipientZoneVisible,
                setEditRecipientZoneVisible,
                editRecipientZoneBottomSheetRef,
                zone
            )}
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
                        onPress={() => handleMenuPress(wheelMenuVisible, setWheelMenuVisible, wheelBottomSheetRef)}
                    >
                        <FontAwesome gear="setting" size={35} color={wheelMenuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey} name="gear" />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonWrapper}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => handleMenuPress(addDonorMenuVisible, setAddDonorMenuVisible, addDonorBottomSheetRef)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Donor Zones</Text>
                        </View>
                        <DonorZoneComponents />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => handleMenuPress(addRecipientMenuVisible, setAddRecipientMenuVisible, addRecipientBottomSheetRef)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Recipient Zones</Text>
                        </View>
                        <RecipientZoneComponents />
                    </View>
                </View>
            </ScrollView>

            <CustomBottomSheet ref={wheelBottomSheetRef}>
                <Text>Wheel Menu Content</Text>
            </CustomBottomSheet>
            <CustomBottomSheet ref={addDonorBottomSheetRef}>
                <AddDonorZone zones={donorZones} />
            </CustomBottomSheet>
            <CustomBottomSheet ref={addRecipientBottomSheetRef}>
                <Text>Add Recipient Menu Content</Text>
                <AddRecipientZone zones={recipientZones} />
            </CustomBottomSheet>
            <CustomBottomSheet ref={editDonorZoneBottomSheetRef}>
                <Text>Edit Donor Zone Menu for {selectedZone?.name}</Text>
            </CustomBottomSheet>
            <CustomBottomSheet ref={editRecipientZoneBottomSheetRef}>
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
