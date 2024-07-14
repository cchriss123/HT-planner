import {View, ViewProps} from "react-native";
import {Animated, useColorScheme, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect} from "react";
import {Colors} from "@/constants/Colors";




export function AnimatedView({menuVisible, menuHeight, children}: ViewProps & { menuVisible: boolean, menuHeight: Animated.Value }) {

    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme, menuHeight);

    useEffect(() => {
        Animated.timing(menuHeight, {
            toValue: menuVisible ? Dimensions.get('window').height * 0.60 : 0,
            duration: 100,
            useNativeDriver: false
        }).start();
    }, [menuVisible]);

    return (
        <Animated.View style={styles.view}>
            <View style={styles.line}></View>
            {children}
        </Animated.View>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined, menuHeight: Animated.Value) {

    return StyleSheet.create({
        view: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: menuHeight,
            backgroundColor: colorScheme === 'dark' ? Colors.dark.solidBackground : Colors.light.solidBackground,
            borderTopColor: colorScheme === 'dark' ? Colors.dark.neutralGrey : Colors.light.neutralGrey,
            borderTopWidth: 0.5,
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            padding: 20,
            alignItems: 'center',
            zIndex: 1000,
            borderRadius: 20,
        },
        line: {
            width: 40,
            height: 4,
            backgroundColor: colorScheme === 'dark' ? Colors.dark.neutralGrey : Colors.light.neutralGrey,
            borderRadius: 2,
            marginTop: 10,
            marginBottom: 30,


        },
    });
}








