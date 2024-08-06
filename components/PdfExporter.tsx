import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import FormStyles from '@/components/forms/styles/FormStyles';
import { getCounterSwePdfHtml } from "@/components/PdfHtml/CounterSwe";
import { getCounterEngPdfHtml } from "@/components/PdfHtml/CounterEng";
import { getCalculatorEngPdfHtml} from "@/components/PdfHtml/CalculatorEng";
import { getCalculatorSwePdfHtml} from "@/components/PdfHtml/CalculatorSwe";
import { useAppState } from "@/state/Store";


interface PdfExporterProps {
    pdfType: string;
}

export default function PdfExporter({ pdfType }: PdfExporterProps) {
    const { styles, theme } = FormStyles();

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const globalState = useAppState();


    async function exportPdf(reportType: string, reportLanguage: string): Promise<void> {

        let html;

        if (reportType === 'counter' && reportLanguage === 'swe') {
            html = getCounterSwePdfHtml(name, globalState);
        }
        else if (reportType === 'counter' && reportLanguage === 'eng') {
            html = getCounterEngPdfHtml(name);
        }
        else if (reportType === 'calculator' && reportLanguage === 'swe') {
            html = getCalculatorSwePdfHtml(name);
        }
        else if (reportType === 'calculator' && reportLanguage === 'eng') {
            html = getCalculatorEngPdfHtml(name);
        }

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

    async function handleSubmit(reportType: string, reportLanguage: string): Promise<void> {
        if (!name) {
            setMessage('Please enter a name.');
            return;
        }
        await exportPdf(reportType, reportLanguage);
        setMessage('Export successful!');
    }

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
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit(pdfType, 'swe')}>
                <Text style={styles.buttonTitle}>Export SWE PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit(pdfType, 'eng')}>
                <Text style={styles.buttonTitle}>Export ENG PDF</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}