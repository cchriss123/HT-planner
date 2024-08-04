import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Appearance, FlatList} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import PdfExporter from "@/components/PdfExporter";
import {Colors} from "@/constants/Colors";
import {useAppState, Zone, DonorZone, RecipientZone} from "@/state/Store";
import BottomSheet from "@gorhom/bottom-sheet";
import { Collapsible } from '@/components/Collapsible';
import FontAwesome from "@expo/vector-icons/FontAwesome";


export default function CalculatorScreen() {
    const [activeTab, setActiveTab] = useState<string>('Donor Zones');
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const globalState = useAppState();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [menuVisible, setMenuVisible] = useState(false);

    function openMenu() {
        setMenuVisible(true);
        bottomSheetRef.current?.expand();
        bottomSheetRef.current?.snapToIndex(2);
    }




    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const donorZones = globalState.donorZones;
    const recipientZones = globalState.recipientZones;

    function handleTabChange(tab: string) {
        setActiveTab(tab);
    }

    function renderDonorZoneItem({ item }: { item: DonorZone }) {
        return (
            <View style={styles.zoneItem}>

                <Collapsible title={item.name}>

                    <Text style={styles.zoneButtonText}>Text</Text>
                    <Text>text</Text>
                    <Text>text</Text>

                    <Text>text</Text>
                </Collapsible>

                <Text>Area {item.area}</Text>
                <Text>Coverage Value: {item.coverageValue}</Text>
                <Text>Total Grafts:{item.graftsPerZone}</Text>
                <Text>Available for extraction:{item.graftsLeftToReachDonorDesiredCoverageValue}</Text>



            </View>
        );
    }




    return (
        <View style={{ flex: 1, paddingTop: 70}}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Donor Zones' && styles.activeTab]}
                    onPress={() => handleTabChange('Donor Zones')}
                >
                    <Text style={styles.tabText}>Donor Areas</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Recipient Zones' && styles.activeTab]}
                    onPress={() => handleTabChange('Recipient Zones')}
                >
                    <Text style={styles.tabText}>Recipient Areas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: "5%" }} onPress={openMenu}>
                    <FontAwesome gear="setting" size={35} color={
                        menuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey
                    } name="gear" />
                </TouchableOpacity>
            </View>

            <View style={styles.outerContainer}>
                {activeTab === 'Donor Zones' && (
                    <FlatList
                        data={donorZones}
                        renderItem={renderDonorZoneItem}
                        keyExtractor={(item) => item.name}
                        style={{ width: '95%', alignSelf: 'center' }}
                    />


                )}
                {activeTab === 'Recipient Zones' && (
                        <View>
                            <Text>Recipient Zones</Text>
                        </View>
                )}
            </View>
        </View>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return StyleSheet.create({
        tabContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            width: '95%',
            paddingBottom: '5%',
            marginHorizontal: '2.5%',
            marginTop: 10,
        },
        tabButton: {
            padding: 10,
        },
        activeTab: {
            borderBottomWidth: 2,
            borderBottomColor: colors.primaryBlue,
        },
        tabText: {
            fontSize: 16,
        },
        outerContainer: {
            flex: 1,
            height: '100%',
            borderWidth: 1,
            borderColor: 'lightgrey',
        },
        zoneItem: {
            padding: 10,
            borderRadius: 12,
            marginVertical: 10,
            width: '100%',
            justifyContent: 'space-between',
            backgroundColor: colors.solidBackground,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            borderWidth: 1,
            borderColor: 'lightgrey',

        },
        zoneButtonText: {

        },


    });
    }

