# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check (tsc -b) then bundle
npm run lint      # ESLint check
npm run preview   # Preview production build
```

There are no tests in this project.

## Environment Variables

- `VITE_API_URL` — primary backend base URL (used by most pages)
- `VITE_API_URL_TEST` — alternate test backend URL

> Known issue: `Promesa.tsx` and `Cierre.tsx` use hardcoded webhook URLs (`https://agentsprod.redtec.ai/webhook/promesa` and `.../cierre`) instead of `VITE_API_URL`.

## Architecture Overview

Single-page React app for Bravante (real-estate firm). Each route corresponds to a step in the property purchase process, and each page collects specific documents from the buyer then POSTs them as `FormData` to the backend.

### Routing (`src/routes/AppRouter.tsx`)

| Path | Component | Purpose |
|---|---|---|
| `/` and `/:id` | `App.tsx` | Upload DPI front/back + utility bill |
| `/promesa/:id` | `Promesa.tsx` | Upload legal documents (Persona Jurídica or Individual) |
| `/promesafirma/:id` | `PromesaFirma.tsx` | View + upload signed promesa document |
| `/comprobante/:id/:cuota` | `Comprobante.tsx` | Upload payment receipt |
| `/cierre/:id` | `Cierre.tsx` | Upload closing documents (check, apartado form, contract) |

### Backend: N8N Workflow (Phase 4.3)

`VITE_API_URL/promesa-document` is served by the n8n workflow **PHASE4.3 - BRAVANTE: LLENAR DOCUMENTO LEGAL** (`xTNw4_8oAxaNDLxiaN0td` on `agentsprod.redtec.ai`). It receives `{ id }`, pulls data from MongoDB + Monday.com + the signed PDF, runs an OpenAI extraction, and returns the `WebhookData` JSON consumed by `DocumentoPromesa.tsx`. Full documentation: **`N8N_PHASE4_3_WORKFLOW.md`**.

### Document Generation (`src/components/DocumentoPromesa.tsx`)

This is the most complex component. It:
1. Fetches data from `VITE_API_URL/promesa-document` (POST with `{id}`)
2. Normalizes a deeply nested/variable webhook payload into the `WebhookData` shape — the normalization logic handles several different payload structures (direct object, array wrapper, `document_promesa_firma` nesting)
3. Adds 7 days to `FechaDocumento` before rendering (stored as `YYYY-MM-DD` top-level on `WebhookData`)
4. Routes to `JuridicaTemplate` or `IndividualTemplate` based on `TipoPersona`
5. Exposes helper functions (`getVal`, `getComprador`, `getParqueosDescripcion`, `getFechaFirma`, `getFechaLegalizacion`, `getSaldoFinal`, `getDireccionComprador`, `getPlazoMeses`, `getMesEntrega`) as props to templates
6. Exports as Word via an **HTML-as-MSWord blob** (not the `html-to-docx` library); also supports browser print/PDF

### Templates (`src/components/templates/`)

- `IndividualTemplate.tsx` — legal document for individual buyers
- `JuridicaTemplate.tsx` — legal document for corporate buyers
- `DocumentStyles.tsx` — shared CSS-in-JSX styles for document rendering
- `types.ts` — **canonical** `WebhookData`, `TemplateProps`, and sub-interfaces; prefer this over `src/utils/DocumentoHelpers.ts` which duplicates the same interfaces
- `utils.ts` — number-to-Spanish-words conversion: `numberToWords`, `numberToWordsYear` (hardcoded for years 2025–2030), `yearSuffixToWords`, `formatCUI`, `cuiToWords`, `idToWords`, `toTitleCase`

### Utility files (`src/utils/`)

- `DocumentoHelpers.ts` — duplicates `WebhookData` and re-exports interfaces; also has `numberToWords`, `yearSuffixToWords`, `formatDateToWords`. Treat `templates/types.ts` and `templates/utils.ts` as the source of truth.
- `promesaUtils.ts` — has `getValProp`, `getCompradorProp` path helpers and a **broken stub** `numberToWords` that just returns `num.toString()`. Do not use its `numberToWords`.

### Shared Types

`src/types/index.ts` exports `FileUpload { file: File | null; preview: string | null }`. This same interface is duplicated inline in several page files — use the shared type when editing.

### `UploadBox` Component

`src/components/UploadBox.tsx` is the reusable drag-and-drop file input used across all pages. Key props: `type` (field key), `fileData: FileUpload`, drag event handlers, and optional PDF preview link.

### Vite Config

`vite-plugin-node-polyfills` is required because `html-to-docx` (a Node library) is in `package.json` and was previously used in the browser. The polyfills include `buffer`, `stream`, `crypto`, and several others — do not remove them even though Word export now uses an HTML blob approach.

## Document Formatting Rules

When editing legal document templates, follow these conventions (see also `DOCUMENT_STRUCTURE_GUIDE.md`):

- All amounts in words must be **UPPERCASE** (e.g., `CIEN MIL QUETZALES`)
- DPI/CUI numbers in words use comma-separated blocks: `DOS MIL QUINIENTOS, SETENTA Y NUEVE MIL, MIL CUATROCIENTOS (2500 79000 1400)`
- Dynamic data fields must be wrapped in `<span className="bold highlight-yellow">`
- "Persona Jurídica" template must gender-match all legal pronouns to the `RepresentanteNombre` context
- Payment logic:
  - `Pagos[0]` = reserva (first payment/down payment)
  - `Pagos[1..n]` = cuotas mensuales (monthly installments)
  - Saldo enganche = `Condiciones_Economicas.ReservaNumeros - Pagos[0].value`
  - Monthly payment count = `Pagos.length - 1`
- `DatosJuridicos` has `ActaFechaDia`, `ActaFechaMes`, `ActaFechaAnio` derived from `ActaNotarialFecha` during normalization
- `Descripcion_del_Inmueble.Modelo` holds the apartment model name (may be split from `Apartamento` field when formatted as `"NUM / MODEL"`)
