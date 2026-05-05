# Bravante Forms - Project Status & Handover

**Última actualización:** 5 de mayo de 2026
**Estado General:** Desarrollo Activo - Fase de Pulido Legal

## 📋 Resumen del Proyecto
Bravante Forms es una aplicación React para el onboarding legal de compradores del proyecto inmobiliario "Bravante". Genera documentos de "Promesa de Compraventa" (Individual y Jurídica) consumiendo datos de un backend n8n que integra MongoDB, Monday.com y OCR de PDFs.

## 🚀 Cambios Recientes (Mayo 2026)
Se han aplicado correcciones críticas solicitadas mediante revisión notarial (basadas en `Trabajo.pdf`):

### 1. Formato Legal y Ortografía
- **DPI / CUI:** Se reemplazó la palabra "COMA" por el símbolo "," en todas las representaciones de texto del CUI.
- **Fechas:** Se eliminó la representación numérica entre paréntesis en las fechas de firma y legalización. Ahora es "solo letras" (ej. "...veinticuatro de diciembre de dos mil veinticinco").
- **Sanitización de Datos:** Se implementó una lógica (`stripLahar`) en `DocumentoPromesa.tsx` para eliminar automáticamente el texto redundante "(Lahar)" de los nombres de unidades y modelos provenientes del API.

### 2. Formato de Unidades (Parqueos y Bodegas)
- **Números en Letras:** Se eliminó la palabra "CERO" inicial (ej. "CINCO" en lugar de "CERO CINCO").
- **Números entre Paréntesis:** Se eliminó el "0" inicial dentro de los paréntesis (ej. "(5)" en lugar de "(05)").
- **Consistencia:** Estos cambios se aplicaron tanto en las listas detalladas de la Cláusula Primera como en el resumen de la Cláusula Segunda.

## 🛠 Stack Tecnológico
- **Frontend:** React 19 + TypeScript + Vite 7.
- **Estilos:** Tailwind CSS 4 + DaisyUI 5 + Inline Styles para documentos.
- **Generación de Docs:** `html-to-docx` (para Word) y `html2pdf.js` (para PDF).
- **Backend:** n8n Workflow (Fase 4.3).

## 📂 Estructura Crítica
- `src/components/DocumentoPromesa.tsx`: Motor principal de mapeo de datos y lógica de fechas.
- `src/components/templates/sections/`: Contiene los bloques legales divididos por cláusulas (Individual/Jurídica).
- `src/components/templates/utils.ts`: Funciones de conversión de números a letras y formateo de IDs.

## 🔗 Integraciones
- **API URL:** Configurada en `.env` vía `VITE_API_URL`.
- **Backend:** El workflow de n8n recibe un ID de MongoDB y devuelve el JSON estructurado para el documento.

## 📝 Tareas Pendientes / Notas para el Futuro
- **Validación de Datos:** Asegurarse de que el API envíe todos los campos necesarios; de lo contrario, el sistema usa fallbacks como `[DATO_FALTANTE]`.
- **Estilos de Impresión:** Si se agregan cláusulas largas, revisar los saltos de página en `DocumentStyles.tsx`.

---
*Este documento sirve como punto de partida para cualquier desarrollador o IA que retome el proyecto.*
