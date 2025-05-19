import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Appearance, FlatList} from 'react-native';
import PdfExporter from "@/components/forms/PdfExporter";
import {Colors} from "@/constants/Colors";
import {useAppState} from "@/state/Store";
import BottomSheet from "@gorhom/bottom-sheet";
import { Collapsible } from '@/components/Collapsible';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import { isPhone } from '@/constants/DeviceType';
import {DonorZone, RecipientZone} from "@/types/zones";
import { calculateTotalGrafts } from "@/calculations/calculations";


export default function CalculatorScreen() {
    const [activeTab, setActiveTab] = useState<string>('Donor Zones');
    const colorScheme = Appearance.getColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
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
        }
    }

    function handleTabChange(tab: string) {
        setActiveTab(tab);
    }

    function renderDonorZoneItem({ item }: { item: DonorZone }) {
        return (
            <View style={styles.zoneItem}>
                <Collapsible title={item.name} >
                    <View style={styles.row}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.zoneButtonHiddenText}>Caliber:</Text>
                            <Text style={styles.zoneButtonHiddenText}>Hair per cm²:</Text>
                            <Text style={styles.zoneButtonHiddenText}>Grafts per cm²:</Text>
                            <Text style={styles.zoneButtonHiddenText}>Desired coverage value:</Text>
                            <Text style={styles.zoneButtonHiddenText}>Follicular Units in Zone:</Text>
                        </View>
                        <View style={styles.rightColumn}>
                            <Text style={styles.zoneButtonHiddenText}>{item.caliber}</Text>
                            <Text style={styles.zoneButtonHiddenText}>{item.hairPerCm2}</Text>
                            <Text style={styles.zoneButtonHiddenText}>{item.graftsPerCm2}</Text>
                            <Text style={styles.zoneButtonHiddenText}>{item.minimumCoverageValue}</Text>
                            <Text style={styles.zoneButtonHiddenText}>{Math.round(item.graftsInZone)}</Text>

                        </View>
                    </View>
                </Collapsible>

                <View style={styles.row}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.zoneButtonText}>Area:</Text>
                        <Text style={styles.zoneButtonText}>Coverage Value:</Text>
                        <Text style={styles.zoneButtonText}>Available for extraction:</Text>
                        <Text style={styles.zoneButtonText}>Grafts to extract:</Text>
                    </View>

                    <View style={styles.rightColumn}>
                        <Text style={styles.zoneButtonText}>{item.area} cm²</Text>
                        <Text style={styles.zoneButtonText}>{item.coverageValue.toFixed(2)}</Text>
                        <Text style={styles.zoneButtonText}>{Math.round(item.availableForExtraction)}</Text>

                        <Text style={[styles.zoneButtonText, item.graftsToExtract > item.availableForExtraction ? { color: 'red', fontWeight: 'bold' } : {}]}>
                            <Text>
                                {item.graftsToExtract} ({(item.graftsToExtract / item.area).toFixed(1)} /cm²)
                            </Text>
                        </Text>

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
                            <Text style={styles.zoneButtonHiddenText}>Caliber:</Text>
                            <Text style={styles.zoneButtonHiddenText}>Hair per cm²:</Text>
                            <Text style={styles.zoneButtonHiddenText}>Grafts per cm²:</Text>
                            <Text style={styles.zoneButtonHiddenText}>Desired coverage value:</Text>
                        </View>
                        <View style={styles.rightColumn}>
                            <Text style={styles.zoneButtonHiddenText}>{item.caliber}</Text>
                            <Text style={styles.zoneButtonHiddenText}>{item.hairPerCm2}</Text>
                            <Text style={styles.zoneButtonHiddenText}>{item.graftsPerCm2}</Text>
                            <Text style={styles.zoneButtonHiddenText}>{item.desiredCoverageValue}</Text>
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
                        <Text style={styles.zoneButtonText}>{Math.round(item.grafts)}</Text>
                        <Text style={styles.zoneButtonText}>{Math.round(item.graftsImplantedToReachRecipientDesiredCoverageValue)}</Text>

                    </View>
                </View>

            </View>
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.softBackground }}>

            <View style={{ flex: 1, paddingTop: 60}}>
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
                        <FontAwesome
                            name="file-pdf-o"
                            size= { isPhone ? 35 : 50 }
                            color={
                                menuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey
                            } />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: colors.themedGrey }}>
                    <View style={styles.statsContainer}>
                        <Text style={styles.statsLabel}>Summary</Text>
                        <View style={styles.row}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.zoneButtonText}>Total donor grafts:</Text>
                                <Text style={styles.zoneButtonText}>Extractable grafts:</Text>
                                <Text style={styles.zoneButtonText}>Recipient needs:</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text style={styles.zoneButtonText}>
                                    {calculateTotalGrafts(donorZones)}
                                </Text>
                                <Text style={styles.zoneButtonText}>{globalState.totalDonorExtractable}</Text>
                                <Text style={styles.zoneButtonText}>{globalState.totalGraftsNeeded}</Text>
                            </View>
                        </View>
                    </View>
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
            height: isPhone ? 50 : 100,
            width: '100%',
            paddingHorizontal: isPhone ? 10 : 20,
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
            fontSize: isPhone ? 16 : 24,
            color: colors.primaryText,
        },
        outerContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: colors.themedGrey,
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
            borderColor: colors.themedGrey,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        leftColumn: {
            flex: 3,
            padding: '1%',
            marginLeft: '2.5%',
        },
        rightColumn: {
            flex: 2,
            padding: '1%',
        },
        zoneButtonText: {
            fontSize: isPhone ? 16 : 20,
            marginVertical: 3,
            color: colors.primaryText
        },
        zoneButtonHiddenText: {
            color: colors.primaryText,
            fontSize: isPhone ? 14 : 18,
        },
        statsContainer: {
            backgroundColor: colors.solidBackground,
            borderRadius: 12,
            paddingVertical: 10,
            marginVertical: 5,
            marginHorizontal: '2.5%',
            width: '100%',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            borderWidth: 1,
            borderColor: colors.themedGrey,
        },
        statsLabel: {
            fontSize: isPhone ? 16 : 20,
            fontWeight: '600',
            marginVertical: 5,
            color: colors.primaryText,
            marginLeft: '3.5%',
        },
    });
}
