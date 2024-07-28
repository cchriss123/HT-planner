import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function FormStyles() {

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        container: {
            padding: 20,
            backgroundColor: colors.softBackground,
            flex: 1,
        },
        input: {
            height: 40,
            borderColor: colors.neutralGrey,
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 8,
            backgroundColor: colors.softBackground,
            color: colors.primaryText,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },
        button: {
            backgroundColor: colors.primaryBlue,
            padding: 10,
            textAlign: 'center',
            borderRadius: 8,
            marginTop: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },
        buttonTitle: {
            color: colors.primaryText,
            fontSize: 16,
        },
        message: {
            marginTop: 10,
            color: colors.primaryText,
            textAlign: 'center',
        },
    });
}
