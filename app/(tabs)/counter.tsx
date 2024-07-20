import React, { useRef, useState, useEffect } from 'react';
import {Animated, View, TouchableOpacity, Text, useColorScheme, StyleSheet, Dimensions, TextInput, Alert, Platform} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedView } from '@/components/AnimatedView';
import { DropdownComponent } from '@/components/DropdownComponent';



//TODO ADD code to reset text input after OK button is pressed
//TODO ADD code for gestures for animated view
//TODO ADD IP input
//TODO ADD GOAL input
//TODO Consider adding progress bar here
//TODO Add code to send data to desktop app


interface Zone {
    createdAt: string;
    name: string;
    countOne: number;
    countTwo: number;
    countThree: number;
    totalGraphs: number;
    totalHair: number;
}



export default function TabTwoScreen() {

    const [zones, setZones] = useState<Zone[]>([]);
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [countThree, setCountThree] = useState(0);
    const [countTotalGraphs, setCountTotalGraphs] = useState(0);
    const [countTotalHair, setCountTotalHair] = useState(0);
    const [editMenuVisible, setEditMenuVisible] = useState(false);
    const [addMenuVisible, setAddMenuVisible] = useState(false);
    const [newZoneName, setNewZoneName] = useState('');
    const [currentZone, setCurrentZone] = useState<Zone | null>(null);
    // const [newCountOne, setNewCountOne] = useState('');
    // const [newCountTwo, setNewCountTwo] = useState('');
    // const [newCountThree, setNewCountThree] = useState('');
    const menuHeight = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        let toValue = 0;
        if (addMenuVisible || editMenuVisible) {
            toValue = Dimensions.get('window').height * 0.50;
        }

        Animated.timing(menuHeight, {
            toValue,
            duration: 100,
            useNativeDriver: false
        }).start();
    }, [addMenuVisible, editMenuVisible]);



    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme, editMenuVisible, addMenuVisible);

    function handlePress(value: number) {
        if (value === 1) setCountOne(countOne + 1);
        if (value === 2) setCountTwo(countTwo + 1);
        if (value === 3) setCountThree(countThree + 1);
        setCountTotalGraphs(countTotalGraphs + 1);
        setCountTotalHair(countTotalHair + value);
    }

    function handleAddIconPress() {
        setAddMenuVisible(!addMenuVisible);
        setEditMenuVisible(false);
    }

    function handleEditIconPress() {
        setEditMenuVisible(!editMenuVisible);
        setAddMenuVisible(false);
    }


    function handleReset() {
        Alert.alert(
            "Reset Counters",
            "Are you sure you want to reset all counters?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        setCountOne(0);
                        setCountTwo(0);
                        setCountThree(0);
                        setCountTotalGraphs(0);
                        setCountTotalHair(0);
                    }
                }
            ]
        );
    }

    function addZone(name: string) {

        if (!name) {
            Alert.alert('Error', 'Please enter a name for the zone');
            return;
        }

        setZones([...zones, {
            createdAt: new Date().toISOString(),
            name: name,
            countOne: 0,
            countTwo: 0,
            countThree: 0,
            totalGraphs: 0,
            totalHair: 0,
        }]);
    }




    // function handleSetCount(newValue: string, hairCount: number) {
    //     const parsedValue = parseInt(newValue, 10);
    //     if (isNaN(parsedValue)) return;
    //
    //     if (hairCount === 1) {
    //         setCountOne(parsedValue);
    //         setCountTotalGraphs(countTwo + countThree + parsedValue);
    //         setCountTotalHair(countTwo + countThree + parsedValue);
    //     }
    //     if (hairCount === 2) {
    //         setCountTwo(parsedValue);
    //         setCountTotalGraphs(countOne + countThree + parsedValue);
    //         setCountTotalHair(countOne + countThree + parsedValue*hairCount);
    //     }
    //     if (hairCount === 3) {
    //         setCountThree(parsedValue);
    //         setCountTotalGraphs(countOne + countTwo + parsedValue);
    //         setCountTotalHair(countOne + countTwo + parsedValue*hairCount);
    //     }
    // }




    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? Colors.dark.softBackground : Colors.light.softBackground }}>
                <View style={styles.topContainer}>
                    <View style={{ borderColor: 'black', width: '60%', alignItems: 'center' }}>
                        <DropdownComponent />
                    </View>
                    <Icon name="add" size={30} style={styles.addMenuIcon} onPress={() => handleAddIconPress()} />

                    <Icon name="menu" size={30} style={styles.editMenuIcon} onPress={() => handleEditIconPress()} />
                </View>



                {addMenuVisible && (
                    <AnimatedView menuVisible={
                        addMenuVisible} menuHeight={menuHeight}>

                        <View style={styles.menuRow}>
                            <TextInput style={styles.textInput} placeholder="Enter zone name" onChangeText={(text) => setNewZoneName(text)} />
                            <TouchableOpacity style={styles.okButton} onPress={() => addZone(newZoneName)}>
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </AnimatedView>
                )}


                {editMenuVisible && (
                    <AnimatedView menuVisible={editMenuVisible} menuHeight={menuHeight}>

                        {/*<View style={styles.menuRow}>*/}
                        {/*    <TextInput style={styles.textInput} placeholder="Enter 1 FU count" keyboardType="numeric" onChangeText={(text) => setNewCountOne(text)}/>*/}
                        {/*    <TouchableOpacity style={styles.okButton} onPress={() => handleSetCount(newCountOne, 1)}>*/}
                        {/*        <Text style={styles.okButtonText}>OK</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

                        {/*<View style={styles.menuRow}>*/}
                        {/*    <TextInput style={styles.textInput} placeholder="Enter 2 FU count" keyboardType="numeric" onChangeText={(text) => setNewCountTwo(text)}/>*/}
                        {/*    <TouchableOpacity style={styles.okButton} onPress={() => handleSetCount(newCountTwo, 2)}>*/}
                        {/*        <Text style={styles.okButtonText}>OK</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

                        {/*<View style={styles.menuRow}>*/}
                        {/*    <TextInput style={styles.textInput} placeholder="Enter 3 FU count" keyboardType="numeric" onChangeText={(text) => setNewCountThree(text)}/>*/}
                        {/*    <TouchableOpacity style={styles.okButton} onPress={() => handleSetCount(newCountThree, 3)}>*/}
                        {/*        <Text style={styles.okButtonText}>OK</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}



                        <View style={styles.resetButtonContainer}>
                            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                                <Text style={styles.resetButtonText}>Reset</Text>
                            </TouchableOpacity>
                        </View>

                    </AnimatedView>
                )}

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
                            <Text style={styles.buttonText}>{`Single (${countOne})`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress(2)}>
                            <Text style={styles.buttonText}>{`Double (${countTwo})`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress(3)}>
                            <Text style={styles.buttonText}>{`Triple (${countThree})`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.countContainer}>
                        <ThemedText style={styles.largeText}>{`Count: ${countTotalGraphs}`}</ThemedText>
                        <ThemedText style={styles.smallText}>{`Total Hair: ${countTotalHair}`}</ThemedText>
                    </View>
                </View>

        </View>
    );
}


function createStyles(colorScheme: "light" | "dark" | null | undefined, addMenuVisible: boolean, editMenuVisible: boolean) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return StyleSheet.create({
        topContainer: {
            // zIndex: 1000,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            width: '100%', // Use full width
            paddingHorizontal: '5%', // Add padding on both sides

        },
        buttonContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: colors.tint,
            paddingTop: 10,
            paddingBottom: 10,
        },
        button: {

            borderRadius: 20,
            margin: 15,
            width: '90%',
            borderWidth: 2,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primaryBlue,
            borderTopColor: colors.secondaryBlue,
            borderLeftColor: colors.secondaryBlue,
            borderRightColor: colors.neutralGrey,
            borderBottomColor: colors.neutralGrey,

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },

        buttonText: {
            color: colors.solidBackground,
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        countContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: colors.icon,
            height: 120,
        },
        customTitle: {
            fontSize: 30,
        },
        largeText: {
            fontSize: 50,
            paddingTop: 30,
            marginTop: 20,
            marginBottom: 5,
            color: colors.primaryText,
            fontWeight: 'bold',

        },
        smallText: {
            fontSize: 20,
            marginBottom: 20,
            color: colors.primaryText,
        },


        addMenuIcon: {
            fontSize: 50,
            color: editMenuVisible ? colors.primaryBlue : colors.neutralGrey,

        },

        editMenuIcon: {
            fontSize: 50,
            color: addMenuVisible ? colors.primaryBlue : colors.neutralGrey,
        },



        menuRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 80,


        },
        textInput: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            width: '70%',
            height: 50,
            backgroundColor: colors.softBackground,
            borderRadius: 15,
        },
        okButton: {
            padding: 10,
            borderRadius: 15,
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            borderWidth: 2,

            backgroundColor: colors.primaryBlue,
            borderTopColor: colors.secondaryBlue,
            borderLeftColor: colors.secondaryBlue,
            borderRightColor: colors.neutralGrey,
            borderBottomColor: colors.neutralGrey,

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,

        },
        okButtonText: {
            color: colors.solidBackground,
            fontSize: 18,
        },
            resetButtonContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                marginTop: 10,
            },
            resetButton: {
                padding: 10,
                borderRadius: 15,
                width: '25%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderWidth: 2,
                backgroundColor: '#D9534F', // Softer red color
                borderTopColor: '#B94A48',
                borderLeftColor: '#B94A48',
                borderRightColor: colors.neutralGrey,
                borderBottomColor: colors.neutralGrey,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
            },
            resetButtonText: {
                color: colors.solidBackground,
                fontSize: 18,
            }



    }

    );
}
