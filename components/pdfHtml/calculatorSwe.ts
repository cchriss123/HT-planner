import { DonorZone, RecipientZone } from "@/state/Store";
import { getStyle } from "@/components/pdfHtml/style";
import { getLogo } from "@/components/pdfHtml/logo";

interface AppStateContextType {
    totalGrafts: number;
    totalSingles: number;
    totalDoubles: number;
    totalTriples: number;
    totalQuadruples: number;
    donorZones: DonorZone[];
    recipientZones: RecipientZone[];
}

const base64Image = getLogo();

export function getCalculatorSwePdfHtml(name: string, globalState: AppStateContextType): string {

    const donorZonesHtml = globalState.donorZones.map(zone => `
    <div class="zone-section avoid-break">
        <div class="zone-details">
            <h5>${zone.name}</h5>
            <p>Kaliber: ${zone.caliber}</p>
            <p>Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p>Hår per cm²: ${zone.hairPerCm2}</p>
            <p>Område: ${zone.area}</p>
            <p>Önskat täckningsvärde: ${zone.desiredCoverageValue}</p>
            <p>Hår per graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p>Grafts per zon: ${zone.graftsPerZone}</p>
            <p>Täckningsvärde: ${zone.coverageValue.toFixed(2)}</p>
            <p>Hår per zon: ${zone.hairPerZone}</p>
            <p>Grafts extraherade för att nå önskat täckningsvärde: ${zone.graftsExtractedToReachDonorDesiredCoverageValue}</p>
            <p>Grafts kvar för att nå önskat täckningsvärde: ${zone.graftsLeftToReachDonorDesiredCoverageValue}</p>
        </div>
    </div>
`).join('');

    const recipientZonesHtmlJournal = globalState.recipientZones.map(zone => `
    <div class="zone-section avoid-break">
        <div class="zone-details">
            <h5>${zone.name}</h5>
            <p>Antal grafts planterade i frontalzon: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</p>
            <p>Kaliber: ${zone.caliber}</p>
            <p>Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p>Hår per cm²: ${zone.hairPerCm2}</p>
            <p>Område: ${zone.area}</p>
            <p>Önskat täckningsvärde: ${zone.desiredCoverageValue}</p>
            <p>Hår per graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p>Starttäckningsvärde: ${zone.startingCoverageValue.toFixed(2)}</p>
            <p>Täckningsvärdeskillnad: ${zone.coverageValueDifference.toFixed(2)}</p>
            <p>Grafts implanterade för att nå önskat täckningsvärde: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</p>
        </div>
    </div>
`).join('');


    return `
        <!DOCTYPE html>
        <html lang="sv">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PDF Export</title>
            ${getStyle()}
        </head>
        <body>
        <div class="content-wrapper">
        
             <div style="text-align:center; padding: 20px;">
                 <img src="${base64Image}" alt="Logo" style="max-width: 60px; max-height: 60px; margin: 0 auto;">
            </div>
        
            <h3>Individuell plan för hårtransplantation</h3>
            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>Datum:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Kirurg:</strong> Armin Soleimanpor</p>
            <p><strong>Klinik:</strong> Göta Hårklinik</p>
          
            <h4>Bedömning av donatorområde</h4>

            <div>
                ${donorZonesHtml}
            </div>
               
            <hr>
   
<!--            <div style="page-break-before: always;"></div>-->

            <h4>Bedömning av mottagarområde</h4>
            <div>
                ${recipientZonesHtmlJournal}
            </div>
    
        </div>
        </body>
        </html>
    `;
}
