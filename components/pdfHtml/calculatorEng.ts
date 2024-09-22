import { DonorZone, RecipientZone } from "@/state/Store";
import { getStyle } from "@/components/pdfCss/calculatorStyle";
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

    const donorZonesHtml = globalState.donorZones.map((zone) => `
    <div class="zone-section avoid-break">
        <div class="zone-details">
            <p class="zone-title">${zone.name}</p>
            <p class="zone-text">Caliber: ${zone.caliber}</p>
            <p class="zone-text">Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p class="zone-text">Hair per cm²: ${zone.hairPerCm2}</p>
            <p class="zone-text">Area: ${zone.area}</p>
            <p class="zone-text">Minimum Coverage Value: ${zone.minimumCoverageValue}</p>
            <p class="zone-text">Hair per Graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p class="zone-text">Grafts per Zone: ${zone.graftsInZone}</p>
            <p class="zone-text">Coverage Value: ${zone.coverageValue.toFixed(2)}</p>
            <p class="zone-text">Hair per Zone: ${zone.hairInZone}</p>
            <p class="zone-text">Grafts available for extraction: ${zone.availableForExtractionTotal}</p>
        </div>
    </div>`).join('');

    const recipientZonesHtmlJournal = globalState.recipientZones.map((zone) => `
    <div class="zone-section avoid-break">
        <div class="zone-details">
            <p class="zone-title">${zone.name}</p>            
            <p class="zone-text">Number of Grafts Planted in Frontal Zone: ${zone.graftsImplantedToReachRecipientDesiredCoverageValue}</p>
            <p class="zone-text">Caliber: ${zone.caliber}</p>
            <p class="zone-text">Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p class="zone-text">Hair per cm²: ${zone.hairPerCm2}</p>
            <p class="zone-text">Area: ${zone.area}</p>
            <p class="zone-text">Desired Coverage Value: ${zone.desiredCoverageValue}</p>
            <p class="zone-text">Hair per Graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p class="zone-text">Starting Coverage Value: ${zone.startingCoverageValue.toFixed(2)}</p>
            <p class="zone-text">Coverage Value Difference: ${zone.coverageValueDifference.toFixed(2)}</p>
            <p class="zone-text">Grafts Implanted to Reach Desired Coverage Value: ${zone.graftsImplantedToReachRecipientDesiredCoverageValue}</p>
        </div>
    </div>`).join('');

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
            <div class="grid-layout">
                <div>
                    <h4>Individual Hair Transplantation Plan</h4>
                    <p class="headerInfo"><strong>Name:</strong> ${name}</p>
                    <p class="headerInfo"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p class="headerInfo"><strong>Surgeon:</strong> Armin Soleimanpor</p>
                    <p class="headerInfo"><strong>Clinic:</strong> Göta Hårklinik</p>
                </div>
                <div style="display: flex; justify-content: center; align-items: center;">
                    <img src="${base64Image}" alt="Logo" style="max-width: 100px; max-height: 100px;">
                </div>
            </div>


            <hr class="section-divider">
            <h4 class="section-title">Assessment of Donor and Recipient Areas</h4>
            
            <div class="two-column-grid">
                <div class="zone-container">
                    <h4 class="zone-heading">Donor Area</h4>
                    ${donorZonesHtml}
                </div>
                <div class="zone-container">
                    <h5 class="zone-heading">Recipient Area</h5>
                    ${recipientZonesHtmlJournal}
                </div>
            </div>

        </div>
        </body>
        </html>
    `;
}
