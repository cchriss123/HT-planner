import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, useColorScheme, Keyboard } from 'react-native';
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';
import { Easing } from 'react-native-reanimated';
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";

export interface Props {
    children: React.ReactNode;
    menuVisible: boolean;
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomBottomSheet = forwardRef<BottomSheetMethods, Props>((props, ref) => {
    const { children, setMenuVisible } = props;

    const snapPoints = useMemo(
        () => ['50%', '60%', '70%', '80%', '90%', '95%', '100%'],
        []
    );

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(colors);

    const renderBackDrop = useCallback(
        (p: any) => (
            <BottomSheetBackdrop
                {...p}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const animationConfigs = useMemo(
        () => ({ duration: 200, easing: Easing.out(Easing.ease) }),
        []
    );

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setMenuVisible(false);
            Keyboard.dismiss();
        } else {
            setMenuVisible(true);
        }
    }, [setMenuVisible]);

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            enablePanDownToClose
            handleIndicatorStyle={{ backgroundColor: colors.neutralGrey }}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackDrop}
            animationConfigs={animationConfigs}
            backgroundStyle={{
                borderRadius: 12,
                backgroundColor: colors.solidBackground,
                borderWidth: 1,
                borderColor: colors.themedGrey,
            }}
        >
            <BottomSheetView style={styles.contentContainer}>
                {children}
            </BottomSheetView>
        </BottomSheet>
    );
});

function createStyles(colors: {
    neutralGrey: string;
    solidBackground: string;
    themedGrey: string;
}) {
    return StyleSheet.create({
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: colors.themedGrey,
            backgroundColor: colors.solidBackground,
        },
    });
}

export default CustomBottomSheet;
