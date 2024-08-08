import {DonorZone, RecipientZone, useAppState} from "@/state/Store";
interface AppStateContextType {
    totalGrafts: number;
    totalSingles: number;
    totalDoubles: number;
    totalTriples: number;
    totalQuadruples: number;
    donorZones: DonorZone[];
    recipientZones: RecipientZone[];

}

export function getCalculatorSwePdfHtml(name: string, globalState: AppStateContextType) : string {

    const donorZonesHtml = globalState.donorZones.map(zone => `
        <li style="page-break-inside: avoid;">
            <strong>${zone.name}</strong>
            <ul>
                <li>Kaliber: ${zone.caliber}</li>
                <li>Grafts per cm²: ${zone.graftsPerCm2}</li>
                <li>Hår per cm²: ${zone.hairPerCm2}</li>
                <li>Område: ${zone.area}</li>
                <li>Önskat täckningsvärde: ${zone.desiredCoverageValue}</li>
                <li>Hår per graft: ${zone.hairPerGraft?.toFixed(2)}</li>
                <li>Grafts per zon: ${zone.graftsPerZone}</li>
                <li>Täckningsvärde: ${zone.coverageValue.toFixed(2)}</li>
                <li>Hår per zon: ${zone.hairPerZone}</li>
                <li>Grafts extraherade för att nå önskat täckningsvärde: ${zone.graftsExtractedToReachDonorDesiredCoverageValue}</li>
                <li>Grafts kvar för att nå önskat täckningsvärde: ${zone.graftsLeftToReachDonorDesiredCoverageValue}</li>
            </ul>
        </li>
    `).join('');

    const recipientZonesHtml = globalState.recipientZones.map(zone => `
    <div style="display: inline-block; page-break-inside: avoid;">
        <p>${zone.name} grafts: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}<br></p>
    </div>
`).join('\n');



    const recipientZonesHtmlJournal = globalState.recipientZones.map(zone => `
        <li style="page-break-inside: avoid;">
            <h4>Recipientzoner</h4>
            <strong>${zone.name}</strong>
            <ul>
                <li>Antal grafts planterade i frontalzon: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</li>
                <li>Kaliber: ${zone.caliber}</li>
                <li>Grafts per cm²: ${zone.graftsPerCm2}</li>
                <li>Hår per cm²: ${zone.hairPerCm2}</li>
                <li>Område: ${zone.area}</li>
                <li>Önskat täckningsvärde: ${zone.desiredCoverageValue}</li>
                <li>Hår per graft: ${zone.hairPerGraft?.toFixed(2)}</li>
                <li>Starttäckningsvärde: ${zone.startingCoverageValue.toFixed(2)}</li>
                <li>Täckningsvärdeskillnad: ${zone.coverageValueDifference.toFixed(2)}</li>
                <li>Grafts implanterade för att nå önskat täckningsvärde: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</li>
            </ul>
        </li>
    `).join('');

    return `
        <!DOCTYPE html>
        <html lang="sv">
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
                }
                h1:empty {
                    margin: 300px;
                }
            </style>
        </head>
        <body>
        <div class="content-wrapper">

            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>Datum :</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Kirurg:</strong> Armin Soleimanpor</p>
            <p><strong>Klinik:</strong> Göta Hårklinik</p>
            <hr>
          
     

<!--            <h1 style="page-break-before: always;"></h1>-->


            <h4>Individuell plan för hårtransplantation</h4>
            <h4>Donor Area Assessment</h4>
            <hr>

            <ul>
                ${donorZonesHtml}
            </ul>
            <h4>Recipient Area Assessment</h4>
            <ul>
                ${recipientZonesHtmlJournal}
    
    
            
            
            <h1 style="page-break-before: always;"></h1>

        </div>
        </body>
        </html>
    `;
}


// <h4>Detaljerad Klinisk Information (För Patientens Journal)</h4>
// <h4>Bedömning av donatorområde</h4>
// <ul>
//     ${donorZonesHtml}
// </ul>
// <h4>Bedömning av recipientområde</h4>
// <ul>
//     ${recipientZonesHtmlJournal}
// </ul>