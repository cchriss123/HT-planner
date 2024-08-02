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
            <div style="display: inline-block; page-break-inside: avoid;">
                <p>${zone.name}: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}, </p>
            </div>
        `).join('');

        const recipientZonesHtmlJournal = globalState.recipientZones.map(zone => `
            <li style="page-break-inside: avoid;">
            <h4>Recipient zones</h4>
                <strong>${zone.name}</strong>
                <ul>
                    <li>Number of Grafts Planted in Frontal Zone: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</li>
                    <li>Caliber: ${zone.caliber}</li>
                    <li>Grafts Per Cm²: ${zone.graftsPerCm2}</li>
                    <li>Hair Per Cm²: ${zone.hairPerCm2}</li>
                    <li>Area: ${zone.area}</li>
                    <li>Desired Coverage Value: ${zone.desiredCoverageValue}</li>
                    <li>Hair Per Graft: ${zone.hairPerGraft?.toFixed(2)}</li>
                    <li>Starting Coverage Value: ${zone.startingCoverageValue.toFixed(2)}</li>
                    <li>Coverage Value Difference: ${zone.coverageValueDifference.toFixed(2)}</li>
                    <li>Grafts Implanted To Reach Desired Recipient Coverage Value: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</li>
                </ul>
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
                        font-size: 12px;
                        line-height: 1.5;
                    }
                    ul {
                       padding-left: 20px;
                    }
                    li {
                        page-break-inside: avoid;
                    },
                    h1:empty {
                        margin: 300px;
                    }
         
                </style>
            </head>
            <body>
         <div class="content-wrapper">
            

                    <h2>Patient Information</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Date of Procedure:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Surgeon:</strong> Armin Soleimanpor</p>
                    <p><strong>Clinic:</strong> Göta Hårklinik </p>
                    <hr>
                    <h3>Summary for Patient</h3>
                    
                            <h4>Totals</h4>
                    <p>Total Grafts extracted: ${globalState.totalGrafts}</p>
                    <p>Total Single Hair Grafts: ${globalState.totalSingles}</p>
                    <p>Total Double Hair Grafts: ${globalState.totalDoubles}</p>
                    <p>Total Triple Hair Grafts: ${globalState.totalTriples}</p>
                    <p>Total Quadruple Hair Grafts: ${globalState.totalQuadruples}</p>
                    <p>Total Hair ${globalState.totalHair}</p>
                    
                    <h4>Recipient Zones number of Grafts Implanted</h4>
                    <div>
                        ${recipientZonesHtml}
                    </div>
                    
                 
                    <hr>
                    
                    <h4>Date: ${new Date().toLocaleDateString()}</h4>
                    <h4>Surgeon's Signature:</h4>
                    
                    
                    
                    <h1 style="page-break-before: always;"></h1>
                 
                  
                    <h4>Detailed Clinical Information (For Patient's Journal)</h4>
                    <h4>Donor Area Assessment</h4>
                    <ul>
                        ${donorZonesHtml}
                    </ul>
                    <h4>Recipient Area Assessment</h4>
                    <ul>
                        ${recipientZonesHtmlJournal}
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
