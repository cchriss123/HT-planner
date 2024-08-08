import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Appearance, FlatList} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import PdfExporter from "@/components/PdfExporter";
import {Colors} from "@/constants/Colors";
import {useAppState, Zone, DonorZone, RecipientZone} from "@/state/Store";
import BottomSheet from "@gorhom/bottom-sheet";
import { Collapsible } from '@/components/Collapsible';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomBottomSheet from "@/components/CustomBottomSheet";


export default function CalculatorScreen() {
    const [activeTab, setActiveTab] = useState<string>('Donor Zones');
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const globalState = useAppState();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const donorZones = globalState.donorZones;
    const recipientZones = globalState.recipientZones;

    function handleMenuPress() {
        if (menuVisible) {
            setMenuVisible(false);
            bottomSheetRef.current?.close();
        } else {
            setMenuVisible(true);
            bottomSheetRef.current?.expand();
            bottomSheetRef.current?.snapToIndex(2);
        }
    }

    function handleTabChange(tab: string) {
        setActiveTab(tab);
    }

    function renderDonorZoneItem({ item }: { item: DonorZone }) {
        return (
            <View style={styles.zoneItem}>

                <Collapsible title={item.name}>
                    <Text style={styles.zoneButtonText}>Caliber: {item.caliber}</Text>
                    <Text style={styles.zoneButtonText}>Hair per cm²: {item.hairPerCm2}</Text>
                    <Text style={styles.zoneButtonText}>Grafts per cm²: {item.graftsPerCm2}</Text>
                    <Text style={styles.zoneButtonText}>Desired coverage value: {item.desiredCoverageValue}</Text>
                </Collapsible>






                <Text style={styles.zoneButtonText}>Area {item.area}</Text>
                <Text style={styles.zoneButtonText}>Coverage Value: {item.coverageValue}</Text>
                <Text style={styles.zoneButtonText}>Total Grafts:{item.graftsPerZone}</Text>
                <Text style={styles.zoneButtonText}>Available for extraction:{item.graftsLeftToReachDonorDesiredCoverageValue}</Text>
            </View>
        );
    }

    function renderRecipientZoneItem({ item }: { item: RecipientZone }) {
        return (
            <View style={styles.zoneItem}>
                <Collapsible title={item.name}>
                    <Text style={styles.zoneButtonText}>Caliber: {item.caliber}</Text>
                    <Text style={styles.zoneButtonText}>Hair per cm²: {item.hairPerCm2}</Text>
                    <Text style={styles.zoneButtonText}>Grafts per cm²: {item.graftsPerCm2}</Text>
                    <Text style={styles.zoneButtonText}>Desired coverage value: {item.desiredCoverageValue}</Text>
                </Collapsible>

                <Text style={styles.zoneButtonText}>Area {item.area}</Text>
                <Text style={styles.zoneButtonText}>Current grafts: {item.grafts}</Text>
                <Text style={styles.zoneButtonText}>Grafts needed: {item.graftsImplantedToReachDesiredRecipientCoverageValue}</Text>
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
                <TouchableOpacity style={{ marginHorizontal: "5%" }} onPress={handleMenuPress}>
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
                        style={{ alignSelf: 'center', paddingHorizontal: '2.5%' }}

                    />


                )}
                {activeTab === 'Recipient Zones' && (
                    <FlatList
                        data={recipientZones}
                        renderItem={renderRecipientZoneItem}
                        keyExtractor={(item) => item.name}
                        style={{alignSelf: 'center', paddingHorizontal: '2.5%'}}
                    />

                )}
            </View>
            <CustomBottomSheet ref={bottomSheetRef} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <PdfExporter pdfType="calculator" />


            </CustomBottomSheet>
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
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: 'lightgrey',
            paddingTop: 5,
            paddingBottom: 70,
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

