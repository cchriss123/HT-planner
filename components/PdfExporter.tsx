import React from 'react';
import { Appearance, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useAppState } from '@/state/Store';
import { Colors } from "@/constants/Colors";

export default function PdfExporter() {
    const globalState = useAppState();
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);

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
            <br>
            <li style="page-break-inside: avoid;">
                <strong>${zone.name}</strong>
                <ul>
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
                    <h4>Totals</h4>
                    <p>Total Grafts extracted: ${globalState.totalGrafts}</p>
                    
                    <h4>Donor Zones</h4>
                    <ul>
                        ${donorZonesHtml}
                    </ul>
                    
                    <h4>Recipient Zones</h4>
                    <ul>
                        ${recipientZonesHtml}
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

    return (
        <TouchableOpacity style={styles.zoneButton} onPress={exportPdf}>
            <Text style={styles.zoneButtonText}>Export PDF</Text>
        </TouchableOpacity>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        zoneButton: {
            marginVertical: 5,
            height: 50,
            padding: 10,
            backgroundColor: colors.primaryBlue,
            borderRadius: 8,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
        },
        zoneButtonText: {
            color: colors.solidBackground,
        },
    });
}
