import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Appearance, FlatList} from 'react-native';
import PdfExporter from "@/components/PdfExporter";
import {Colors} from "@/constants/Colors";
import {useAppState, DonorZone, RecipientZone} from "@/state/Store";
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
            console.log(globalState.averageDonorCaliber);
        }
    }

    function handleTabChange(tab: string) {
        setActiveTab(tab);
    }

    function renderDonorZoneItem({ item }: { item: DonorZone }) {
        return (
            <View style={styles.zoneItem}>

                <Collapsible title={item.name}>
                    <View style={styles.row}>
                        <View style={styles.leftColumn}>
                            <Text>Caliber:</Text>
                            <Text>Hair per cm²:</Text>
                            <Text>Grafts per cm²:</Text>
                            <Text>Desired coverage value:</Text>
                        </View>
                        <View style={styles.rightColumn}>
                            <Text>{item.caliber}</Text>
                            <Text>{item.hairPerCm2}</Text>
                            <Text>{item.graftsPerCm2}</Text>
                            <Text>{item.desiredCoverageValue}</Text>
                        </View>
                    </View>
                </Collapsible>

                <View style={styles.row}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.zoneButtonText}>Area:</Text>
                        <Text style={styles.zoneButtonText}>Coverage Value:</Text>
                        <Text style={styles.zoneButtonText}>Total Grafts:</Text>
                        <Text style={styles.zoneButtonText}>Available for extraction:</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.zoneButtonText}>{item.area} cm²</Text>
                        <Text style={styles.zoneButtonText}>{item.coverageValue.toFixed(2)}</Text>
                        <Text style={styles.zoneButtonText}>{item.graftsPerZone}</Text>
                        <Text style={styles.zoneButtonText}>{item.graftsLeftToReachDonorDesiredCoverageValue}</Text>
                    </View>
                </View>

            </View>
        );
    }

    function renderRecipientZoneItem({ item }: { item: RecipientZone }) {
        return (
            <View style={styles.zoneItem}>
                <Collapsible title={item.name}>
                    <View style={styles.row}>
                        <View style={styles.leftColumn}>
                            <Text>Caliber:</Text>
                            <Text>Hair per cm²:</Text>
                            <Text>Grafts per cm²:</Text>
                            <Text>Desired coverage value:</Text>
                        </View>
                        <View style={styles.rightColumn}>
                            <Text>{item.caliber}</Text>
                            <Text>{item.hairPerCm2}</Text>
                            <Text>{item.graftsPerCm2}</Text>
                            <Text>{item.desiredCoverageValue}</Text>
                        </View>
                    </View>
                </Collapsible>

                <View style={styles.row}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.zoneButtonText}>Area:</Text>
                        <Text style={styles.zoneButtonText}>Current grafts:</Text>
                        <Text style={styles.zoneButtonText}>Grafts needed:</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.zoneButtonText}>{item.area} cm²</Text>
                        <Text style={styles.zoneButtonText}>{item.grafts}</Text>
                        <Text style={styles.zoneButtonText}>{item.graftsImplantedToReachDesiredRecipientCoverageValue}</Text>
                    </View>
                </View>

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
                <TouchableOpacity style={{marginRight: '3%'}} onPress={handleMenuPress}>
                    <FontAwesome name="file-pdf-o" size={35} color={
                        menuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey
                    } />
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
                <PdfExporter pdfType="calculator" bottomSheetRef={bottomSheetRef} />
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
            width: '100%', // Ensures the container takes full width of the screen
            paddingHorizontal: 10, // Add padding to the sides for better alignment
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
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        leftColumn: {
            flex: 3,
            padding: 5,
            marginLeft: 20,
        },
        rightColumn: {
            flex: 2,
            padding: 5,
        },
        zoneButtonText: {
            fontSize: 16,
            marginVertical: 3,
        },
    });
}
