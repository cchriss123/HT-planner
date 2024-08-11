export function getStyle(): string {
    return `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 10px;
            }
            p {
                font-size: 12px;
                line-height: 1.5;
            }
            .zone-section {
                margin-bottom: 1rem; 
            }
            .zone-details {
                padding-left: 10px; 
            }
            .avoid-break {
                page-break-inside: avoid; 
            }
            .pdf-two-column-layout {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                box-sizing: border-box;
            }
            .pdf-column {
                width: 48%; 
                box-sizing: border-box; 
                padding-left: 10px;
                padding-right: 10px;
            }
        </style>
    `;
}
