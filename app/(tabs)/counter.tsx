import React, { useRef, useState, useEffect } from 'react';
import {Animated, View, TouchableOpacity, Text, useColorScheme, StyleSheet, Dimensions} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TabTwoScreen() {
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [countThree, setCountThree] = useState(0);
    const [countTotalGraphs, setCountTotalGraphs] = useState(0);
    const [countTotalHair, setCountTotalHair] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(menuHeight, {
            toValue: menuVisible ? Dimensions.get('window').height * 0.82 : 0,
            duration: 50,
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.titleContainer}>
                <Icon name="menu" size={30} style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)} />
            </View>

            {menuVisible && (
                <Animated.View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: menuHeight,
                    backgroundColor: 'white', // Adjust color as needed
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    padding: 20,
                    alignItems: 'center',
                    zIndex: 1000, // High z-index to ensure it overlays other content
                }}>
                    <Text>Menu Content Here</Text>
                </Animated.View>
            )}


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
                <ThemedText style={styles.smallText}>{`Total Hairs: ${countTotalHair}`}</ThemedText>
            </View>
        </SafeAreaView>
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
            // borderWidth: 1,
            // borderColor: colors.icon,
            height: 40,
            paddingRight: '5%'
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
            backgroundColor: colors.blue,
            borderTopColor: colors.lightBlue,
            borderLeftColor: colors.lightBlue,
            borderRightColor: colors.icon, // Darker side
            borderBottomColor: colors.icon, // Darker side

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },

        buttonText: {
            color: colors.background,
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
            color: colors.text,
            fontWeight: 'bold',

        },
        smallText: {
            fontSize: 20,
            marginBottom: 20,
            color: colors.text,
        },
        menuIcon: {
            fontSize: 50,
            color: menuVisible ? colors.blue : colors.icon,
        },



    });
}
