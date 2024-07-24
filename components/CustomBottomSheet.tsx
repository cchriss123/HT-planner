import React, {forwardRef, useCallback, useMemo} from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';
import { Easing } from 'react-native-reanimated';

interface Props {
    children: React.ReactNode;
    onClose?: () => void;
}

const CustomBottomSheet = forwardRef<BottomSheet, Props>((props, ref) => {
    const { children} = props;
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const renderBackDrop = useCallback(
        (props:  any) => <BottomSheetBackdrop animatedIndex={0} animatedPosition={-1 } {...props} />,
        []
    )
    const animationConfigs = useMemo(() => ({
        duration: 200,
        easing: Easing.out(Easing.ease),
    }), []);

    return (
        <BottomSheet
            index={-1}
            ref={ref}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: colors.neutralGrey }}
            snapPoints={snapPoints}
            onClose={props.onClose}
            backdropComponent={renderBackDrop}
            animationConfigs={animationConfigs}
            backgroundStyle={{borderRadius: 12}}
        >
            <View style={[styles.contentContainer, { borderColor: colors.primaryBlue }]}>
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
    },
});

export default CustomBottomSheet;
