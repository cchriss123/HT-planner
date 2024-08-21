import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {isPhone} from "@/constants/DeviceType";


export default function FormStyles() {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const styles = StyleSheet.create({
        buttonContainer: {
            width: isPhone ? '70%' : '50%',
            alignItems: 'center',
            marginBottom: 20,
        },
            buttonReset: {
            height: isPhone ? 40 : 55,
            backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            marginTop: 15,
            color: colors.primaryText,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowRadius: 5,
            elevation: 5,
            width: '45%',

        },
        buttonResetText: {
            color: 'white',
            fontSize: isPhone ? 14 : 18,

            marginLeft: 5,
        },
        message: {
            marginTop: 10,
            color: colors.primaryText,
        }
    });

    return { styles };
}
