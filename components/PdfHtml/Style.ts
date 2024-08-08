

export function Style() : string {
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
        </style>
    `
}