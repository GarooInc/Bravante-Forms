import React from "react";
import type { TemplateProps, Comprador } from "./types";
import { DocumentStyles } from "./DocumentStyles";
import { toTitleCase, formatCUI, numberToWords } from "./utils";

// Sub-sections
import { IndividualIntroduction } from "./sections/individual/IndividualIntroduction";
import { IndividualClause1To2 } from "./sections/individual/IndividualClause1To2";
import { IndividualClause3 } from "./sections/individual/IndividualClause3";
import { IndividualGeneralClauses } from "./sections/individual/IndividualGeneralClauses";
import { IndividualSignatures } from "./sections/individual/IndividualSignatures";

export const IndividualTemplate: React.FC<TemplateProps> = (props) => {
    const {
        data,
        getVal,
        getDireccionComprador,
    } = props;

    if (!data) return null;

    const compradores = getVal<Comprador[]>("Compradores", []);

    // Internal Helpers
    const isFemale = (c: Comprador | any) => {
        const estado = (c.EstadoCivil || "").toLowerCase();
        if (["casada", "soltera", "divorciada", "viuda", "unida"].includes(estado)) return true;
        if (["casado", "soltero", "divorciado", "viudo", "unido"].includes(estado)) return false;
        
        const firstName = (c.Nombre || "").trim().split(' ')[0].toLowerCase();
        if (firstName.endsWith("a") && !["luca"].includes(firstName)) return true;
        const femaleNames = ["carmen", "ruth", "miriam", "lilian", "evelyn", "mabel", "maribel", "marisol", "beatriz", "astrid", "ingrid", "karen", "shirley", "helen", "gladys", "doris", "ivonne", "judith", "raquel", "abigail", "sarai", "margarita", "isabel", "pilar", "dolores", "rosario"];
        return femaleNames.includes(firstName);
    };

    const getNacionalidad = (c: Comprador | any) => {
        const nac = (c.Nacionalidad || "").toLowerCase();
        const fem = isFemale(c);
        if (nac === "guatemala" || nac === "guatemalteco" || nac === "guatemalteca") return fem ? "guatemalteca" : "guatemalteco";
        if (nac === "el salvador") return fem ? "salvadoreña" : "salvadoreño";
        if (nac === "honduras") return fem ? "hondureña" : "hondureño";
        if (nac === "mexico" || nac === "méxico") return fem ? "mexicana" : "mexicano";
        return nac;
    };

    const getProfesion = (c: Comprador | any) => {
        let prof = (c.Profesion || "").toLowerCase().trim();
        if (isFemale(c)) {
            if (prof.endsWith("o")) {
                if (prof === "medico" || prof === "médico") return "médica";
                prof = prof.slice(0, -1) + "a";
            } else if (prof.endsWith("or")) {
                prof = prof + "a";
            }
        }
        return toTitleCase(prof);
    };

    const getPartyLabel = (comps: any[]) => {
        if (comps.length > 1) {
            const allFemale = comps.every(c => isFemale(c));
            return allFemale ? "LAS PROMITENTES COMPRADORAS" : "LOS PROMITENTES COMPRADORES";
        } else if (comps.length === 1) {
            return isFemale(comps[0]) ? "LA PROMITENTE COMPRADORA" : "EL PROMITENTE COMPRADOR";
        }
        return "EL PROMITENTE COMPRADOR";
    };

    const getSecondaryPartyLabel = () => {
        return "LA PARTE PROMITENTE COMPRADORA";
    };

    const dpiToLetras = (dpi: string): string => {
        if (!dpi) return "";
        const normalizado = formatCUI(dpi);
        return normalizado
            .trim()
            .split(/\s+/)
            .map((bloque) => {
                if (bloque.length > 1 && bloque.startsWith("0")) {
                    let ceros = "";
                    let i = 0;
                    while (i < bloque.length && bloque[i] === "0") {
                        ceros += "CERO ";
                        i++;
                    }
                    if (i === bloque.length) return ceros.trim();
                    return ceros + numberToWords(parseInt(bloque.slice(i), 10));
                }
                return numberToWords(parseInt(bloque, 10));
            })
            .join(" COMA ");
    };

    return (
        <div className="documento-promesa shadow-xl">
            <DocumentStyles />

            <IndividualIntroduction 
                {...props}
                compradores={compradores}
                getProfesion={getProfesion}
                getNacionalidad={getNacionalidad}
                dpiToLetras={dpiToLetras}
                getPartyLabel={getPartyLabel}
                getSecondaryPartyLabel={getSecondaryPartyLabel}
            />

            <IndividualClause1To2 
                {...props}
                compradores={compradores}
            />

            <IndividualClause3 
                {...props}
            />

            <IndividualGeneralClauses 
                compradores={compradores}
                getDireccionComprador={getDireccionComprador}
            />

            <IndividualSignatures 
                {...props}
                compradores={compradores}
            />
        </div>
    );
};
