import React from "react";
import type { TemplateProps, DatosJuridicos } from "../../types";
import { formatCUI, numberToWords, numberToWordsYear, toTitleCase } from "../../utils";

interface JuridicaIntroductionProps extends TemplateProps {
    datosJuridicos: DatosJuridicos;
    dpiToLetras: (dpi: string) => string;
}

export const JuridicaIntroduction: React.FC<JuridicaIntroductionProps> = ({
    getVal,
    datosJuridicos,
    dpiToLetras,
}) => {
    return (
        <>
            <div id="inicio" className="document-header">
                <div
                    style={{
                        fontSize: "28pt",
                        fontFamily: "'Times New Roman', Times, serif",
                        fontWeight: "bold",
                        marginBottom: "5px",
                    }}
                >
                    BRAVANTE
                </div>
                <div
                    style={{
                        fontSize: "12pt",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        marginBottom: "5px",
                    }}
                >
                    PROMESA DE COMPRAVENTA
                </div>
                <div
                    style={{
                        fontSize: "12pt",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        marginBottom: "5px",
                    }}
                >
                    APARTAMENTO{" "}
                    <span className="highlight-red">
                        {getVal(
                            "Descripcion_del_Inmueble.Apartamento",
                            "[APARTAMENTO]",
                        )}
                    </span>{" "}
                    -{" "}
                    <span className="highlight-red">
                        {getVal("Descripcion_del_Inmueble.Torre", "[TORRE]")}
                    </span>
                </div>
                <div
                    style={{
                        fontSize: "12pt",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        marginBottom: "30px",
                    }}
                >
                    COMPLEJO DE APARTAMENTOS "BRAVANTE"
                </div>
            </div>

            <div className="section-spacing">
                <p>
                    <span className="bold">Yo, VENANCIO GÓMEZ</span> (único
                    apellido), quien declaro ser de cincuenta y cinco años de
                    edad, casado, Contador Público y Auditor, guatemalteco, de
                    este domicilio, me identifico con el Documento Personal de
                    Identificación -DPI- con Código Único de Identificación
                    -CUI- <span className="bold highlight-yellow">DOS MIL QUINIENTOS CUARENTA COMA SETENTA Y NUEVE MIL
                    DOSCIENTOS VEINTINUEVE COMA MIL CUATROCIENTOS UNO (2540 79229
                    1401)</span>, extendido por el Registro Nacional de las Personas de
                    la República de Guatemala, comparezco en mi calidad de{" "}
                    <span className="bold">
                        ADMINISTRADOR ÚNICO Y REPRESENTANTE LEGAL de la entidad
                        BRAVANTE, SOCIEDAD ANÓNIMA
                    </span>{" "}
                    calidad que acredita con mi nombramiento como tal contenido
                    en el acta notarial autorizada en esta ciudad el veintisiete
                    de octubre de dos mil veinticinco, por la Notaria Lilian
                    Elizabeth Azurdia Pérez de Quiroz, el cual se encuentra
                    debidamente inscrito en el Registro Mercantil General de la
                    República de Guatemala bajo el número de registro
                    ochocientos doce mil veintisiete (812027), folio quinientos
                    cuarenta y cuatro (544), del libro ochocientos cincuenta y
                    tres (853) de Auxiliares de Comercio, entidad en adelante
                    referida simple e indistintamente como{" "}
                    <span className="bold">
                        "LA PARTE PROMITENTE VENDEDORA" o "LA PROMITENTE
                        VENDEDORA"
                    </span>
                    ;
                </p>

                <p>
                    Yo,{" "}
                    <span className="bold highlight-yellow">
                        {datosJuridicos.RepresentanteNombre ||
                            "[NOMBRE_REPRESENTANTE]"}
                    </span>
                    , quien declaro ser de{" "}
                    <span className="bold highlight-yellow">
                        {(datosJuridicos.RepresentanteEdadLetras || "").toLowerCase() ||
                            "[EDAD_LETRAS_REPRESENTANTE]"}
                    </span>{" "}
                    años de edad,{" "}
                    <span className="bold highlight-yellow">
                        {(
                            datosJuridicos.RepresentanteEstadoCivil ||
                            "[ESTADO_CIVIL]"
                        ).toLowerCase()}
                    </span>
                    ,{" "}
                    <span className="bold highlight-yellow">
                        {toTitleCase(datosJuridicos.RepresentanteProfesion || "") || "[PROFESION]"}
                    </span>
                    ,{" "}
                    <span className="bold highlight-yellow">
                        {(
                            datosJuridicos.RepresentanteNacionalidad ||
                            "guatemalteco"
                        ).toLowerCase()}
                    </span>
                    , de este domicilio, me identifico con el Documento Personal
                    de Identificación -DPI-, con Código Único de Identificación
                    -CUI- número{" "}
                    <span className="bold highlight-yellow">
                        {dpiToLetras(datosJuridicos.RepresentanteDPI || "") ||
                            "[DPI_LETRAS]"}{" "}
                        ({formatCUI(datosJuridicos.RepresentanteDPI || "") || "[DPI]"})
                    </span>, extendido
                    por el Registro Nacional de las Personas de la República de
                    Guatemala, quien comparezco en mi calidad de{" "}
                    <span className="bold highlight-yellow">
                        {datosJuridicos.RepresentanteCargo ||
                            "ADMINISTRADOR ÚNICO Y REPRESENTANTE LEGAL"}
                    </span>{" "}
                    de la entidad{" "}
                    <span className="bold highlight-yellow">
                        {datosJuridicos.EmpresaNombre || "[NOMBRE_EMPRESA]"}
                    </span>
                    , calidad que acredita con mi nombramiento como tal
                    contenido en el acta notarial autorizada en esta ciudad el{" "}
                    <span className="bold highlight-yellow">
                        {(() => {
                            const v = datosJuridicos.ActaFechaDia;
                            if (!v) return <span className="blank-field" title="Día del acta notarial">&nbsp;</span>;
                            const n = parseInt(v);
                            return !isNaN(n) ? `${numberToWords(n).toLowerCase()} (${n})` : v;
                        })()}
                    </span>{" "}
                    de{" "}
                    <span className="bold highlight-yellow">
                        {datosJuridicos.ActaFechaMes || (
                            <span className="blank-field" title="Mes del acta notarial">&nbsp;</span>
                        )}
                    </span>{" "}
                    de{" "}
                    <span className="bold highlight-yellow">
                        {(() => {
                            const v = datosJuridicos.ActaFechaAnio;
                            if (!v) return <span className="blank-field" title="Año del acta notarial">&nbsp;</span>;
                            const n = parseInt(v);
                            return !isNaN(n) ? `${numberToWordsYear(n).toLowerCase()} (${n})` : v;
                        })()}
                    </span>
                    , por el Notario{" "}
                    <span className="bold highlight-yellow">
                        {datosJuridicos.NotarioNombre || (
                            <span className="blank-field" title="Nombre del Notario">&nbsp;</span>
                        )}
                    </span>
                    , el cual se encuentra debidamente inscrito en el Registro
                    Mercantil General de la República de Guatemala bajo el{" "}
                    <span className="bold highlight-yellow">
                        número de registro {(() => { const v = datosJuridicos.InscritoNumero; if (!v || v.startsWith('[')) return <span className="blank-field" title="Número de inscripción en el Registro Mercantil">&nbsp;</span>; const n = parseInt(v); return !isNaN(n) ? `${numberToWords(n).toLowerCase()} (${n})` : v; })()}
                        , folio {(() => { const v = datosJuridicos.InscritoFolio; if (!v || v.startsWith('[')) return <span className="blank-field" title="Folio de inscripción en el Registro Mercantil">&nbsp;</span>; const n = parseInt(v); return !isNaN(n) ? `${numberToWords(n).toLowerCase()} (${n})` : v; })()}
                        , del libro {(() => { const v = datosJuridicos.InscritoLibro; if (!v || v.startsWith('[')) return <span className="blank-field" title="Libro de inscripción en el Registro Mercantil">&nbsp;</span>; const n = parseInt(v); return !isNaN(n) ? `${numberToWords(n).toLowerCase()} (${n})` : v; })()}
                    </span>{" "}
                    de Auxiliares de Comercio, en adelante referido simple e
                    indistintamente como{" "}
                    <span className="bold">
                        "LA PARTE PROMITENTE COMPRADORA", "LOS PROMITENTES COMPRADORES" o "EL PROMITENTE COMPRADOR"
                    </span>
                    .
                </p>

                <p>
                    Los comparecientes, en las calidades con que actuamos de
                    forma voluntaria manifestamos ser de los datos de
                    identificación y generales aquí consignados, hallarnos en el
                    libre ejercicio de nuestros derechos civiles, tener
                    suficientes facultades para el otorgamiento de este acto,
                    por lo que otorgamos{" "}
                    <span className="party-name">
                        CONTRATO DE PROMESA DE COMPRAVENTA DE BIENES INMUEBLES Y
                        BIEN MUEBLE (ACCIÓN)
                    </span>{" "}
                    contenido en las siguientes cláusulas:
                </p>
            </div>
        </>
    );
};
