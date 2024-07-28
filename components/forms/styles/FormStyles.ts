import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function FormStyles() {

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        container: {
            // borderWidth: 1,
            flex: 1,
            width: '70%',
            alignItems: 'center',

        },
        input: {
            width: '100%',
            height: 40,
            // borderWidth: 1,
            color: colors.primaryText,
            borderColor: 'lightgrey',
            backgroundColor: colors.softBackground,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowRadius: 5,
            elevation: 5,
            marginVertical: 10,
            paddingLeft: 10,


        },
        button: {
            height: 40,
            color: colors.primaryText,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowRadius: 5,
            elevation: 5,
            marginVertical: 20,

            width: '40%',

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
        }
    });
}

