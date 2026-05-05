import React from "react";
import type { DatosJuridicos } from "../../types";
import { numberToWordsYear } from "../../utils";

interface JuridicaSignaturesProps {
    datosJuridicos: DatosJuridicos;
    getFechaFirma: () => { dia: string; mes: string; anio: string };
    getFechaLegalizacion: () => { dia: string; mes: string; anio: string };
    dpiToLetras: (dpi: string) => string;
    formatCUI: (dpi: string) => string;
    numberToWords: (num: number) => string;
}

export const JuridicaSignatures: React.FC<JuridicaSignaturesProps> = ({
    datosJuridicos,
    getFechaFirma,
    getFechaLegalizacion,
    dpiToLetras,
    formatCUI,
    numberToWords,
}) => {
    return (
        <>
            <div id="clausula-decima-segunda" className="section-spacing">
                <p>
                    <span className="clause-title">
                        DÉCIMA SEGUNDA: ACEPTACIÓN:
                    </span>{" "}
                    En los términos expuestos y en las calidades con las que
                    actuamos, los comparecientes declaramos la plena conformidad
                    y aceptación con el contenido íntegro del presente contrato
                    y luego de haberlo leído y bien enterados de su contenido,
                    objeto, validez y efectos legales, lo ratificamos, aceptamos
                    y firmamos, sin reserva alguna, el{" "}
                    <span className="highlight-yellow">
                        {getFechaFirma().dia}
                    </span>{" "}
                    de{" "}
                    <span className="highlight-yellow">
                        {getFechaFirma().mes}
                    </span>{" "}
                    de{" "}
                    <span className="highlight-yellow">
                        {getFechaFirma().anio}
                    </span>
                    , quedando contenido el mismo en cuatro (4) hojas de papel
                    bond, impresas en su lado anverso y reverso.
                </p>
            </div>

            <div id="firmas" style={{ marginTop: "100px" }}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ width: "45%", marginBottom: "50px" }}>
                        <div
                            style={{
                                width: "100%",
                                borderBottom: "1px solid black",
                            }}
                        ></div>
                    </div>
                    <div style={{ width: "45%", marginBottom: "50px" }}>
                        <div
                            style={{
                                width: "100%",
                                borderBottom: "1px solid black",
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "80px" }}>
                <p>
                    En la Ciudad de Guatemala el{" "}
                    <span className="highlight-yellow">
                        {getFechaLegalizacion().dia}
                    </span>{" "}
                    de{" "}
                    <span className="highlight-yellow">
                        {getFechaLegalizacion().mes}
                    </span>{" "}
                    de{" "}
                    <span className="highlight-yellow">
                        {getFechaLegalizacion().anio}
                    </span>
                    , Yo, el infrascrito Notario hago constar que las{" "}
                    <span className="bold">DOS (2)</span> firmas que anteceden
                    calzan en un Contrato de Promesa de Compraventa de Bienes
                    Inmuebles y Bien Mueble (Acción), y son auténticas por haber
                    sido puestas en mi presencia el día de hoy por:{" "}
                    <span className="bold">
                        a) VENANCIO GÓMEZ (único apellido)
                    </span>
                    , quien se identifica con el Documento Personal de
                    Identificación -DPI- con Código Único de Identificación
                    -CUI- <span className="bold highlight-yellow">DOS MIL QUINIENTOS CUARENTA, SETENTA Y NUEVE MIL
                    DOSCIENTOS VEINTINUEVE, MIL CUATROCIENTOS UNO (2540 79229
                    1401)</span>, extendido por el Registro Nacional de las Personas de
                    la República de Guatemala, quien comparece en su calidad de{" "}
                    <span className="bold">
                        ADMINISTRADOR ÚNICO Y REPRESENTANTE LEGAL
                    </span>{" "}
                    de la entidad{" "}
                    <span className="bold">BRAVANTE, SOCIEDAD ANÓNIMA</span>; y{" "}
                    <span className="bold">
                        b){" "}
                        <span className="highlight-yellow">
                            {datosJuridicos.RepresentanteNombre ||
                                "[NOMBRE_REPRESENTANTE]"}
                        </span>
                    </span>
                    , quien se identifica con el Documento Personal de
                    Identificación -DPI-, con Código Único de Identificación
                    -CUI- número{" "}
                    <span className="highlight-yellow">
                        {dpiToLetras(datosJuridicos.RepresentanteDPI || "") ||
                            "[DPI_LETRAS]"}{" "}
                        ({formatCUI(datosJuridicos.RepresentanteDPI || "") || "[DPI]"})
                    </span>
                    , extendido por el Registro Nacional de las Personas de la
                    República de Guatemala; y comparece en su calidad de{" "}
                    <span className="bold highlight-yellow">
                        {datosJuridicos.RepresentanteCargo ||
                            "ADMINISTRADOR ÚNICO Y REPRESENTANTE LEGAL"}
                    </span>{" "}
                    de la entidad{" "}
                    <span className="bold highlight-yellow">
                        {datosJuridicos.EmpresaNombre || "[NOMBRE_EMPRESA]"}
                    </span>
                    , calidad que acredita con su nombramiento como tal
                    contenido en el acta notarial autorizada en esta ciudad el
                    día{" "}
                    <span className="highlight-yellow">
                        {(() => {
                            const v = datosJuridicos.ActaFechaDia;
                            if (!v) return <span className="blank-field" title="Día del acta notarial">&nbsp;</span>;
                            const n = parseInt(v);
                            return !isNaN(n) ? `${numberToWords(n).toLowerCase()} (${n})` : v;
                        })()}
                    </span>{" "}
                    de{" "}
                    <span className="highlight-yellow">
                        {datosJuridicos.ActaFechaMes || (
                            <span className="blank-field" title="Mes del acta notarial">&nbsp;</span>
                        )}
                    </span>{" "}
                    de{" "}
                    <span className="highlight-yellow">
                        {(() => {
                            const v = datosJuridicos.ActaFechaAnio;
                            if (!v) return <span className="blank-field" title="Año del acta notarial">&nbsp;</span>;
                            const n = parseInt(v);
                            return !isNaN(n) ? `${numberToWordsYear(n).toLowerCase()} (${n})` : v;
                        })()}
                    </span>
                    , por el Notario{" "}
                    <span className="highlight-yellow">
                        {datosJuridicos.NotarioNombre || (
                            <span className="blank-field" title="Nombre del Notario autorizante">&nbsp;</span>
                        )}
                    </span>
                    , el cual se encuentra debidamente inscrito en el Registro
                    Mercantil General de la República de Guatemala bajo el
                    número de registro{" "}
                    <span className="highlight-yellow">
                        {(() => { const v = datosJuridicos.InscritoNumero; if (!v || v.startsWith('[')) return <span className="blank-field" title="Número de registro en el Registro Mercantil">&nbsp;</span>; const n = parseInt(v); return !isNaN(n) ? `${numberToWords(n).toLowerCase()} (${n})` : v; })()}
                    </span>
                    , folio{" "}
                    <span className="highlight-yellow">
                        {(() => { const v = datosJuridicos.InscritoFolio; if (!v || v.startsWith('[')) return <span className="blank-field" title="Folio de registro en el Registro Mercantil">&nbsp;</span>; const n = parseInt(v); return !isNaN(n) ? `${numberToWords(n).toLowerCase()} (${n})` : v; })()}
                    </span>
                    , del libro{" "}
                    <span className="highlight-yellow">
                        {(() => { const v = datosJuridicos.InscritoLibro; if (!v || v.startsWith('[')) return <span className="blank-field" title="Libro de registro en el Registro Mercantil">&nbsp;</span>; const n = parseInt(v); return !isNaN(n) ? `${numberToWords(n).toLowerCase()} (${n})` : v; })()}
                    </span>{" "}
                    de Auxiliares de Comercio; quienes vuelven a firmar la
                    presente acta, ante el infrascrito Notario quien de todo lo
                    relacionado Doy Fe.
                </p>
            </div>

            <div style={{ marginTop: "80px" }}>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div
                        style={{
                            width: "45%",
                            borderBottom: "1px solid black",
                        }}
                    ></div>
                    <div
                        style={{
                            width: "45%",
                            borderBottom: "1px solid black",
                        }}
                    ></div>
                </div>
                <div
                    style={{
                        marginTop: "40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <p style={{ fontWeight: "bold", fontSize: "11pt" }}>
                        ANTE MÍ:
                    </p>
                </div>
            </div>
        </>
    );
};
