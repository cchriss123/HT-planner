import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function FormStyles() {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const styles = StyleSheet.create({
        buttonContainer: {
            width: '50%',
            alignItems: 'center',
            marginBottom: 20,
        },
            buttonReset: {
            height: 40,
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
            width: '76%',

        },
        buttonResetText: {
            color: 'white',
            fontSize: 16,
            marginLeft: 5,
        },
        message: {
            marginTop: 10,
            color: colors.primaryText,
        }
    });

    return { styles };
}
