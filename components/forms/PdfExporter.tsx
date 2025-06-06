import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {printToFileAsync} from 'expo-print';
import {shareAsync} from 'expo-sharing';
import FormStyles from '@/components/forms/styles/FormStyles';
import {getCounterSwePdfHtml} from "@/components/pdfHtml/counterSwe";
import {getCounterEngPdfHtml} from "@/components/pdfHtml/counterEng";
import {getCalculatorEngPdfHtml} from "@/components/pdfHtml/calculatorEng";
import {getCalculatorSwePdfHtml} from "@/components/pdfHtml/calculatorSwe";
import {useAppState} from "@/state/Store";
import BottomSheet from "@gorhom/bottom-sheet";
import * as FileSystem from 'expo-file-system';


interface PdfExporterProps {
    pdfType: string,
    bottomSheetRef: React.RefObject<BottomSheet>;
}

export default function PdfExporter({pdfType, bottomSheetRef}: PdfExporterProps) {
    const {styles, theme} = FormStyles();

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const globalState = useAppState();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    async function exportPdf(reportType: string, reportLanguage: string): Promise<void> {
        let html;
    
        // Set the correct HTML based on reportType and language
        if (reportType === 'counter' && reportLanguage === 'swe') {
            html = getCounterSwePdfHtml(name, globalState);
        } else if (reportType === 'counter' && reportLanguage === 'eng') {
            html = getCounterEngPdfHtml(name, globalState);
        } else if (reportType === 'calculator' && reportLanguage === 'swe') {
            html = getCalculatorSwePdfHtml(name, globalState);
        } else if (reportType === 'calculator' && reportLanguage === 'eng') {
            html = getCalculatorEngPdfHtml(name, globalState);
        }
    
        const pdfFile = await printToFileAsync({
            html: html,
            base64: false,
            margins: {
                top: 40,
                bottom: 40,
                left: 40,
                right: 40,
            },
        });
    
        const sanitizedPatientName = name.replace(/ /g, '_');
        const reportTypeInFile = reportType === 'counter' ? 'patient' : 'journal';
        const date = new Date().toISOString().split('T')[0];
        const newFileName = `${FileSystem.documentDirectory}${sanitizedPatientName}_${reportTypeInFile}_${date}.pdf`;
    
        await FileSystem.moveAsync({
            from: pdfFile.uri,
            to: newFileName,
        });
    
        await shareAsync(newFileName);
    
        bottomSheetRef.current?.close();
    }
    
    async function handleSubmit(reportType: string, reportLanguage: string): Promise<void> {
        if (!name) {
            setMessage('Please enter a patient name.');
            return;
        }
        await exportPdf(reportType, reportLanguage);
        setMessage('Export successful!');
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Patient Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
                theme={theme}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit(pdfType, 'swe')}>
                    <Text style={styles.buttonTitle}>Export SWE PDF</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => handleSubmit(pdfType, 'eng')}>
                    <Text style={styles.buttonTitle}>Export ENG PDF</Text>
                </TouchableOpacity>

            </View>


            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}