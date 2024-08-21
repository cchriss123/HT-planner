import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {isPhone} from "@/constants/DeviceType";


export default function FormStyles() {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const theme = {
        roundness: 8,
        colors: {
            primary: colors.primaryBlue,
            background: colors.solidBackground,
            surface: colors.solidBackground,
            accent: colors.primaryText,
            text: colors.primaryText,
            onSurface: colors.primaryText,
            disabled: colors.primaryText,
            placeholder: colors.primaryText,
            backdrop: colors.primaryText,
            notification: colors.primaryBlue,
        },
        fontSizes: {
            small: 40,
            medium: 40,
            large: 40,
        },

    };

    const styles = StyleSheet.create({
        container: {
            width: isPhone ? '70%' : '50%',
            alignItems: 'center',
            marginTop : '5%',
        },
        input: {
            width: '100%',
            height: isPhone ? 40 : 55,
            marginVertical: 5,
            fontSize: isPhone ? 16 : 20,
        },
        button: {
            width: '45%',
            height: isPhone ? 40 : 55,
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
            marginVertical: 20,

            backgroundColor: colors.primaryBlue,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonTitle: {
            color: colors.solidBackground,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isPhone ? 14 : 18,
        },
        message: {
            color: colors.primaryText,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        title: {
            fontSize: isPhone ? 16 : 20,
            fontWeight: 'bold',
            color: colors.primaryText,
            marginTop: 20,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        }
    });

    return { styles, theme };
}
