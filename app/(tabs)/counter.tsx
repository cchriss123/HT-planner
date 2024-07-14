import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, TouchableOpacity, Text, useColorScheme, StyleSheet, Dimensions, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedView } from '@/components/AnimatedView';

export default function TabTwoScreen() {
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [countThree, setCountThree] = useState(0);
    const [countTotalGraphs, setCountTotalGraphs] = useState(0);
    const [countTotalHair, setCountTotalHair] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const [newCountOne, setNewCountOne] = useState('');
    const [newCountTwo, setNewCountTwo] = useState('');
    const [newCountThree, setNewCountThree] = useState('');
    const menuHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(menuHeight, {
            toValue: menuVisible ? Dimensions.get('window').height * 0.50 : 0,
            duration: 100,
            useNativeDriver: false
        }).start();
    }, [menuVisible]);

    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme, menuVisible);

    function handlePress(value: number) {
        if (value === 1) setCountOne(countOne + 1);
        if (value === 2) setCountTwo(countTwo + 1);
        if (value === 3) setCountThree(countThree + 1);
        setCountTotalGraphs(countTotalGraphs + 1);
        setCountTotalHair(countTotalHair + value);
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

    function handleSetCount(newValue: string, hairCount: number) {
        const parsedValue = parseInt(newValue, 10);
        if (isNaN(parsedValue)) return;

        if (hairCount === 1) {
            setCountOne(parsedValue);
            setCountTotalGraphs(countTwo + countThree + parsedValue);
            setCountTotalHair(countTwo + countThree + parsedValue);
        }
        if (hairCount === 2) {
            setCountTwo(parsedValue);
            setCountTotalGraphs(countOne + countThree + parsedValue);
            setCountTotalHair(countOne + countThree + parsedValue*2);
        }
        if (hairCount === 3) {
            setCountThree(parsedValue);
            setCountTotalGraphs(countOne + countTwo + parsedValue);
            setCountTotalHair(countOne + countTwo + parsedValue*3);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? Colors.dark.softBackground : Colors.light.softBackground }}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.titleContainer}>
                    <Icon name="menu" size={30} style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)} />
                </View>

                {menuVisible && (
                    <AnimatedView menuVisible={menuVisible} menuHeight={menuHeight}>

                        <View style={styles.menuRow}>
                            <TextInput style={styles.textInput} placeholder="Enter 1 FU count" keyboardType="numeric" onChangeText={(text) => setNewCountOne(text)}/>
                            <TouchableOpacity style={styles.okButton} onPress={() => handleSetCount(newCountOne, 1)}>
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuRow}>
                            <TextInput style={styles.textInput} placeholder="Enter 2 FU count" keyboardType="numeric" onChangeText={(text) => setNewCountTwo(text)}/>
                            <TouchableOpacity style={styles.okButton} onPress={() => handleSetCount(newCountTwo, 2)}>
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuRow}>
                            <TextInput style={styles.textInput} placeholder="Enter 3 FU count" keyboardType="numeric" onChangeText={(text) => setNewCountThree(text)}/>
                            <TouchableOpacity style={styles.okButton} onPress={() => handleSetCount(newCountThree, 3)}>
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>


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
                            <Text style={styles.buttonText}>{`Increment 1 (${countOne})`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress(2)}>
                            <Text style={styles.buttonText}>{`Increment 2 (${countTwo})`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress(3)}>
                            <Text style={styles.buttonText}>{`Increment 3 (${countThree})`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.countContainer}>
                        <ThemedText style={styles.largeText}>{`Count: ${countTotalGraphs}`}</ThemedText>
                        <ThemedText style={styles.smallText}>{`Total Hair: ${countTotalHair}`}</ThemedText>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}


function createStyles(colorScheme: "light" | "dark" | null | undefined, menuVisible: boolean) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            paddingTop: 10,
            // backgroundColor: colors.background,
            // borderWidth: 1,
            // borderColor: colors.icon,
        },
        titleContainer: {
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'flex-end',
            // borderBottomWidth: 1,
            // borderBottomColor: colors.neutralGrey,
            height: 60,
            paddingRight: '5%',

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
        menuIcon: {
            fontSize: 50,
            color: menuVisible ? colors.primaryBlue : colors.neutralGrey,
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
