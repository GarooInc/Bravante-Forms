# GEMINI.md - Bravante Forms

## Project Overview
**Bravante Forms** is a specialized web application designed to facilitate the collection of identification documents and the generation of legal "Promesa de Compraventa" (Promise to Buy/Sell) documents for the "Bravante" real estate project. 

The application streamlines the legal onboarding process for buyers, supporting both individual and corporate ("jurídica") legal personas. It handles document uploads with validation and renders complex legal templates with data fetched from a centralized API.

### Main Technologies
- **Frontend Framework:** React 19 (TypeScript)
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4 + DaisyUI 5
- **Routing:** React Router 7
- **Document Generation:** `html-to-docx`, `html2pdf.js`
- **Integrations:** REST API (configured via `VITE_API_URL`)

## Architecture
The project follows a standard React application structure:
- `src/components/`: Reusable UI components.
  - `templates/`: Specialized legal document templates (`JuridicaTemplate`, `IndividualTemplate`) and their corresponding styles and utilities.
- `src/pages/`: Main view components representing the different stages of the process:
  - `App.tsx`: Initial document upload form.
  - `Promesa.tsx`: Viewing and managing the "Promesa" document.
  - `PromesaFirma.tsx`: Signature phase.
  - `Comprobante.tsx`: Payment receipt handling.
  - `Cierre.tsx`: Closing stage.
- `src/routes/`: Route definitions using `AppRouter`.
- `src/utils/`: Business logic, formatting helpers, and data extraction utilities.
- `src/types/`: TypeScript definitions and interfaces.

## Building and Running
The following commands are defined in `package.json`:

- **Development:** `npm run dev` (starts the Vite development server)
- **Build:** `npm run build` (compiles TypeScript and builds for production)
- **Lint:** `npm run lint` (runs ESLint)
- **Preview:** `npm run preview` (previews the production build locally)

## Development Conventions
- **TypeScript:** Strict typing is used throughout the project. Interfaces are defined in `src/types` and component-specific types in `src/components/templates/types.ts`.
- **Styling:** Tailwind CSS is used for layouts, while specialized legal documents use a mix of Tailwind and inline styles (via `DocumentStyles.tsx`) to ensure consistent rendering across PDF and Word exports.
- **Data Fetching:** API calls are performed using `fetch` with environment variables for the base URL. Error handling and loading states are standard across main pages.
- **Document Logic:** Complex data mapping from the API (which often returns nested objects or webhook-style payloads) is handled in `DocumentoPromesa.tsx` before being passed to templates.

## Key Files
- `src/routes/AppRouter.tsx`: Centralized routing logic.
- `src/components/DocumentoPromesa.tsx`: The core engine that fetches, maps, and manages the state for legal document generation.
- `src/components/templates/utils.ts`: Contains critical formatting functions for legal documents (e.g., converting numbers to Spanish words, formatting IDs/CUI).
- `src/App.tsx`: Entry point for the document upload workflow.
