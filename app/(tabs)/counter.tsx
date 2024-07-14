import React, { useRef, useState, useEffect } from 'react';
import {Animated, View, TouchableOpacity, Text, useColorScheme, StyleSheet, Dimensions} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedView} from "@/components/AnimatedView";

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
            toValue: menuVisible ? Dimensions.get('window').height * 0.60 : 0,
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

    const testChild = <Text>Test</Text>;

    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? Colors.dark.softBackground : Colors.light.softBackground }}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.titleContainer}>
                    <Icon name="menu" size={30} style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)} />
                </View>



                {menuVisible && (
                    <AnimatedView menuVisible={menuVisible} menuHeight={menuHeight}>{testChild}</AnimatedView>
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
                        <ThemedText style={styles.smallText}>{`Total Hairs: ${countTotalHair}`}</ThemedText>
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



    });
}
