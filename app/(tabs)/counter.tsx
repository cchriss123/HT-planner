import React, { useState, useEffect, useRef } from 'react';
import {View, TouchableOpacity, Text, useColorScheme, StyleSheet} from 'react-native';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { DropdownComponent } from '@/components/DropdownComponent';
import { useAppState, DonorZone } from '@/state/Store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomBottomSheet from '@/components/CustomBottomSheet';
import BottomSheet from "@gorhom/bottom-sheet";
import PdfExporter from "@/components/PdfExporter";

export default function CounterScreen() {
    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme);
    const globalState = useAppState();
    const [selectedZone, setSelectedZone] = useState<DonorZone | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [menuVisible, setMenuVisible] = useState(false);


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

    async function sendAsync(selectedZone: DonorZone, ip: string) {

        // const ip = '192.168.0.28';

        if (!ip){
            console.log('No IP address provided');
            return;

        }
        const url = `http://${ip}:8080/api/counter`;

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedZone),
        };

        try {
            await fetch(url, payload).catch(error => {
                console.error('Error sending data:', error);
            });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }



    function updateZoneCounts(value: number) {
        if (!selectedZone) return;
        if (value > 4) return;

        if (value === 1) selectedZone.singles++;
        else if (value === 2) selectedZone.doubles++;
        else if (value === 3) selectedZone.triples++;
        else if (value === 4) selectedZone.quadruples++;
        else if (value === -1) {
            if (selectedZone.singles <= 0) return;
            selectedZone.singles--;
        } else if (value === -2) {
            if (selectedZone.doubles <= 0) return;
            selectedZone.doubles--;
        } else if (value === -3) {
            if (selectedZone.triples <= 0) return;
            selectedZone.triples--;
        } else if (value === -4) {
            if (selectedZone.quadruples <= 0) return;
            selectedZone.quadruples--;
        }

        value > 0 ? selectedZone.grafts++ : selectedZone.grafts--;
        selectedZone.hairs += value;
        selectedZone.hairPerCountedGraft = selectedZone.hairs / selectedZone.grafts || 0;

        globalState.calculateDonorZoneValues(selectedZone);
        globalState.updateTotalCounts();
        globalState.setDonorZones([...globalState.donorZones]);

        sendAsync(selectedZone, globalState.ip);


    }

    useEffect(() => {
        if (!selectedZone && globalState.donorZones.length > 0) {
            setSelectedZone(globalState.donorZones[0]);
        } else if (selectedZone) {
            const zoneExists = globalState.donorZones.some(zone => zone === selectedZone);
            if (!zoneExists) {
                setSelectedZone(globalState.donorZones.length > 0 ? globalState.donorZones[0] : null);
            }
        }
    }, [globalState.donorZones]);


    return (
        <View style={{ flex: 1, paddingTop: 70 }}>
                <View style={styles.topContainer}>
                    <View style={{ borderColor: 'black', width: '60%', alignItems: 'center' }}>
                        <DropdownComponent selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
                    </View>
                    <TouchableOpacity style={{ marginHorizontal: "5%" }} onPress={handleMenuPress}>
                        <FontAwesome gear="setting" size={35} color={
                            menuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey
                        } name="gear" />
                    </TouchableOpacity>
                </View>

                {selectedZone ? (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.buttonAreaContainer}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(-1)}>
                                    <Icon name="remove-circle" size={65} color={Colors.light.primaryBlue} />
                                </TouchableOpacity>
                                <Text style={styles.buttonText}>{`Singles ${selectedZone.singles}`}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(1)}>
                                    <Icon name="add-circle" size={65} color={Colors.light.primaryBlue} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(-2)}>
                                    <Icon name="remove-circle" size={65} color={Colors.light.primaryBlue} />
                                </TouchableOpacity>
                                <Text style={styles.buttonText}>{`Doubles ${selectedZone.doubles}`}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(2)}>
                                    <Icon name="add-circle" size={65} color={Colors.light.primaryBlue} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(-3)}>
                                    <Icon name="remove-circle" size={65} color={Colors.light.primaryBlue} />
                                </TouchableOpacity>
                                <Text style={styles.buttonText}>{`Triples ${selectedZone.triples}`}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(3)}>
                                    <Icon name="add-circle" size={65} color={Colors.light.primaryBlue} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(-4)}>
                                    <Icon name="remove-circle" size={65} color={Colors.light.primaryBlue} />
                                </TouchableOpacity>
                                <Text style={styles.buttonText}>{`Quads ${selectedZone.quadruples}`}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts(4)}>
                                    <Icon name="add-circle" size={65} color={Colors.light.primaryBlue} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.outerInfoContainer}>
                            <View style={styles.innerInfoContainer}>
                                <Text style={{ fontWeight: 'bold' }}>Zone Info</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Grafts count: `}</Text>
                                    <Text>{`${selectedZone.grafts}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Hairs count: `}</Text>
                                    <Text>{`${selectedZone.hairs}`}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Hairs/FU: `}</Text>
                                    <Text>{`${selectedZone.hairPerCountedGraft.toFixed(2)}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Area: `}</Text>
                                    <Text>{`${selectedZone.area} cm²`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>{""}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Target: `}</Text>
                                    <Text>{`${selectedZone.graftsExtractedToReachDonorDesiredCoverageValue}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Left: `}</Text>
                                    <Text>{`${selectedZone.graftsLeftToReachDonorDesiredCoverageValue}`}</Text>
                                </View>


                            </View>
                            <View style={styles.innerInfoContainer}>
                                <Text style={{ fontWeight: 'bold' }}>Overall Info</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Total Singles:`}</Text>
                                    <Text>{`${globalState.totalSingles}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Total Doubles:`}</Text>
                                    <Text>{`${globalState.totalDoubles}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Total Triples:`}</Text>
                                    <Text>{`${globalState.totalTriples}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Total Quads:`}</Text>
                                    <Text>{`${globalState.totalQuadruples}`}</Text>
                                </View>
                                <Text></Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Total Grafts:`}</Text>
                                    <Text>{`${globalState.totalGrafts}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Total Hair:`}</Text>
                                    <Text>{`${globalState.totalHair}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>{`Total Hair/FU:`}</Text>
                                    <Text>{`${globalState.totalHairPerGraftsCounted.toFixed(2)}`}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.countContainer}>
                            <Text style={{ fontSize: 30, color: Colors.light.primaryText }}>Please add a zone</Text>
                        </View>
                    </View>
                )}

            <CustomBottomSheet ref={bottomSheetRef} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <PdfExporter pdfType="counter" />
            </CustomBottomSheet>
        </View>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return StyleSheet.create({
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
        buttonAreaContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: 'lightgrey',
            paddingTop: 5,
            paddingBottom: 5,
        },
        buttonContainer: {
            flexDirection: 'row',
            borderRadius: 12,
            margin: 8,
            width: '95%',
            height: 70,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.solidBackground,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            borderWidth: 1,
            borderColor: 'lightgrey',
        },
        button: {
            marginHorizontal: '5%',
            backgroundColor: colors.solidBackground,
        },
        buttonText: {
            color: colors.primaryText,
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        countContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 50,
        },
        mediumText: {
            fontSize: 25,
            color: colors.primaryText,
            fontWeight: 'bold',
        },
        outerInfoContainer: {
            flexDirection: 'row',
            width: '97%',
        },
        innerInfoContainer: {
            paddingHorizontal: '2%',
            paddingVertical: '3%',
            margin: '0.5%',
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 12,
            flex: 1,
            backgroundColor: colors.solidBackground,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },
        infoText: {
            width: '60%',

        }
    });

}
