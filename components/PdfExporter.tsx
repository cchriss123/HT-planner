import React from 'react';
import { Button } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useAppState } from '@/state/Store';

export default function PdfExporter() {
    const globalState = useAppState();

    async function exportPdf() {
        const donorZonesHtml = globalState.donorZones.map(zone => `
            <li>
                <strong>${zone.name}</strong>
                <ul>
                    <li>Caliber: ${zone.caliber}</li>
                    <li>Grafts Per Cm²: ${zone.graftsPerCm2}</li>
                    <li>Hair Per Cm²: ${zone.hairPerCm2}</li>
                    <li>Area: ${zone.area}</li>
                    <li>Desired Coverage Value: ${zone.desiredCoverageValue}</li>
                    <li>Hair Per Graft: ${zone.hairPerGraft}</li>
      
   
                    <li>Grafts Per Zone: ${zone.graftsPerZone}</li>
                    <li>Coverage Value: ${zone.coverageValue}</li>
                    <li>Hair Per Zone: ${zone.hairPerZone}</li>
                    <li>Grafts Extracted To Reach Donor Desired Coverage Value: ${zone.graftsExtractedToReachDonorDesiredCoverageValue}</li>
                    <li>Grafts Left To Reach Donor Desired Coverage Value: ${zone.graftsLeftToReachDonorDesiredCoverageValue}</li>
                </ul>
            </li>
        `).join('');

        const recipientZonesHtml = globalState.recipientZones.map(zone => `
            <li>
                <strong>${zone.name}</strong>
                <ul>
                    <li>Caliber: ${zone.caliber}</li>
                    <li>Grafts Per Cm²: ${zone.graftsPerCm2}</li>
                    <li>Hair Per Cm²: ${zone.hairPerCm2}</li>
                    <li>Area: ${zone.area}</li>
                    <li>Desired Coverage Value: ${zone.desiredCoverageValue}</li>
                    <li>Hair Per Graft: ${zone.hairPerGraft}</li>
                    <li>Starting Coverage Value: ${zone.startingCoverageValue}</li>
                    <li>Coverage Value Difference: ${zone.coverageValueDifference}</li>
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
                </style>
            </head>
            <body>
                <h4>Totals</h4>
                <p>Total Grafts: ${globalState.totalGrafts}</p>
                
                <h4>Donor Zones</h4>
                <ul>
                    ${donorZonesHtml}
                </ul>
                
                <h4>Recipient Zones</h4>
                <ul>
                    ${recipientZonesHtml}
                </ul>
            </body>
            </html>
        `;

        const pdfFile = await printToFileAsync({
            html: html,
            base64: false,
        });

        await shareAsync(pdfFile.uri);
    }

    return (
        <Button title="Export PDF" onPress={exportPdf} />
    );
}
