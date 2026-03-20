import fs from 'fs';
import HTMLtoDOCX from 'html-to-docx';

const htmlString = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
<div class="documento-promesa shadow-xl">
    <div id="inicio" class="document-header">
        <div style="font-size: 28pt; font-family: 'Times New Roman', Times, serif; font-weight: bold; margin-bottom: 5px;">
            BRAVANTE
        </div>
        <p>Prueba con ñ y tildes</p>
    </div>
</div>
</body>
</html>`;

const run = async () => {
    try {
        const fileBuffer = await HTMLtoDOCX(htmlString, undefined, {
            margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        });
        fs.writeFileSync('test.docx', fileBuffer);
        console.log('test.docx written');
    } catch (e) {
        console.error(e);
    }
}
run();
