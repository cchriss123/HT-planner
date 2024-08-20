import React, { forwardRef, useCallback, useMemo } from 'react';
import {View, StyleSheet, useColorScheme, Keyboard} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';
import { Easing } from 'react-native-reanimated';


export interface Props {
    children: React.ReactNode;
    menuVisible: boolean;
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomBottomSheet = forwardRef<BottomSheet, Props>((props, ref) => {

    const { children } = props;
    const {setMenuVisible } = props;
    const snapPoints = useMemo(() => ['50%', '60%', '70%', '80%', '90%', '95%', '100%'], []);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(colors);
    const renderBackDrop = useCallback((props: any) =>
        <BottomSheetBackdrop
            animatedIndex={props.animatedIndex}
            animatedPosition={props.animatedPosition}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props} />
        , []);
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
            backgroundStyle={{
                borderRadius: 12,
                backgroundColor:
                colors.solidBackground,
                borderWidth: 1,
                borderColor: colors.themedGrey,


        }}
        >
            <View style={styles.contentContainer}>
                {children}
            </View>
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
