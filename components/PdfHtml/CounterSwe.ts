import { useAppState } from "@/state/Store";

export function getCounterSwePdfHtml(name: string) {
    const globalState = useAppState();

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
            <p>${zone.name}: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</p>
        </div>
    `).join('');

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
            <h2>Patientinformation</h2>
            <p>Denna rapport ger en kvantitativ sammanfattning av den hårtransplantationsprocedur som utförts. 
            Den innehåller specifik data om antalet och typen av extraherade och implanterade grafts, 
            samt detaljerade mätvärden relaterade till tillståndet i donator- och recipientområdena. 
            Dessa siffror ger en exakt överblick över ingreppets omfattning och resultat.</p>
            <p>Detta dokument fungerar också som ett kvalitetsintyg och bevis för implantationsprocessen, 
            vilket säkerställer transparens och ansvar.</p>
            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>Datum för ingreppet:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Kirurg:</strong> Armin Soleimanpor</p>
            <p><strong>Klinik:</strong> Göta Hårklinik</p>
            <hr>
            <h3>Sammanfattning för Patienten</h3>
            <h4>Totalt</h4>
            <p>Totalt antal extraherade grafts: ${globalState.totalGrafts}</p>
            <p>Totalt antal enkla grafts: ${globalState.totalSingles}</p>
            <p>Totalt antal dubbla grafts: ${globalState.totalDoubles}</p>
            <p>Totalt antal trippel grafts: ${globalState.totalTriples}</p>
            <p>Totalt antal fyrdubbel grafts: ${globalState.totalQuadruples}</p>
            <h4>Recipientzoner antal implanterade grafts</h4>
            <div>
                ${recipientZonesHtml}
            </div>
            <hr>
            <h4>Datum: ${new Date().toLocaleDateString()}</h4>
            <h4>Kirurgens signatur:</h4>
            <h1 style="page-break-before: always;"></h1>
            <h4>Detaljerad Klinisk Information (För Patientens Journal)</h4>
            <h4>Bedömning av donatorområde</h4>
            <ul>
                ${donorZonesHtml}
            </ul>
            <h4>Bedömning av recipientområde</h4>
            <ul>
                ${recipientZonesHtmlJournal}
            </ul>
        </div>
        </body>
        </html>
    `;
}
