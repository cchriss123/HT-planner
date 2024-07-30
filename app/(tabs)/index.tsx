import React, {useState, useRef, useEffect} from 'react';
import { Appearance, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomSheet from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/Ionicons";
import logoImg from '@/assets/images/logo.png';
import CustomBottomSheet from "@/components/CustomBottomSheet";
import { useAppState, Zone, DonorZone, RecipientZone } from "@/state/Store";
import AddZone from "@/components/forms/AddZone";
import EditDonorZone from "@/components/forms/EditZone";
//TODO make this scrollable

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

    function DonorZoneComponents() {
        return donorZones.map((zone, i) => (
            <TouchableOpacity
                key={i}
                style={styles.zoneButton}
                onPress={() => openMenu(bottomSheetRefs.editDonor, zone)}
            >
                <Text style={styles.zoneButtonText}>{zone.name}</Text>
            </TouchableOpacity>
        ));
    }

    function RecipientZoneComponents() {
        return recipientZones.map((zone, i) => (
            <TouchableOpacity
                key={i}
                style={styles.zoneButton}
                onPress={() => openMenu(bottomSheetRefs.editRecipient, zone)}
            >
                <Text style={styles.zoneButtonText}>{zone.name}</Text>
            </TouchableOpacity>
        ));
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.buttonWrapper}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => openMenu(bottomSheetRefs.addDonor)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Add Donor Zones</Text>
                        </View>
                        <DonorZoneComponents />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => openMenu(bottomSheetRefs.addRecipient)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Add Recipient Zones</Text>
                        </View>
                        <RecipientZoneComponents />
                    </View>
                </View>
            </ScrollView>

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
            paddingTop: 10,
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
    });
}
