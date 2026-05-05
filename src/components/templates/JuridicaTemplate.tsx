import React from "react";
import type { TemplateProps, DatosJuridicos } from "./types";
import { DocumentStyles } from "./DocumentStyles";
import { formatCUI, numberToWords } from "./utils";

// Sub-sections
import { JuridicaIntroduction } from "./sections/juridica/JuridicaIntroduction";
import { JuridicaClause1To2 } from "./sections/juridica/JuridicaClause1To2";
import { JuridicaClause3 } from "./sections/juridica/JuridicaClause3";
import { JuridicaGeneralClauses } from "./sections/juridica/JuridicaGeneralClauses";
import { JuridicaSignatures } from "./sections/juridica/JuridicaSignatures";

export const JuridicaTemplate: React.FC<TemplateProps> = (props) => {
    const {
        data,
        getVal,
        getDireccionComprador,
    } = props;

    if (!data) return null;

    const datosJuridicos = getVal<DatosJuridicos>("Datos_Juridicos", {});

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
            .join(", ");
    };

    return (
        <div className="documento-promesa shadow-xl">
            <DocumentStyles />

            <JuridicaIntroduction 
                {...props}
                datosJuridicos={datosJuridicos}
                dpiToLetras={dpiToLetras}
            />

            <JuridicaClause1To2 
                {...props}
            />

            <JuridicaClause3 
                {...props}
            />

            <JuridicaGeneralClauses 
                getDireccionComprador={getDireccionComprador}
            />

            <JuridicaSignatures 
                {...props}
                datosJuridicos={datosJuridicos}
                dpiToLetras={dpiToLetras}
                formatCUI={formatCUI}
                numberToWords={numberToWords}
            />
        </div>
    );
};
