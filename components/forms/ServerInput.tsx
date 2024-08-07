import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import FormStyles from "@/components/forms/styles/FormStyles";


function ServerInput() {
    const [name, setName] = React.useState('');

    const [message, setMessage] = React.useState('');
    const { styles, theme } = FormStyles();
    


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);



    function editZoneSubmit(ip : string) {








        setMessage('New IP saved');

    }




    return (
        <View style={styles.container}>
            <TextInput
                label="Zone Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                placeholder={'Enter new IP'}
                style={styles.input}
                theme={theme}
            />


            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => editZoneSubmit(name)}>
                    <Text style={styles.buttonTitle}>Save IP</Text>
                </TouchableOpacity>
            </View>


            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

export default ServerInput;
