import React, { useState, useRef, useEffect } from 'react';
import {Appearance, StyleSheet, Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import { Colors } from '@/constants/Colors';
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import { useAppState, Zone, DonorZone, RecipientZone } from "@/state/Store";
import AddZone from "@/components/forms/AddZone";
import EditDonorZone from "@/components/forms/EditZone";
import Ionicons from "@expo/vector-icons/Ionicons";
import logoImg from '@/assets/images/logo.png';
import FontAwesome from "@expo/vector-icons/FontAwesome";



//TODO add recipient zones to calculator screen
//TODO fix area styling on calculator screen
//TODO makes sure values are correct in calculator screen
//TODO improve styling of ZonesScreen
//TODO add a way to reset all stored zones
//TODO add a way to input IP
//TODO Add a way to send data
//TODO add logo to pdf
//TODO add different pdfs
//TODO go over colour themes
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
    const [wheelMenuVisible, setWheelMenuVisible] = useState(false);
    const wheelBottomSheetRef = useRef<BottomSheet>(null);





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
    function handleMenuPress(
        menuVisible: boolean,
        setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
        ref: React.RefObject<BottomSheet>,
        zone: Zone | null = null
    ) {
        if (menuVisible) {
            setMenuVisible(false);
            ref.current?.close();
        } else {
            setSelectedZone(zone);
            setMenuVisible(true);
            ref.current?.expand();
        }
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
            borderTopWidth: 1,
            borderColor: 'lightgrey',
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
        topContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            width: '100%',
            paddingBottom: '5%',
            marginTop: 10,

        },
        placeholderContainer: {
            width: 58.5,
        },
        logo: {
            width: 35,
            height: 35,
            resizeMode: 'contain',
        },


    });
}

// import React, { useState, useRef } from 'react';
// import { Appearance, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Colors } from '@/constants/Colors';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import BottomSheet from "@gorhom/bottom-sheet";
// import Icon from "react-native-vector-icons/Ionicons";
// import logoImg from '@/assets/images/logo.png';
// import CustomBottomSheet from "@/components/CustomBottomSheet";
// import {useAppState, Zone} from "@/state/Store";
// import AddDonorZone from "@/components/forms/AddDonorZone";
// import AddRecipientZone from "@/components/forms/AddRecipientZone";
//
// Appearance.getColorScheme = () => 'light';
//
//
//
// export default function ZonesScreen() {
//     const colorScheme = Appearance.getColorScheme();
//     const styles = createStyles(colorScheme);
//     const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
//     const globalState = useAppState();
//
//     const donorZones = globalState.donorZones;
//     const recipientZones = globalState.recipientZones;
//     const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
//
//
//     const [wheelMenuVisible, setWheelMenuVisible] = useState(false);
//     const [addDonorMenuVisible, setAddDonorMenuVisible] = useState(false);
//     const [addRecipientMenuVisible, setAddRecipientMenuVisible] = useState(false);
//     const [editDonorZoneVisible, setEditDonorZoneVisible] = useState(false);
//     const [editRecipientZoneVisible, setEditRecipientZoneVisible] = useState(false);
//
//     const wheelBottomSheetRef = useRef<BottomSheet>(null);
//     const addDonorBottomSheetRef = useRef<BottomSheet>(null);
//     const addRecipientBottomSheetRef = useRef<BottomSheet>(null);
//     const editDonorZoneBottomSheetRef = useRef<BottomSheet>(null);
//     const editRecipientZoneBottomSheetRef = useRef<BottomSheet>(null);
//
//
//     function handleMenuPress(
//         menuVisible: boolean,
//         setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
//         bottomSheetRef: React.RefObject<BottomSheet>,
//         zone: Zone | null = null
//     ) {
//         if (menuVisible) {
//             setMenuVisible(false);
//             bottomSheetRef.current?.close();
//         } else {
//             setSelectedZone(zone);
//             setMenuVisible(true);
//             bottomSheetRef.current?.expand();
//         }
//     }
//
//     function handleSheetClose(setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>) {
//         setMenuVisible(false);
//     }
//
//     function DonorZoneComponents() {
//         return donorZones.map((zone: Zone, i: number) => <TouchableOpacity
//             key={i}
//             style={styles.zoneButton}
//             onPress={() => handleMenuPress(
//                 editDonorZoneVisible,
//                 setEditDonorZoneVisible,
//                 editDonorZoneBottomSheetRef,
//                 zone
//             )}
//         >
//             <Text style={styles.zoneButtonText}>{zone.name}</Text>
//         </TouchableOpacity>);
//     }
//
//     function RecipientZoneComponents() {
//         return recipientZones.map((zone: Zone, i: number) => <TouchableOpacity
//             key={i}
//             style={styles.zoneButton}
//             onPress={() => handleMenuPress(
//                 editRecipientZoneVisible,
//                 setEditRecipientZoneVisible,
//                 editRecipientZoneBottomSheetRef,
//                 zone
//             )}
//         >
//             <Text style={styles.zoneButtonText}>{zone.name}</Text>
//         </TouchableOpacity>);
//     }
//
//     return (
//         <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
//             <ScrollView contentContainerStyle={styles.outerContainer}>
//                 <View style={styles.topContainer}>
//                     <View style={styles.placeholderContainer} />
//                     <View style={{ flex: 1, alignItems: 'center' }}>
//                         <Image source={logoImg} style={styles.logo} />
//                     </View>
//                     <TouchableOpacity
//                         style={styles.placeholderContainer}
//                         onPress={() => handleMenuPress(wheelMenuVisible, setWheelMenuVisible, wheelBottomSheetRef)}
//                     >
//                         <FontAwesome gear="setting" size={35} color={wheelMenuVisible ? Colors.light.primaryBlue : Colors.light.neutralGrey} name="gear" />
//                     </TouchableOpacity>
//                 </View>
//
//                 <View style={styles.buttonWrapper}>
//                     <View style={styles.buttonContainer}>
//                         <View style={styles.button}>
//                             <TouchableOpacity onPress={() => handleMenuPress(addDonorMenuVisible, setAddDonorMenuVisible, addDonorBottomSheetRef)}>
//                                 <Icon name="add-circle" size={65} color={colors.primaryBlue} />
//                             </TouchableOpacity>
//                             <Text style={styles.zoneListTitle}>Donor Zones</Text>
//                         </View>
//                         <DonorZoneComponents/>
//                     </View>
//
//                     <View style={styles.buttonContainer}>
//                         <View style={styles.button}>
//                             <TouchableOpacity onPress={() => handleMenuPress(addRecipientMenuVisible, setAddRecipientMenuVisible, addRecipientBottomSheetRef)}>
//                                 <Icon name="add-circle" size={65} color={colors.primaryBlue} />
//                             </TouchableOpacity>
//                             <Text style={styles.zoneListTitle}>Recipient Zones</Text>
//                         </View>
//
//                         <RecipientZoneComponents/>
//                     </View>
//                 </View>
//             </ScrollView>
//
//             <CustomBottomSheet ref={wheelBottomSheetRef} onClose={() => handleSheetClose(setWheelMenuVisible)}>
//                 <Text>Wheel Menu Content</Text>
//             </CustomBottomSheet>
//             <CustomBottomSheet ref={addDonorBottomSheetRef} onClose={() => handleSheetClose(setAddDonorMenuVisible)}>
//                 <Text>Add Donor Zone Menu Content</Text>
//                 <AddDonorZone zones={donorZones} />
//             </CustomBottomSheet>
//             <CustomBottomSheet ref={addRecipientBottomSheetRef} onClose={() => handleSheetClose(setAddRecipientMenuVisible)}>
//                 <Text>Add Recipient Menu Content</Text>
//                 <AddRecipientZone zones={recipientZones} />
//             </CustomBottomSheet>
//             <CustomBottomSheet ref={editDonorZoneBottomSheetRef} onClose={() => handleSheetClose(setEditDonorZoneVisible)}>
//                 <Text>Edit Donor Zone Menu for {selectedZone?.name}</Text>
//             </CustomBottomSheet>
//             <CustomBottomSheet ref={editRecipientZoneBottomSheetRef} onClose={() => handleSheetClose(setEditRecipientZoneVisible)}>
//                 <Text>Edit Recipient Zone Menu for {selectedZone?.name}</Text>
//             </CustomBottomSheet>
//
//         </SafeAreaView>
//     );
// }
//
// function createStyles(colorScheme: "light" | "dark" | null | undefined) {
//     const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
//
//     return StyleSheet.create({
//         outerContainer: {
//             flex: 1,
//             backgroundColor: colors.softBackground,
//         },
//         topContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             height: 60,
//             width: '95%',
//             paddingBottom: '5%',
//             marginHorizontal: '2.5%',
//             marginTop: 10,
//         },
//         placeholderContainer: {
//             width: 50,
//         },
//         logo: {
//             width: 35,
//             height: 35,
//             resizeMode: 'contain',
//         },
//         buttonWrapper: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             borderTopWidth: 1,
//             borderColor: 'lightgrey',
//             paddingTop: 20,
//         },
//         buttonContainer: {
//             flex: 1,
//             marginHorizontal: 10,
//         },
//         button: {
//             padding: 10,
//             backgroundColor: colors.solidBackground,
//             borderRadius: 8,
//             marginBottom: 10,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 5,
//             elevation: 5,
//             alignItems: 'center',
//         },
//         buttonText: {
//             color: colors.solidBackground,
//             fontSize: 16,
//         },
//         zoneListTitle: {
//             fontSize: 18,
//             fontWeight: 'bold',
//             marginBottom: 10,
//             color: colors.primaryText,
//         },
//         zoneButton: {
//             marginVertical: 5,
//             height: 50,
//             padding: 10,
//             backgroundColor: colors.solidBackground,
//             borderRadius: 8,
//             marginBottom: 10,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 5,
//             elevation: 5,
//             alignItems: 'center',
//             justifyContent: 'center',
//         },
//         zoneButtonText: {
//             color: colors.primaryText,
//         },
//     });
// }
//
// export { ZonesScreen };
