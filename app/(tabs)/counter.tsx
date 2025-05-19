import React, { useState, useEffect, useRef } from 'react';
import {View, TouchableOpacity, Text, useColorScheme, StyleSheet} from 'react-native';
import { Colors } from '@/constants/Colors';
import { isPhone } from '@/constants/DeviceType';
import Icon from 'react-native-vector-icons/Ionicons';
import { DropdownComponent } from '@/components/DropdownComponent';
import { useAppState } from '@/state/Store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomBottomSheet from '@/components/CustomBottomSheet';
import BottomSheet from "@gorhom/bottom-sheet";
import PdfExporter from "@/components/forms/PdfExporter";
import {DonorZone} from "@/types/zones";
import { ScrollView } from 'react-native';


export default function CounterScreen(zones: DonorZone[]) {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(colorScheme);
    const globalState = useAppState();
    const [selectedZone, setSelectedZone] = useState<DonorZone | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isTimesTen, setIsTimesTen] = useState(false);



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

    interface DisplayData {
        donorZone: DonorZone;
        totalSingles: number;
        totalDoubles: number;
        totalTriples: number;
        totalQuadruples: number;
        totalGrafts: number;
        totalHair: number;
        totalHairPerGraftsCounted: number;
    }

    async function sendAsync(selectedZone: DonorZone, ip: string) {

        const displayData: DisplayData = {
            donorZone: selectedZone,
            totalSingles: globalState.totalSingles,
            totalDoubles: globalState.totalDoubles,
            totalTriples: globalState.totalTriples,
            totalQuadruples: globalState.totalQuadruples,
            totalGrafts: globalState.totalGrafts,
            totalHair: globalState.totalHair,
            totalHairPerGraftsCounted: globalState.totalHairPerGraftsCounted,
        }

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
            body: JSON.stringify(displayData),
        };

        try {
            await fetch(url, payload).catch(error => {
                console.error('Error sending data:', error);
            });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }


    function updateZoneCounts(graftType: string, operation: string) {
        if (!selectedZone) return;

        const factor = isTimesTen ? 10 : 1;

        for (let i = 0; i < factor; i++) {
            if (graftType === "single" && operation === "add") selectedZone.singles++;
            else if (graftType === "double" && operation === "add") selectedZone.doubles++;
            else if (graftType === "triple" && operation === "add") selectedZone.triples++;
            else if (graftType === "quad" && operation === "add") selectedZone.quadruples++;

            else if (graftType === "single" && operation === "subtract") {
                if (selectedZone.singles <= 0) break;
                selectedZone.singles--;
            } else if (graftType === "double" && operation === "subtract") {
                if (selectedZone.doubles <= 0) break;
                selectedZone.doubles--;
            } else if (graftType === "triple" && operation === "subtract") {
                if (selectedZone.triples <= 0) break;
                selectedZone.triples--;
            } else if (graftType === "quad" && operation === "subtract") {
                if (selectedZone.quadruples <= 0) break;
                selectedZone.quadruples--;
            }

            if (operation === "add") {
                selectedZone.graftsCounted++;
                selectedZone.hairsCounted += getHairsChanged(graftType, operation);
            } else {
                selectedZone.graftsCounted--;
                selectedZone.hairsCounted += getHairsChanged(graftType, operation);
            }
        }

        selectedZone.hairPerCountedGraft = selectedZone.hairsCounted / selectedZone.graftsCounted || 0;
        globalState.calculateDonorZoneValues(selectedZone);
        globalState.updateTotalCounts();
        globalState.calculateGraftsToExtractLeft(globalState.donorZones);
        globalState.setDonorZones([...globalState.donorZones]);

        sendAsync(selectedZone, globalState.ip);
    }



    function getHairsChanged(graftType: string, operation: string) {
        let hairsChanged = 0;
        if (graftType === "single") hairsChanged = 1;
        else if (graftType === "double") hairsChanged = 2;
        else if (graftType === "triple") hairsChanged = 3;
        else if (graftType === "quad") hairsChanged = 4;
        if (operation === "subtract") hairsChanged *= -1;
        return hairsChanged;
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

    useEffect(() => {
        if (selectedZone) {
            sendAsync(selectedZone, globalState.ip);
        }
    }, [selectedZone]);



    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.softBackground }}>
            <View style={{
                flex: 1,
                paddingTop: 60
            }}>
                    <View style={styles.topContainer}>
                        <View style={{ borderColor: 'black', width: '60%', alignItems: 'center' }}>
                            <DropdownComponent selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
                        </View>

                        <TouchableOpacity style={{ marginRight: '3%' }} onPress={() => setIsTimesTen(prevState => !prevState)}>
                            <FontAwesome
                                name="forward"
                                size={isPhone ? 35 : 50}
                                color={isTimesTen ? Colors.light.primaryBlue : Colors.light.neutralGrey}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginRight: '3%'
                        }} onPress={handleMenuPress}>
                            <FontAwesome
                                name="file-pdf-o"
                                size= { isPhone ? 35 : 50 }
                                color={
                                menuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey
                            } />
                        </TouchableOpacity>

                    </View>

                    {selectedZone ? (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={styles.buttonAreaContainer}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts("single", "subtract")}>
                                        <Icon name="remove-circle" size={isPhone ? 65 : 110} color={Colors.light.primaryBlue} />
                                    </TouchableOpacity>
                                    <Text style={styles.buttonText}>{`Singles ${selectedZone.singles}`}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts("single", "add")}>
                                        <Icon name="add-circle" size={isPhone ? 65 : 110} color={Colors.light.primaryBlue} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts("double", "subtract")}>
                                        <Icon name="remove-circle" size={isPhone ? 65 : 110} color={Colors.light.primaryBlue} />
                                    </TouchableOpacity>
                                    <Text style={styles.buttonText}>{`Doubles ${selectedZone.doubles}`}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts("double", "add")}>
                                        <Icon name="add-circle" size={isPhone ? 65 : 110} color={Colors.light.primaryBlue} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts("triple", "subtract")}>
                                        <Icon name="remove-circle" size={isPhone ? 65 : 110} color={Colors.light.primaryBlue} />
                                    </TouchableOpacity>
                                    <Text style={styles.buttonText}>{`Triples ${selectedZone.triples}`}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts("triple", "add")}>
                                        <Icon name="add-circle" size={isPhone ? 65 : 110} color={Colors.light.primaryBlue} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts("quad", "subtract")}>
                                        <Icon name="remove-circle" size={isPhone ? 65 : 110} color={Colors.light.primaryBlue} />
                                    </TouchableOpacity>
                                    <Text style={styles.buttonText}>{`Quads ${selectedZone.quadruples}`}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => updateZoneCounts("quad", "add")}>
                                        <Icon name="add-circle" size={isPhone ? 65 : 110} color={Colors.light.primaryBlue} />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={styles.outerInfoContainer}>
                                <View style={styles.innerInfoContainer}>
                                    <Text style={styles.infoHeaderText}>Zone Info</Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Grafts count: `}</Text>
                                        <Text style={styles.infoText}>{`${selectedZone.graftsCounted}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Hairs count: `}</Text>
                                        <Text style={styles.infoText}>{`${selectedZone.hairsCounted}`}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Hairs/FU: `}</Text>
                                        <Text style={styles.infoText}>{`${selectedZone.hairPerCountedGraft.toFixed(2)}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Area: `}</Text>
                                        <Text style={styles.infoText}>{`${selectedZone.area} cm²`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{""}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Target: `}</Text>
                                        <Text style={styles.infoText}>{`${selectedZone.graftsToExtract}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Left: `}</Text>
                                        <Text style={styles.infoText}>{`${selectedZone.graftsToExtractLeft}`}</Text>
                                    </View>


                                </View>
                                <View style={styles.innerInfoContainer}>
                                    <Text style={styles.infoHeaderText}>Overall Info</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Total Singles:`}</Text>
                                        <Text style={styles.infoText}>{`${globalState.totalSingles}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Total Doubles:`}</Text>
                                        <Text style={styles.infoText}>{`${globalState.totalDoubles}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Total Triples:`}</Text>
                                        <Text style={styles.infoText}>{`${globalState.totalTriples}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Total Quads:`}</Text>
                                        <Text style={styles.infoText}>{`${globalState.totalQuadruples}`}</Text>
                                    </View>
                                    <Text></Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Grafts count:`}</Text>
                                        <Text style={styles.infoText}>{`${globalState.totalGrafts}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Grafts target:`}</Text>
                                        <Text style={styles.infoText}>{`${globalState.totalGraftsNeeded}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Hairs count:`}</Text>
                                        <Text style={styles.infoText}>{`${globalState.totalHair}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}>{`Hairs target`}</Text>
                                        <Text style={styles.infoText}>{`${Math.round(globalState.totalGraftsNeeded * globalState.averageHairPerGraft)}`}</Text>
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
                    <PdfExporter pdfType="counter" bottomSheetRef={bottomSheetRef} />
                </CustomBottomSheet>
            </View>
        </ScrollView>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {

    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return StyleSheet.create({
        topContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isPhone ? 50 : 100,
            width: '100%',
            paddingHorizontal: '2.5%',
            marginTop: 10,
        },
        buttonAreaContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: colors.themedGrey,
            paddingTop: 5,
            paddingBottom: 5,
        },
        buttonContainer: {
            flexDirection: 'row',
            borderRadius: 12,
            margin: isPhone ? 8 : 16,
            width: '95%',
            height: isPhone ? 70 : 110,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.solidBackground,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            borderWidth: 1,
            borderColor: colors.themedGrey,
        },
        button: {
            marginHorizontal: '5%',
            backgroundColor: colors.solidBackground,
        },
        buttonText: {
            color: colors.primaryText,
            fontSize: isPhone ? 25 : 45,
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
            width: isPhone ? '97%' : '97.5%',
        },
        innerInfoContainer: {
            paddingHorizontal: '2%',
            paddingVertical: '3%',
            marginHorizontal: isPhone ? '1%' : '1.5%',
            marginVertical: '1%',
            borderWidth: 1,
            borderColor: colors.themedGrey,
            borderRadius: 12,
            flex: 1,
            backgroundColor: colors.solidBackground,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },
        infoText: {
            width: '60%',
            color: colors.primaryText,
            fontSize: isPhone ? 14 : 28
        },
        infoHeaderText: {
            width: '60%',
            color: colors.primaryText,
            fontWeight: 'bold',
            fontSize: isPhone ? 14 : 28

        },
    });
}



