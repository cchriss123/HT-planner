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

export function getCalculatorSwePdfHtml(name: string, globalState: AppStateContextType): string {

    const donorZonesHtml = globalState.donorZones.map((zone) => `
    <div class="zone-section avoid-break">
        <div class="zone-details">
            <p class="zone-title">${zone.name}</p>
            <p class="zone-text">Kaliber: ${zone.caliber}</p>
            <p class="zone-text">Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p class="zone-text">Hår per cm²: ${zone.hairPerCm2}</p>
            <p class="zone-text">Område: ${zone.area} cm²</p>
            <p class="zone-text">Lägsta önskvärda täckningsvärde: ${zone.minimumCoverageValue}</p>
            <p class="zone-text">Hår per graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p class="zone-text">Grafts per zon: ${zone.graftsInZone}</p>
            <p class="zone-text">Täckningsvärde före operation: ${zone.coverageValue.toFixed(2)}</p>
            <p class="zone-text">Hår per zon: ${zone.hairInZone}</p>
            <p class="zone-text">Grafts tillgängliga för extrahering: ${zone.availableForExtraction}</p>
            <p class="zone-text">Grafts att extrahera: ${zone.graftsToExtract}</p>
        </div>
    </div>`).join('');

    const recipientZonesHtmlJournal = globalState.recipientZones.map((zone) => `
    <div class="zone-section avoid-break">
        <div class="zone-details">
            <p class="zone-title">${zone.name}</p>            
            <p class="zone-text">Antal grafts planterade i frontalzon: ${Math.round(zone.graftsImplantedToReachRecipientDesiredCoverageValue)}</p>
            <p class="zone-text">Kaliber: ${zone.caliber}</p>
            <p class="zone-text">Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p class="zone-text">Hår per cm²: ${zone.hairPerCm2}</p>
            <p class="zone-text">Område: ${zone.area}</p>
            <p class="zone-text">Önskat täckningsvärde: ${zone.desiredCoverageValue}</p>
            <p class="zone-text">Hår per graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p class="zone-text">Täckningsvärde före operation: ${zone.startingCoverageValue.toFixed(2)}</p>
            <p class="zone-text">Täckningsvärdeskillnad: ${zone.coverageValueDifference.toFixed(2)}</p>
        </div>
    </div>`).join('');

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
            <div class="grid-layout">
                <div>
                    <h4>Individuell plan för hårtransplantation</h4>
                    <p class="headerInfo"><strong>Namn:</strong> ${name}</p>
                    <p class="headerInfo"><strong>Datum:</strong> ${new Date().toLocaleDateString()}</p>
                    <p class="headerInfo"><strong>Kirurg:</strong> Armin Soleimanpor</p>
                    <p class="headerInfo"><strong>Klinik:</strong> Göta Hårklinik</p>
                </div>
                <div style="display: flex; justify-content: center; align-items: center;">
                    <img src="${base64Image}" alt="Logo" style="max-width: 100px; max-height: 100px;">
                </div>
            </div>


            <hr class="section-divider">
            <h4 class="section-title">Bedömning av donatorområde och mottagarområde</h4>
            
            <div class="two-column-grid">
                <div class="zone-container">
                    <h4 class="zone-heading">Donatorområde</h4>
                    ${donorZonesHtml}
                </div>
                <div class="zone-container">
                    <h5 class="zone-heading">Mottagarområde</h5>
                    ${recipientZonesHtmlJournal}
                </div>
            </div>

        </div>
        </body>
        </html>
    `;
}
