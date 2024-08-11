export function getStyle(): string {
    return `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 10px;
            }
            .content-wrapper {
                margin: 10px;
            }
            .zone-section {
                break-inside: avoid;
                margin-bottom: 1rem;
            }
            .zone-details {
                padding-left: 10px;
            }
            .zone-title {
                font-size: 12px;
                font-weight: bold;
            }
            .zone-text {
                font-size: 10px;
                margin: 2px 0;
            }
            .section-divider {
                margin: 20px 0;
            }
            .section-title {
                margin-bottom: 5px;
                font-size: 14px;
            }
            .grid-layout {
                display: grid; 
                grid-template-columns: 1fr 1fr; 
                width: 100%; 
                margin-bottom: 20px;
            }
            .header-left {
                padding: 10px;
            }
            .header-right {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
            }
            .two-column-grid {
                display: grid; 
                grid-template-columns: 1fr 1fr; 
                grid-gap: 20px;
            }
            .zone-container {
                break-inside: avoid; 
                padding: 10px;
            }
            .zone-heading {
                margin-top: 5px; 
                margin-bottom: 5px;
                font-size: 12px;
            }
            .logo {
                max-width: 100px;
                max-height: 100px;
            }
            .headerInfo {
                font-size: 12px;
                margin: 2px 0;
            }
        </style>
    `;
}
