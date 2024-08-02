import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Appearance, FlatList} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import PdfExporter from "@/components/PdfExporter";
import {Colors} from "@/constants/Colors";
import {useAppState, Zone, DonorZone, RecipientZone} from "@/state/Store";
import BottomSheet from "@gorhom/bottom-sheet";
import { Collapsible } from '@/components/Collapsible';


export default function CalculatorScreen() {
    const [activeTab, setActiveTab] = useState<string>('Donor Zones');
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const globalState = useAppState();

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
                    <Text style={styles.tabText}>Donor Zones</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Recipient Zones' && styles.activeTab]}
                    onPress={() => handleTabChange('Recipient Zones')}
                >
                    <Text style={styles.tabText}>Recipient Zones</Text>
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
                        <Text>Content for Recipient Zones</Text>
                        {/* Add your Tab 2 content here */}
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
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
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

