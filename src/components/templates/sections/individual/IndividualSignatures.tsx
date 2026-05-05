import React from "react";
import type { Comprador } from "../../types";

interface IndividualSignaturesProps {
    compradores: Comprador[];
    getVal: (path: string, defaultValue?: any) => any;
    getFechaFirma: () => { dia: string; mes: string; anio: string };
    getFechaLegalizacion: () => { dia: string; mes: string; anio: string };
}

export const IndividualSignatures: React.FC<IndividualSignaturesProps> = ({
    compradores,
    getVal,
    getFechaFirma,
    getFechaLegalizacion,
}) => {
    return (
        <>
            <div id="clausula-decima-segunda" className="section-spacing">
                <p>
                    <span className="clause-title">DÉCIMA SEGUNDA: ACEPTACIÓN.</span>{" "}
                    En los términos antes expuestos, los otorgantes aceptamos
                    expresamente todas y cada una de las cláusulas del presente
                    contrato y su contenido íntegro.
                </p>
                <p>
                    Leído lo escrito por los otorgantes y bien enterados de su
                    contenido, objeto, validez y efectos legales, lo ratificamos,
                    aceptamos y firmamos el presente contrato el día{" "}
                    <span className="highlight-yellow">{getFechaFirma().dia}</span> de{" "}
                    <span className="highlight-yellow">{getFechaFirma().mes}</span> de{" "}
                    <span className="highlight-yellow">{getFechaFirma().anio}</span>, en
                    tres (3) ejemplares de un mismo tenor y para un solo efecto,
                    quedando uno en poder de cada una de las partes y el tercero
                    para el archivo de la PARTE PROMITENTE VENDEDORA.
                </p>
            </div>

            <div id="firmas" style={{ marginTop: "60px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "50%", padding: "20px", verticalAlign: "bottom" }}>
                                <div style={{ borderTop: "1px solid black", textAlign: "center", paddingTop: "5px" }}>
                                    <p style={{ fontWeight: "bold", margin: "0" }}>VENANCIO GÓMEZ</p>
                                    <p style={{ margin: "0", fontSize: "10pt" }}>
                                        BRAVANTE, SOCIEDAD ANÓNIMA
                                    </p>
                                    <p style={{ margin: "0", fontSize: "10pt" }}>
                                        LA PARTE PROMITENTE VENDEDORA
                                    </p>
                                </div>
                            </td>
                            <td style={{ width: "50%", padding: "20px", verticalAlign: "bottom" }}>
                                <div style={{ borderTop: "1px solid black", textAlign: "center", paddingTop: "5px" }}>
                                    <p style={{ fontWeight: "bold", margin: "0" }}>
                                        {compradores[0]?.Nombre || "[NOMBRE_COMPRADOR]"}
                                    </p>
                                    <p style={{ margin: "0", fontSize: "10pt" }}>
                                        LA PARTE PROMITENTE COMPRADORA
                                    </p>
                                </div>
                            </td>
                        </tr>
                        {compradores.length > 1 && (
                            <tr>
                                <td style={{ width: "50%" }}></td>
                                <td style={{ width: "50%", padding: "20px", verticalAlign: "bottom" }}>
                                    <div style={{ borderTop: "1px solid black", textAlign: "center", paddingTop: "5px" }}>
                                        <p style={{ fontWeight: "bold", margin: "0" }}>
                                            {compradores[1]?.Nombre || "[NOMBRE_COMPRADOR_2]"}
                                        </p>
                                        <p style={{ margin: "0", fontSize: "10pt" }}>
                                            LA PARTE PROMITENTE COMPRADORA
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: "100px", borderTop: "2px dashed gray", paddingTop: "20px" }}>
                <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "12pt" }}>
                    AUTÉNTICA DE FIRMAS
                </p>
                <p style={{ marginTop: "20px" }}>
                    En la ciudad de Guatemala, el día{" "}
                    <span className="highlight-yellow">{getFechaLegalizacion().dia}</span> de{" "}
                    <span className="highlight-yellow">{getFechaLegalizacion().mes}</span> de{" "}
                    <span className="highlight-yellow">{getFechaLegalizacion().anio}</span>, como Notaria DOY FE:
                    Que las firmas que anteceden SON AUTÉNTICAS por haber sido
                    puestas el día de hoy en mi presencia por los señores:{" "}
                    <span className="bold">VENANCIO GÓMEZ</span> (único apellido), quien se
                    identifica con el Documento Personal de Identificación -DPI- con
                    Código Único de Identificación -CUI- número{" "}
                    <span className="bold">
                        DOS MIL QUINIENTOS CUARENTA, SETENTA Y NUEVE MIL DOSCIENTOS
                        VEINTINUEVE, MIL CUATROCIENTOS UNO (2540 79229 1401)
                    </span>
                    ;{" "}
                    {compradores.map((c, idx) => (
                        <React.Fragment key={idx}>
                            <span className="bold">{c.Nombre}</span>, quien se identifica con el
                            Documento Personal de Identificación -DPI- con Código Único de
                            Identificación -CUI- número{" "}
                            <span className="bold">
                                {getVal(`Compradores[${idx}].DPI_Letras`, "[DPI_LETRAS]")} (
                                {getVal(`Compradores[${idx}].DPI`, "[DPI]")})
                            </span>
                            {idx < compradores.length - 1 ? "; y " : ". "}
                        </React.Fragment>
                    ))}.{" "}
                    Los signatarios firman la presente acta de legalización con la
                    Notaria que autoriza.
                </p>

                <div style={{ marginTop: "80px", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "45%", borderTop: "1px solid black", textAlign: "center", paddingTop: "5px" }}>
                        Firma del Representante Legal
                    </div>
                    <div style={{ width: "45%", borderTop: "1px solid black", textAlign: "center", paddingTop: "5px" }}>
                        Firma de La Parte Promitente Compradora
                    </div>
                </div>

                {compradores.length > 1 && (
                    <div style={{ marginTop: "60px", display: "flex", justifyContent: "flex-end" }}>
                        <div style={{ width: "45%", borderTop: "1px solid black", textAlign: "center", paddingTop: "5px" }}>
                            Firma de La Parte Promitente Compradora
                        </div>
                    </div>
                )}

                <div
                    style={{
                        marginTop: "80px",
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
