import {PanResponder, View, ViewProps} from "react-native";
import {Animated, useColorScheme, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useRef} from "react";
import {Colors} from "@/constants/Colors";

// const panResponder = useRef(
//     PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onPanResponderMove: (evt, gestureState) => {
//             // Subtract gestureState.dy from maxMenuHeight to invert the drag direction
//             let newHeight = maxMenuHeight - gestureState.dy;
//             // Clamp the new height to be between 0 and the maxMenuHeight
//             newHeight = Math.max(0, Math.min(maxMenuHeight, newHeight));
//             menuHeight.setValue(newHeight);
//         },
//         onPanResponderRelease: (evt, gestureState) => {
//             // Determine if the menu should snap back or close based on the movement
//             if (gestureState.dy < -100) {  // If moved up significantly, snap back
//                 Animated.spring(menuHeight, {
//                     toValue: maxMenuHeight,
//                     useNativeDriver: false
//                 }).start();
//             } else if (gestureState.dy > 100) {  // If moved down significantly, close
//                 setMenuVisible(false);
//             } else {
//                 // If not moved significantly, snap back to open position
//                 Animated.spring(menuHeight, {
//                     toValue: maxMenuHeight,
//                     useNativeDriver: false
//                 }).start();
//             }
//         }
//     })
// ).current;




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
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
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








