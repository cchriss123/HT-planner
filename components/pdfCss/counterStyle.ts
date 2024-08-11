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
            .summary-section {
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
            }
            .summary-column {
                width: 48%; 
                box-sizing: border-box;
                padding-left: 10px;
                padding-right: 10px;
            }
        </style>
    `;
}
