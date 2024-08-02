import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useAppState } from '@/state/Store';
import FormStyles from '@/components/forms/styles/FormStyles';

export default function PdfExporter() {
    const globalState = useAppState();
    const { styles, theme } = FormStyles();

    async function exportPdf() {
        const donorZonesHtml = globalState.donorZones.map(zone => `
            <li style="page-break-inside: avoid;">
                <strong>${zone.name}  </strong>
                <ul>
                    <li>Caliber: ${zone.caliber}</li>
                    <li>Grafts Per Cm²: ${zone.graftsPerCm2}</li>
                    <li>Hair Per Cm²: ${zone.hairPerCm2}</li>
                    <li>Area: ${zone.area}</li>
                    <li>Desired Coverage Value: ${zone.desiredCoverageValue}</li>
                    <li>Hair Per Graft: ${zone.hairPerGraft?.toFixed(2)}</li>
                    <li>Grafts Per Zone: ${zone.graftsPerZone}</li>
                    <li>Coverage Value: ${zone.coverageValue.toFixed(2)}</li>
                    <li>Hair Per Zone: ${zone.hairPerZone}</li>
                    <li>Grafts Extracted To Reach Donor Desired Coverage Value: ${zone.graftsExtractedToReachDonorDesiredCoverageValue}</li>
                    <li>Grafts Left To Reach Donor Desired Coverage Value: ${zone.graftsLeftToReachDonorDesiredCoverageValue}</li>
                </ul>
            </li>
        `).join('');

        const recipientZonesHtml = globalState.recipientZones.map(zone => `
            <li style="page-break-inside: avoid;">
                <strong>${zone.name}</strong>
                <p>Number of Grafts Planted in Frontal Zone ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</p>
            </li>
        `).join('');

        const recipientZonesHtmlJournal = globalState.recipientZones.map(zone => `
            <li style="page-break-inside: avoid;">
                <strong>${zone.name}</strong>
                <ul>
                    <li>Number of Grafts Planted in Frontal Zone: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</li>
    
            </li>
        `).join('');


        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>PDF Export</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 40px;
                    }
                    h2 {
                        color: #333;
                    }
                    p, li {
                        font-size: 10px;
                        line-height: 1.5;
                    }
                    ul {
                       padding-left: 20px;
                    }
                    li {
                        page-break-inside: avoid;
                    }
                </style>
            </head>
            <body>
         <div class="content-wrapper">
            

                    <h4>Patient Information</h4>
                    <p>This report provides a quantitative summary of the hair transplantation procedure performed. It includes specific data on the number and type of grafts extracted and implanted, as well as the detailed metrics related to the condition of the donor and recipient areas. These numbers offer a precise overview of the procedure's scope and outcomes.</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Date of Procedure:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Surgeon:</strong> Armin Soleimanpor</p>
                    <p><strong>Clinic:</strong> Göta Hårklinik </p>
                    <hr>
                    <h4>Summary for Patient</h4>
                    
                            <h4>Totals</h4>
                    <p>Total Grafts extracted: ${globalState.totalGrafts}</p>
                    <p>Total Single Hair Grafts: ${globalState.totalSingles}</p>
                    <p>Total Double Hair Grafts: ${globalState.totalDoubles}</p>
                    <p>Total Triple Hair Grafts: ${globalState.totalTriples}</p>
                    <p>Total Quadruple Hair Grafts: ${globalState.totalQuadruples}</p>
                    <p>Total Hair ${globalState.totalHair}</p>
                    
                    <h4>Recipient Zones</h4>
                    <ul>
                        ${recipientZonesHtml}
                    </ul>
                    <p>This section presents the main numerical aspects of the procedure, including the distribution and types of grafts used in different recipient zones.</p>
                    <h4>Detailed Clinical Information (For Patient's Journal)/h4>
                    <h4>Donor Area Assessment</h4>
                    <ul>
                        ${donorZonesHtml}
                    </ul>
                </div>
            </body>
            </html>
        `;

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
