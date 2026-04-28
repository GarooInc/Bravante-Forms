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

### Document Generation (`src/components/DocumentoPromesa.tsx`)

This is the most complex component. It:
1. Fetches data from `VITE_API_URL/promesa-document` (POST with `{id}`)
2. Normalizes a deeply nested/variable webhook payload into the `WebhookData` shape
3. Adds 7 days to `FechaDocumento` before rendering
4. Routes to `JuridicaTemplate` or `IndividualTemplate` based on `TipoPersona`
5. Exposes helper functions (`getVal`, `getComprador`, `getParqueosDescripcion`, `getFechaFirma`, `getFechaLegalizacion`, `getSaldoFinal`, `getDireccionComprador`, `getPlazoMeses`, `getMesEntrega`) as props to templates
6. Supports export as Word (`.doc` via HTML blob) and browser print/PDF

### Templates (`src/components/templates/`)

- `IndividualTemplate.tsx` — legal document for individual buyers
- `JuridicaTemplate.tsx` — legal document for corporate buyers
- `DocumentStyles.tsx` — shared CSS-in-JSX styles for document rendering
- `types.ts` — canonical `WebhookData`, `TemplateProps`, and sub-interfaces
- `utils.ts` — number-to-Spanish-words conversion (`numberToWords`, `numberToWordsYear`, `formatCUI`, `cuiToWords`, `idToWords`, `toTitleCase`)

### Shared Types

`src/types/index.ts` exports `FileUpload { file: File | null; preview: string | null }`. This same interface is duplicated inline in several page files — use the shared type when editing.

### `UploadBox` Component

`src/components/UploadBox.tsx` is the reusable drag-and-drop file input used across all pages. Key props: `type` (field key), `fileData: FileUpload`, drag event handlers, and optional PDF preview link.

### Vite Config

`vite-plugin-node-polyfills` is required because `html-to-docx` (a Node library) is used in the browser. The polyfills include `buffer`, `stream`, `crypto`, and several others — do not remove them.

## Document Formatting Rules

When editing legal document templates, follow these conventions (see also `DOCUMENT_STRUCTURE_GUIDE.md`):

- All amounts in words must be **UPPERCASE** (e.g., `CIEN MIL QUETZALES`)
- DPI/CUI numbers in words use comma-separated blocks: `DOS MIL QUINIENTOS, SETENTA Y NUEVE MIL, MIL CUATROCIENTOS (2500 79000 1400)`
- Dynamic data fields must be wrapped in `<span className="bold highlight-yellow">`
- "Persona Jurídica" template must gender-match all legal pronouns to the `RepresentanteNombre` context
- Payment logic: `Pagos[0]` = reserva, `Pagos[1..n]` = cuotas mensuales; the saldo enganche = `ReservaNumeros - Pagos[0].value`
