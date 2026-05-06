import React from "react";
import type { TemplateProps, Comprador } from "../../types";
import { formatCUI, stripLevelPrefix } from "../../utils";

interface IndividualIntroductionProps extends TemplateProps {
    compradores: Comprador[];
    getProfesion: (c: Comprador) => string;
    getNacionalidad: (c: Comprador) => string;
    dpiToLetras: (dpi: string) => string;
    getPartyLabel: (comps: Comprador[]) => string;
    getSecondaryPartyLabel: (comps: Comprador[]) => string;
}

export const IndividualIntroduction: React.FC<IndividualIntroductionProps> = ({
    getVal,
    compradores,
    getProfesion,
    getNacionalidad,
    dpiToLetras,
    getPartyLabel,
    getSecondaryPartyLabel,
    getComprador,
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
                    <span className="highlight-red">
                        {stripLevelPrefix(getVal(
                            "Descripcion_del_Inmueble.Apartamento",
                            "[ID]",
                        ))}
                    </span>{" "}
                    /{" "}
                    <span className="highlight-red">
                        {getVal(
                            "Descripcion_del_Inmueble.Modelo",
                            "[MODELO]",
                        )}
                    </span>{" "}
                    / NIVEL{" "}
                    <span className="highlight-red">
                        {getVal(
                            "Descripcion_del_Inmueble.Nivel_Letras",
                            "[NIVEL]",
                        )}{" "}
                        ({getVal("Descripcion_del_Inmueble.Nivel", "[#]")})
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
                    -CUI- <span className="bold highlight-yellow">DOS MIL QUINIENTOS CUARENTA, SETENTA Y NUEVE MIL
                    DOSCIENTOS VEINTINUEVE, MIL CUATROCIENTOS UNO (2540 79229
                    1401)</span>, extendido por el Registro Nacional de las Personas de
                    la República de Guatemala, comparezco en mi calidad de{" "}
                    <span className="bold">
                        ADMINISTRADOR ÚNICO Y REPRESENTANTE LEGAL de la entidad
                        BRAVANTE, SOCIEDAD ANÓNIMA
                    </span>{" "}
                    calidad que acredito con mi nombramiento como tal contenido
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
                    {(() => {
                        if (compradores.length > 1) {
                            return (
                                <>
                                    NOSOTROS:{" "}
                                    {compradores.map((c, idx) => {
                                        const roman = [
                                            "I)",
                                            "II)",
                                            "III)",
                                            "IV)",
                                            "V)",
                                            "VI)",
                                        ];
                                        return (
                                            <React.Fragment key={idx}>
                                                {roman[idx] || `${idx + 1})`}{" "}
                                                <span className="highlight-yellow">
                                                    {c.Nombre}
                                                </span>
                                                , quien declaro ser de{" "}
                                                <span className="highlight-yellow">
                                                    {(c.Edad_Letras || "").toLowerCase()}
                                                </span>{" "}
                                                años de edad,{" "}
                                                <span className="highlight-yellow">
                                                    {(c.EstadoCivil || "").toLowerCase()}
                                                </span>
                                                ,{" "}
                                                <span className="highlight-yellow">
                                                    {getProfesion(c)}
                                                </span>
                                                ,{" "}
                                                <span className="highlight-yellow">
                                                    {getNacionalidad(c)}
                                                </span>
                                                , de este domicilio,{" "}
                                                {compradores.length > 1
                                                    ? "nos identificamos"
                                                    : "me identifico"}{" "}
                                                con el Documento Personal de
                                                Identificación -DPI-, con Código
                                                Único de Identificación -CUI-
                                                número{" "}
                                                <span className="bold highlight-yellow">
                                                    {dpiToLetras(c.DPI || "")} ({formatCUI(c.DPI || "")})
                                                </span>, extendido por el
                                                Registro Nacional de las
                                                Personas de la República de
                                                Guatemala
                                                {idx < compradores.length - 1
                                                    ? "; y "
                                                    : ""}
                                            </React.Fragment>
                                        );
                                    })}
                                    ;{" "}
                                    {compradores.length > 1
                                        ? "quienes"
                                        : "quien"}{" "}
                                    en adelante{" "}
                                    {compradores.length > 1
                                        ? "seremos referidos"
                                        : "seré referido"}{" "}
                                    simple e indistintamente como{" "}
                                    <span className="party-name">
                                        {getPartyLabel(compradores)}
                                    </span>
                                    {compradores.length > 1 ? " o " : " o "}
                                    <span className="party-name">
                                        "{getSecondaryPartyLabel(compradores)}"
                                    </span>
                                    .
                                </>
                            );
                        } else {
                            return (
                                <>
                                    Yo,{" "}
                                    <span className="highlight-yellow">
                                        {compradores[0]?.Nombre || getComprador(0, "Nombre")}
                                    </span>
                                    , quien declaro ser de{" "}
                                    <span className="highlight-yellow">
                                        {(compradores[0]?.Edad_Letras || getComprador(0, "Edad_Letras") || "").toLowerCase()}
                                    </span>{" "}
                                    años de edad,{" "}
                                    <span className="highlight-yellow">
                                        {(
                                            compradores[0]?.EstadoCivil || getComprador(0, "EstadoCivil") || ""
                                        ).toLowerCase()}
                                    </span>
                                    ,{" "}
                                    <span className="highlight-yellow">
                                        {getProfesion(compradores[0] || {})}
                                    </span>
                                    ,{" "}
                                    <span className="highlight-yellow">
                                        {getNacionalidad(compradores[0] || {})}
                                    </span>
                                    , de este domicilio, me identifico con el
                                    Documento Personal de Identificación -DPI-,
                                    con Código Único de Identificación -CUI-
                                    número{" "}
                                    <span className="highlight-yellow">
                                        {dpiToLetras(compradores[0]?.DPI || getComprador(0, "DPI") || "")}
                                    </span>{" "}
                                    ({formatCUI(compradores[0]?.DPI || getComprador(0, "DPI") || "")}), extendido por el
                                    Registro Nacional de las Personas de la
                                    República de Guatemala; quien en adelante
                                    seré referido simple e indistintamente como{" "}
                                    <span className="party-name">
                                        "{getSecondaryPartyLabel(compradores)}"
                                    </span>{" "}
                                    o{" "}
                                    <span className="party-name">
                                        "{getPartyLabel(compradores)}"
                                    </span>
                                    .
                                </>
                            );
                        }
                    })()}
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
