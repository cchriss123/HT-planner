import {getStyle} from "@/components/pdfCss/counterStyle";
import {getLogo} from "@/components/pdfHtml/logo";
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

export function getCounterSwePdfHtml(name: string, globalState: AppStateContextType): string {
    const recipientZonesHtml = globalState.recipientZones.map(zone => `
        <div style="display: block; page-break-inside: avoid;">
            <p>${zone.name}: ${zone.graftsImplantedToReachRecipientDesiredCoverageValue} grafts</p>
        </div>
    `).join('\n');

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

            <h3>Patientinformation</h3>
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


            <div class="summary-section">
                <div class="summary-column">
                    <h4>Extraktion</h4>
                    <p>Totalt antal extraherade grafts: ${globalState.totalGrafts}</p>
                    <p>Totalt antal enkla grafts: ${globalState.totalSingles}</p>
                    <p>Totalt antal dubbla grafts: ${globalState.totalDoubles}</p>
                    <p>Totalt antal trippel grafts: ${globalState.totalTriples}</p>
                    <p>Totalt antal fyrdubbel grafts: ${globalState.totalQuadruples}</p>
                    <p>% harvested grafts: ${Math.round((globalState.totalGrafts / calculateTotalGrafts(globalState.donorZones)) * 100)}%</p>
                </div>
                <div class="summary-column">
                    <h4>Implantation</h4>
                    <div>
                        ${recipientZonesHtml}
                    </div>
                </div>
            </div>
            <hr>
            <h3>Kirurgens signatur:</h3>
            <h1 style="page-break-before: always;"></h1>
            
            
        </div>
        </body>
        </html>
    `;
}


