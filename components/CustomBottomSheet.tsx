import React, { forwardRef, useCallback, useMemo } from 'react';
import {View, StyleSheet, useColorScheme, Keyboard} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';
import { Easing } from 'react-native-reanimated';
import { useAppState } from "@/state/Store";

export interface Props {
    children: React.ReactNode;
    menuVisible: boolean;
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomBottomSheet = forwardRef<BottomSheet, Props>((props, ref) => {
    const { children } = props;
    const { menuVisible, setMenuVisible } = props;
    const snapPoints = useMemo(() => ['25%', '50%', '70%', '100%'], []);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const renderBackDrop = useCallback((props: any) => <BottomSheetBackdrop animatedIndex={0} animatedPosition={-1} {...props} />, []);
    const animationConfigs = useMemo(() => ({duration: 200, easing: Easing.out(Easing.ease)}), []);

    function handleSheetChanges(index: number) {
        if (index === -1) {
            setMenuVisible(false);
            Keyboard.dismiss();
        } else {
            setMenuVisible(true);
        }
    }

    return (
        <BottomSheet
            index={-1}
            ref={ref}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: colors.neutralGrey }}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackDrop}
            animationConfigs={animationConfigs}
            backgroundStyle={{ borderRadius: 12, backgroundColor: colors.solidBackground }}
        >
            <View style={styles.contentContainer}>
                {children}
            </View>
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.solidBackground,
    },
});

export default CustomBottomSheet;
