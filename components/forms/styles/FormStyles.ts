import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '70%',
            alignItems: 'center',
        },
        input: {
            width: '100%',
            height: 40,
            marginVertical: 5,
        },
        button: {
            height: 40,
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
            width: '45%',
            backgroundColor: colors.primaryBlue,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonTitle: {
            color: colors.solidBackground,
            alignItems: 'center',
            justifyContent: 'center',
        },
        message: {
            color: colors.primaryText,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        title: {
            fontSize: 16,
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
