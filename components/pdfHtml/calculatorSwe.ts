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
    <div class="zone-section" style="break-inside: avoid; margin-bottom: 1rem;">
        <div class="zone-details" style="padding-left: 10px;">
            <p><strong>${zone.name}</strong></p>
            <p style="font-size: 10px;">Kaliber: ${zone.caliber}</p>
            <p style="font-size: 10px;">Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p style="font-size: 10px;">Hår per cm²: ${zone.hairPerCm2}</p>
            <p style="font-size: 10px;">Område: ${zone.area}</p>
            <p style="font-size: 10px;">Önskat täckningsvärde: ${zone.desiredCoverageValue}</p>
            <p style="font-size: 10px;">Hår per graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p style="font-size: 10px;">Grafts per zon: ${zone.graftsPerZone}</p>
            <p style="font-size: 10px;">Täckningsvärde: ${zone.coverageValue.toFixed(2)}</p>
            <p style="font-size: 10px;">Hår per zon: ${zone.hairPerZone}</p>
            <p style="font-size: 10px;">Grafts extraherade för att nå önskat täckningsvärde: ${zone.graftsExtractedToReachDonorDesiredCoverageValue}</p>
        </div>
    </div>`).join('');

    const recipientZonesHtmlJournal = globalState.recipientZones.map((zone) => `
    <div class="zone-section" style="break-inside: avoid; margin-bottom: 1rem;">
        <div class="zone-details" style="padding-left: 10px;">
            <p><strong>${zone.name}</strong></p>            
            <p style="font-size: 10px;">Antal grafts planterade i frontalzon: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</p>
            <p style="font-size: 10px;">Kaliber: ${zone.caliber}</p>
            <p style="font-size: 10px;">Grafts per cm²: ${zone.graftsPerCm2}</p>
            <p style="font-size: 10px;">Hår per cm²: ${zone.hairPerCm2}</p>
            <p style="font-size: 10px;">Område: ${zone.area}</p>
            <p style="font-size: 10px;">Önskat täckningsvärde: ${zone.desiredCoverageValue}</p>
            <p style="font-size: 10px;">Hår per graft: ${zone.hairPerGraft?.toFixed(2)}</p>
            <p style="font-size: 10px;">Starttäckningsvärde: ${zone.startingCoverageValue.toFixed(2)}</p>
            <p style="font-size: 10px;">Täckningsvärdeskillnad: ${zone.coverageValueDifference.toFixed(2)}</p>
            <p style="font-size: 10px;">Grafts implanterade för att nå önskat täckningsvärde: ${zone.graftsImplantedToReachDesiredRecipientCoverageValue}</p>
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
        <div class="content-wrapper" style="font-family: Arial, sans-serif; margin: 10px;">

            <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 20px; width: 100%; margin-bottom: 20px;">
                <div style="padding: 10px;">
                    <h3>Individuell plan för hårtransplantation</h3>
                    <p><strong>Namn:</strong> ${name}</p>
                    <p><strong>Datum:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Kirurg:</strong> Armin Soleimanpor</p>
                    <p><strong>Klinik:</strong> Göta Hårklinik</p>
                </div>
                <div style="display: flex; justify-content: center; align-items: center; padding: 10px;">
                    <img src="${base64Image}" alt="Logo" style="max-width: 100px; max-height: 100px;">
                </div>
            </div>

            <hr style="margin: 20px 0;">

            <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 20px;">
                <div style="break-inside: avoid; padding: 10px;">
                    <h5 style="margin-top: 5px; margin-bottom: 5px;">Donatorområde</h5>
                    ${donorZonesHtml}
                </div>
                <div style="break-inside: avoid; padding: 10px;">
                    <h5 style="margin-top: 5px; margin-bottom: 5px;">Mottagarområde</h5>
                    ${recipientZonesHtmlJournal}
                </div>
            </div>
        </div>
        </body>
        </html>
    `;
}
