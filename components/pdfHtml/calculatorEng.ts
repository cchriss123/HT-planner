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

export function getCalculatorEngPdfHtml(name: string, globalState: AppStateContextType): string {

    const donorZonesHtml = globalState.donorZones.map(zone => `
    <div class="zone-section avoid-break">
        <div class="zone-details">
            <h5>${zone.name}</h5>
            <p>Caliber: ${zone.caliber}</p>
            <p>Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p>Hair per cm²: ${zone.hairPerCm2}</p>
            <p>Area: ${zone.area}</p>
            <p>Desired coverage value: ${zone.desiredCoverageValue}</p>
            <p>Hair per graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p>Grafts per zone: ${zone.graftsPerZone}</p>
            <p>Coverage value: ${zone.coverageValue.toFixed(2)}</p>
            <p>Hair per zone: ${zone.hairPerZone}</p>
            <p>Grafts extracted to reach desired coverage value: ${zone.graftsExtractedToReachDonorDesiredCoverageValue}</p>
            <p>Grafts left to reach desired coverage value: ${zone.graftsLeftToReachDonorDesiredCoverageValue}</p>
        </div>
    </div>
`).join('');

    const recipientZonesHtmlJournal = globalState.recipientZones.map(zone => `
    <div class="zone-section avoid-break">
        <div class="zone-details">
            <h5>${zone.name}</h5>
            <p>Grafts implanted in the frontal zone: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</p>
            <p>Caliber: ${zone.caliber}</p>
            <p>Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p>Hair per cm²: ${zone.hairPerCm2}</p>
            <p>Area: ${zone.area}</p>
            <p>Desired coverage value: ${zone.desiredCoverageValue}</p>
            <p>Hair per graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p>Starting coverage value: ${zone.startingCoverageValue.toFixed(2)}</p>
            <p>Coverage value difference: ${zone.coverageValueDifference.toFixed(2)}</p>
            <p>Grafts implanted to reach desired coverage value: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</p>
        </div>
    </div>
`).join('');

    return `
        <!DOCTYPE html>
        <html lang="en">
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
        
            <h3>Individual Plan for Hair Transplantation</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Surgeon:</strong> Armin Soleimanpor</p>
            <p><strong>Clinic:</strong> Göta Hair Clinic</p>
          
            <h4>Assessment of Donor and Recipient Areas</h4>
            <div class="pdf-two-column-layout">
                <div class="pdf-column">
                    <h4>Donor Area</h4>
                    ${donorZonesHtml}
                </div>
                <div class="pdf-column">
                    <h4>Recipient Area</h4>
                    ${recipientZonesHtmlJournal}
                </div>
            </div>
    
        </div>
        </body>
        </html>
    `;
}
