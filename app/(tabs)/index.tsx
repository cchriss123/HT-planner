import React, { useState, useRef, useEffect } from 'react';
import { Appearance, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '@/constants/Colors';
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import { useAppState, Zone, DonorZone, RecipientZone } from "@/state/Store";
import AddZone from "@/components/forms/AddZone";
import EditDonorZone from "@/components/forms/EditZone";
import Ionicons from "@expo/vector-icons/Ionicons";

//TODO improve styling of ZonesScreen
//TODO add a way to reset all stored zones
//TODO improve zone deletion user experience
//TODO add a way to input IP
//Todo Add a way to send data
//TODO add logo to pdf
Appearance.getColorScheme = () => 'light';

export default function ZonesScreen() {
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const globalState = useAppState();
    const [menuVisible, setMenuVisible] = useState(false);
    const donorZones = globalState.donorZones;
    const recipientZones = globalState.recipientZones;
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);


    useEffect(() => {
        if (!menuVisible) setSelectedZone(null);
    }, [menuVisible]);

    const bottomSheetRefs = {
        addDonor: useRef<BottomSheet>(null),
        addRecipient: useRef<BottomSheet>(null),
        editDonor: useRef<BottomSheet>(null),
        editRecipient: useRef<BottomSheet>(null)
    };

    function openMenu(ref: React.RefObject<BottomSheet>, zone: Zone | null = null) {
        setSelectedZone(zone);
        ref.current?.expand();
        ref.current?.snapToIndex(1);
    }

    function renderZoneItem({ item }: { item: Zone }, ref: React.RefObject<BottomSheet>) {
        return (
            <TouchableOpacity
                style={styles.zoneButton}
                onPress={() => openMenu(ref, item)}
            >
                <Text style={styles.zoneButtonText}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ flex: 1, paddingTop: 70}}>
                <View style={styles.buttonWrapper}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => openMenu(bottomSheetRefs.addDonor)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Add Donor Zones</Text>
                        </View>
                        <FlatList
                            data={donorZones}
                            renderItem={(item) => renderZoneItem(item, bottomSheetRefs.editDonor)}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.flatList}
                            contentContainerStyle={styles.flatListContent}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => openMenu(bottomSheetRefs.addRecipient)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Add Recipient Zones</Text>
                        </View>
                        <FlatList
                            data={recipientZones}
                            renderItem={(item) => renderZoneItem(item, bottomSheetRefs.editRecipient)}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.flatList}
                            contentContainerStyle={styles.flatListContent}
                        />
                    </View>
                </View>
            <View style={{justifyContent: 'center', alignItems: 'center', height: 100}}>
                <TouchableOpacity
                    style={styles.buttonReset}
                    onPress={() => console.log('resets data')}>
                    <Ionicons name="refresh" size={24} color="white" />
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>

            </View>


            <CustomBottomSheet ref={bottomSheetRefs.addDonor} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <AddZone zones={donorZones} zoneType={'donor'} />
            </CustomBottomSheet>

            <CustomBottomSheet ref={bottomSheetRefs.addRecipient} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <AddZone zones={recipientZones} zoneType={'recipient'} />
            </CustomBottomSheet>

            <CustomBottomSheet ref={bottomSheetRefs.editDonor} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <EditDonorZone zone={selectedZone as DonorZone} zones={donorZones} />
            </CustomBottomSheet>

            <CustomBottomSheet ref={bottomSheetRefs.editRecipient} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <EditDonorZone zone={selectedZone as RecipientZone} zones={recipientZones} />
            </CustomBottomSheet>
        </View>

    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        buttonReset: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: colors.primaryBlue,
            borderRadius: 8,
            width: '40%',
        },
        buttonText: {
            color: 'white',
            fontSize: 16,
            marginLeft: 8,
        },


        buttonWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            flex: 1,
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
        zoneListTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.primaryText,
        },
        zoneButton: {
            marginVertical: 5,
            height: 50,
            padding: 10,
            backgroundColor: colors.primaryBlue,
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
            color: colors.solidBackground,
        },
        flatList: {
            flex: 1,
        },
        flatListContent: {
            paddingBottom: 10,
        },
    });
}
