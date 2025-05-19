import { getStyle } from "@/components/pdfCss/counterStyle";
import { getLogo } from "@/components/pdfHtml/logo";
import {DonorZone, RecipientZone} from "@/types/zones";
import { calculateTotalGrafts } from "@/calculations/calculations";


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

export function getCounterEngPdfHtml(name: string, globalState: AppStateContextType): string {
    const recipientZonesHtml = globalState.recipientZones.map(zone => `
        <div style="display: block; page-break-inside: avoid;">
            <p>${zone.name}: ${zone.graftsImplantedToReachRecipientDesiredCoverageValue} grafts</p>
        </div>
    `).join('\n');

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

            <h3>Patient Information</h3>
            <p>This report provides a quantitative summary of the hair transplantation procedure performed. 
            It contains specific data on the number and type of grafts extracted and implanted, 
            as well as detailed metrics related to the condition of the donor and recipient areas. 
            These figures give an accurate overview of the scope and results of the procedure.</p>
            <p>This document also serves as a quality certificate and proof of the implantation process, 
            ensuring transparency and accountability.</p>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Date of Procedure:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Surgeon:</strong> Armin Soleimanpor</p>
            <p><strong>Clinic:</strong> Göta Hair Clinic</p>
            
            
            <hr>


            <div class="summary-section">
                <div class="summary-column">
                    <h4>Extraction</h4>
                    <p>Total number of grafts extracted: ${globalState.totalGrafts}</p>
                    <p>Total number of single grafts: ${globalState.totalSingles}</p>
                    <p>Total number of double grafts: ${globalState.totalDoubles}</p>
                    <p>Total number of triple grafts: ${globalState.totalTriples}</p>
                    <p>Total number of quadruple grafts: ${globalState.totalQuadruples}</p>
                    <p>% extracted grafts: ${Math.round((globalState.totalGrafts / calculateTotalGrafts(globalState.donorZones)) * 100)}%</p>
                </div>
                <div class="summary-column">
                    <h4>Implantation</h4>
                    <div>
                        ${recipientZonesHtml}
                    </div>
                </div>
            </div>
            <hr>
            <h3>Surgeon's Signature:</h3>
            <h1 style="page-break-before: always;"></h1>
            
            
        </div>
        </body>
        </html>
    `;
}
