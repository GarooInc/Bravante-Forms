
export const DocumentStyles = () => (
    <style>{`
        .documento-promesa {
            background-color: white;
            padding: 35mm 25mm;
            color: #1e293b;
            font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.35;
            text-align: justify;
            font-size: 11pt;
            width: 216mm;
            margin: 0 auto;
            position: relative;
            box-sizing: border-box;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }

        .document-header {
            text-align: center;
            margin-bottom: 50px;
        }

        .document-title {
            font-weight: bold;
            font-size: 13pt;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }

        .section-spacing {
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .party-name {
            font-weight: bold;
        }

        .bold {
            font-weight: bold;
        }

        .highlight-yellow, .highlight-red, .dynamic-data {
            font-weight: bold;
            color: #16a34a; /* Vibrant green (Tailwind green-600) */
            background-color: transparent;
        }

        .clause-title {
            font-weight: bold;
            text-decoration: underline;
        }

        p {
            margin: 0 0 10px 0;
        }

        .dynamic-data {
            font-weight: bold;
        }

        .blank-field {
            display: inline-block;
            min-width: 70px;
            border-bottom: 1.5px solid #555;
            cursor: help;
            vertical-align: bottom;
        }

        @media print {
            .no-print { display: none !important; }
            .documento-promesa {
                margin: 0 !important;
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
            }
            body { background: white !important; }
            .blank-field {
                border-bottom: 1.5px solid #000;
                cursor: default;
            }
        }
    `}</style>
);
