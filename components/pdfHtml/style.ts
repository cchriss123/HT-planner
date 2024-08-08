export function getStyle() : string {
    return `
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
            .summary-section {
                display: flex;
                justify-content: space-between;
                gap: 20px; /* Adds space between the columns */
            }
            .summary-column {
                flex: 1;
                border-radius: 4px;
                background-color: #f9f9f9;
            }
        </style>
    `;
}