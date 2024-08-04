import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useAppState } from '@/state/Store';
import FormStyles from '@/components/forms/styles/FormStyles';
import {getCounterSwePdfHtml} from "@/components/PdfHtml/CounterSwe";

export default function PdfExporter() {

    const { styles, theme } = FormStyles();

    async function exportPdf() {





        const pdfFile = await printToFileAsync({
            html: html,
            base64: false,
            margins: {
                top: 40,
                bottom: 80,
                left: 40,
                right: 40,
            },
        });

        await shareAsync(pdfFile.uri);
    }

    async function handleSubmit() {
        if (!name) {
            setMessage('Please enter a name.');
            return;
        }
        await exportPdf();
        setMessage('Export successful!');
    }

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const html = getCounterSwePdfHtml(name);

    return (
        <View style={styles.container}>
            <TextInput
                label="Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
                theme={theme}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonTitle}>Export PDF</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}
