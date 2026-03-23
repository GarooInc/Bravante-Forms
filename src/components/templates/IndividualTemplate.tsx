import React from "react";
import type {
    TemplateProps,
    Comprador,
    Estacionamiento,
    Bodega,
    Pago,
} from "./types";
import { DocumentStyles } from "./DocumentStyles";
import { numberToWords, numberToWordsYear, toTitleCase, formatCUI, idToWords } from "./utils";

export const IndividualTemplate: React.FC<TemplateProps> = ({
    data,
    getVal,
    getComprador,
    getParqueosDescripcion,
    getFechaLegalizacion,
    getFechaFirma,
    getSaldoFinal,
    getDireccionComprador,
    getPlazoMeses,
    getMesEntrega,
}) => {
    if (!data) return null;

    const compradores = getVal<Comprador[]>("Compradores", []);

    const dpiToLetras = (dpi: string): string => {
        if (!dpi) return "";
        const normalizado = formatCUI(dpi);
        return normalizado
            .trim()
            .split(/\s+/)
            .map((bloque) => numberToWords(parseInt(bloque, 10)))
            .join(" espacio ");
    };

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

    const getSecondaryPartyLabel = (comps: any[]) => {
        if (comps.length > 1) {
            return "LA PARTE PROMITENTE COMPRADORA";
        } else if (comps.length === 1) {
            return "LA PARTE PROMITENTE COMPRADORA";
        }
        return "LA PARTE PROMITENTE COMPRADORA";
    };

    return (
        <div className="documento-promesa shadow-xl">
            <DocumentStyles />

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
                        {getVal(
                            "Descripcion_del_Inmueble.Apartamento",
                            "[ID]",
                        )}
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
                    -CUI- dos mil quinientos cuarenta, setenta y nueve mil
                    doscientos veintinueve, mil cuatrocientos uno (2540 79229
                    1401), extendido por el Registro Nacional de las Personas de
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
                                                <span className="highlight-yellow">
                                                    {dpiToLetras(c.DPI || "")}
                                                </span>{" "}
                                                ({formatCUI(c.DPI || "")}), extendido por el
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

            <div id="clausula-primera" className="section-spacing">
                <p>
                    <span className="clause-title">PRIMERA: ANTECEDENTES.</span>{" "}
                    Yo, VENANCIO GÓMEZ (único apellido), en representación de la
                    entidad BRAVANTE, SOCIEDAD ANÓNIMA, manifiesto que mi
                    representada, está desarrollando la construcción del
                    Proyecto de Apartamentos denominado{" "}
                    <span className="bold">"BRAVANTE"</span> ubicado en Finca
                    Cumbres de Vista Hermosa, Zona 5 del municipio de Santa
                    Catarina Pinula, departamento de Guatemala, a quien de acá
                    en adelante denominaremos "El Proyecto". El Proyecto contará
                    con dos torres de nueve niveles cada una, más cuatro
                    sótanos, y estará distribuido de la siguiente forma:{" "}
                    <span className="bold">a) Cuatro niveles de sótanos</span>{" "}
                    los cuales serán utilizados para estacionamientos de
                    vehículos, distribuidos así:{" "}
                    <span className="bold">i) Sótano uno:</span> El cual quedará
                    a nivel de calle, este será utilizado para estacionamiento
                    de vehículos de propietarios y visitas.{" "}
                    <span className="bold">
                        ii) Sótanos dos, tres y cuatro:
                    </span>{" "}
                    Estos son subterráneos los tres, pero por temas de
                    topografía, el sótano dos quedará en algún área a nivel de
                    calle, y será utilizado exclusivamente para el
                    estacionamiento de vehículos de los propietarios de los
                    apartamentos del edificio, así como bodegas en los sótanos
                    uno, dos y cuatro; y parqueos para motos en el sótano
                    cuatro. y{" "}
                    <span className="bold">
                        b) Del primero hasta el noveno nivel,
                    </span>{" "}
                    los cuales serán destinados exclusivamente a apartamentos
                    para vivienda y áreas de circulación peatonal, áreas de
                    servicio y soporte a los mismos. El{" "}
                    <span className="bold">Proyecto</span> tiene planificado
                    contar con aproximadamente{" "}
                    <span className="highlight-yellow">
                        {getVal("proyecto.total_unidades", "noventa y cinco")} (
                        {getVal("proyecto.total_unidades_numeros", "95")})
                    </span>{" "}
                    unidades de apartamentos, es decir,{" "}
                    <span className="highlight-yellow">
                        {getVal("proyecto.unidades_torre1", "cuarenta y siete")}{" "}
                        ({getVal("proyecto.unidades_torre1_numeros", "47")})
                    </span>{" "}
                    unidades de apartamentos en la torre número uno y{" "}
                    <span className="highlight-yellow">
                        {getVal("proyecto.unidades_torre2", "cuarenta y ocho")}{" "}
                        ({getVal("proyecto.unidades_torre2_numeros", "48")})
                    </span>{" "}
                    unidades de apartamentos en la torre número dos, pudiendo
                    variar el número de apartamentos en más o menos{" "}
                    <span className="highlight-yellow">
                        {getVal("proyecto.variacion_unidades", "diez")}
                    </span>{" "}
                    apartamentos, a criterio de la Promitente Vendedora.
                </p>
                <p>
                    El Proyecto contará además con lo siguiente:{" "}
                    <span className="bold">a) Cuatro elevadores en total</span>,
                    dos por cada torre.{" "}
                    <span className="bold">b) Servicio de agua</span>. El agua
                    será suministrada por pozo externo al Edificio, propiedad de
                    la entidad SERVIBOSQUES, SOCIEDAD ANÓNIMA. Así mismo, el
                    edificio contará con cisterna de concreto.{" "}
                    <span className="bold">c) La electricidad</span> será
                    suministrada por la Empresa Eléctrica de Guatemala, Sociedad
                    Anónima, siendo la Promitente Compradora la responsable de
                    la contratación y pago de su servicio en forma directa para
                    su apartamento, y el edificio contará con una planta
                    eléctrica de emergencia para suministro de energía a áreas
                    comunes, los cuales son pasillos, elevadores y lobby del
                    edificio.{" "}
                    <span className="bold">
                        d) Contará con gabinetes con extintores
                    </span>{" "}
                    de incendios en cada nivel.{" "}
                    <span className="bold">
                        e) Sistema de control de acceso
                    </span>{" "}
                    en ingreso vehicular. Circuito cerrado en áreas comunes y
                    lobbies.{" "}
                    <span className="bold">
                        f) Tuberías para las instalaciones eléctricas,
                        hidráulicas, sanitarias y otras debidamente ocultas
                    </span>
                    , con sus respectivas cajas y placas correspondientes a
                    dichos servicios, a ubicarse en pasillos y áreas de los
                    apartamentos, en sótanos las mismas serán expuestas.{" "}
                    <span className="bold">g) Sistema de drenajes</span>{" "}
                    pluviales y aguas negras, así como planta de tratamiento de
                    aguas residuales de uso ordinario.
                </p>
                <p>
                    Los Edificios podrán denominarse de la siguiente forma, para
                    la torre número uno{" "}
                    <span className="bold">"IGNEA"</span>, y para la torre número
                    dos <span className="bold">"ETEREA"</span>, los cuales serán
                    sometidos al régimen de propiedad horizontalmente dividida y
                    su respectivo reglamento, así como estarán sujetos a las
                    servidumbres que la promitente vendedora considere para el
                    proyecto, y del cual formarán parte, entre otros:
                </p>

                <p>
                    El apartamento{" "}
                    <span className="highlight-red">
                        {getVal(
                            "Descripcion_del_Inmueble.Apartamento",
                            "[APTO]",
                        )}
                    </span>{" "}
                    Torre{" "}
                    <span className="highlight-red">
                        {getVal("Descripcion_del_Inmueble.Torre", "[TORRE]")}
                    </span>
                    , ubicado en el nivel{" "}
                    <span className="highlight-red">
                        {(() => {
                            const val = getVal("Descripcion_del_Inmueble.Nivel_Letras", "[NIVEL_LETRAS]");
                            return val !== "[NIVEL_LETRAS]" && val !== "[DATO_FALTANTE]"
                                ? `${val} (${getVal("Descripcion_del_Inmueble.Nivel")})`
                                : getVal("Descripcion_del_Inmueble.Nivel");
                        })()}
                    </span>{" "}
                    del Complejo;{" "}
                    {(() => {
                        const ests = getVal<Estacionamiento[]>(
                            "Descripcion_del_Inmueble.Estacionamientos",
                            [],
                        );
                        const count = ests.length;
                        const articulos = count === 1 ? "la " : "las ";
                        const plazas = count === 1 ? " plaza" : " plazas";
                        const identificadas =
                            count === 1 ? " identificada" : " identificadas";
                        const numLetras =
                            count === 1
                                ? "UNA"
                                : numberToWords(count).toUpperCase();
                        return (
                            <>
                                {articulos}
                                <span className="highlight-red">
                                    {numLetras} ({count})
                                </span>
                                {plazas} de estacionamiento {identificadas} con
                                los números:
                            </>
                        );
                    })()}
                </p>

                {(() => {
                    const estacionamientos = getVal<Estacionamiento[]>(
                        "Descripcion_del_Inmueble.Estacionamientos",
                        [],
                    );
                    if (
                        !Array.isArray(estacionamientos) ||
                        estacionamientos.length === 0
                    )
                        return null;
                    return (
                        <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                            {estacionamientos.map((p, idx) => (
                                <p
                                    key={idx}
                                    style={{ margin: "5px 0", textIndent: "0" }}
                                >
                                    o{" "}
                                    <span className="highlight-red">
                                        {idToWords(p.Numero || "") || "[NUMERO_LETRAS]"}
                                    </span>{" "}
                                    (
                                    <span className="highlight-red">
                                        {p.Numero}
                                    </span>
                                    ), ubicada en el sótano número:{" "}
                                    <span className="highlight-red">
                                        {p.Sotano_Letras || "[SOTANO_LETRAS]"}
                                    </span>{" "}
                                    (
                                    <span className="highlight-red">
                                        {p.Sotano || "[#]"}
                                    </span>
                                    )
                                </p>
                            ))}
                        </div>
                    );
                })()}

                {(() => {
                    const bodegas = getVal<Bodega[]>(
                        "Descripcion_del_Inmueble.Bodegas",
                        [],
                    );
                    if (!Array.isArray(bodegas) || bodegas.length === 0)
                        return null;
                    return (
                        <>
                            <p style={{ marginTop: "15px" }}>
                                Y,{" "}
                                {(() => {
                                    const count = bodegas.length;
                                    const numLetras =
                                        count === 1
                                            ? "UNA"
                                            : numberToWords(
                                                  count,
                                              ).toUpperCase();
                                    const label =
                                        count === 1 ? "bodega" : "bodegas";
                                    const identificadas =
                                        count === 1
                                            ? "identificada"
                                            : "identificadas";
                                    return (
                                        <>
                                            <span className="highlight-red">
                                                {numLetras} ({count})
                                            </span>
                                            , {label}, {identificadas} con los
                                            números:
                                        </>
                                    );
                                })()}
                            </p>
                            <div
                                style={{
                                    marginLeft: "20px",
                                    marginTop: "10px",
                                }}
                            >
                                {bodegas.map((b, idx) => (
                                    <p
                                        key={idx}
                                        style={{
                                            margin: "5px 0",
                                            textIndent: "0",
                                        }}
                                    >
                                        o{" "}
                                        <span className="highlight-red">
                                            {idToWords(b.Numero || "") ||
                                                "[NUMERO_LETRAS]"}
                                        </span>
                                        , ubicada en el sótano número:{" "}
                                        <span className="highlight-red">
                                            {b.Sotano_Letras ||
                                                "[SOTANO_LETRAS]"}
                                        </span>{" "}
                                        (
                                        <span className="highlight-red">
                                            {b.Sotano || "[#]"}
                                        </span>
                                        )
                                    </p>
                                ))}
                            </div>
                        </>
                    );
                })()}

                <p style={{ marginTop: "15px" }}>
                    así como el título de acción correspondiente y relacionado
                    al proyecto. La denominación de dicho complejo podrá variar
                    al constituirse el referido Régimen.
                </p>
            </div>

            <div id="clausula-segunda" className="section-spacing">
                <p>
                    <span className="clause-title">
                        SEGUNDA: PROMESA DE COMPRAVENTA.
                    </span>{" "}
                    LA PARTE PROMITENTE VENDEDORA, manifiesto que por el
                    presente instrumento prometo vender a{" "}
                    {(() => {
                        if (compradores.length > 1) {
                            const nombres = compradores.map((c) => c.Nombre);
                            return (
                                nombres.slice(0, -1).join(", ") +
                                " y " +
                                nombres.slice(-1)
                            );
                        }
                        return getComprador(0, "Nombre");
                    })()}{" "}
                    los bienes indicados en la cláusula que antecede, que se
                    describen así: <span className="bold">a)</span> El
                    apartamento identificado como Apartamento{" "}
                    <span className="highlight-yellow">
                        {getVal("Descripcion_del_Inmueble.Apartamento")}
                    </span>{" "}
                    Torre{" "}
                    <span className="highlight-yellow">
                        {getVal("Descripcion_del_Inmueble.Torre")}
                    </span>
                    , ubicado en el nivel{" "}
                    <span className="highlight-yellow">
                        {(() => {
                            const val = getVal("Descripcion_del_Inmueble.Nivel_Letras", "[NIVEL_LETRAS]");
                            return val !== "[NIVEL_LETRAS]" && val !== "[DATO_FALTANTE]"
                                ? `${val} (${getVal("Descripcion_del_Inmueble.Nivel")})`
                                : getVal("Descripcion_del_Inmueble.Nivel");
                        })()}
                    </span>{" "}
                    del Complejo; apartamento que consta de{" "}
                    <span className="highlight-yellow">
                        {(() => {
                            const val = getVal("Descripcion_del_Inmueble.Habitaciones_Letras", "[HAB_LETRAS]");
                            return val !== "[HAB_LETRAS]" && val !== "[DATO_FALTANTE]"
                                ? `${val} (${getVal("Descripcion_del_Inmueble.Habitaciones")})`
                                : getVal("Descripcion_del_Inmueble.Habitaciones");
                        })()}
                    </span>{" "}
                    habitaciones,{" "}
                    {(() => {
                        const br = getVal<string>("Descripcion_del_Inmueble.NumeroBR", "");
                        if (!br || br === "[DATO_FALTANTE]") return null;
                        return (
                            <>
                                <span className="highlight-yellow">
                                    {br}
                                </span>{" "}
                                baños,{" "}
                            </>
                        );
                    })()}
                    <span className="highlight-yellow">
                        {getVal(
                            "Descripcion_del_Inmueble.DescripcionApartamento",
                            "[DESC]",
                        )}
                    </span>
                    .
                </p>
                <p>
                    Y contará con un área aproximada de{" "}
                    <span className="highlight-yellow">
                        {getVal(
                            "Descripcion_del_Inmueble.AreaConstruccionLetras",
                        )}{" "}
                        METROS CUADRADOS
                    </span>{" "}
                    (
                    <span className="highlight-yellow">
                        {getVal(
                            "Descripcion_del_Inmueble.AreaConstruccionNumeros",
                        )}
                    </span>{" "}
                    m2) de construcción;{" "}
                    <span className="bold">b)</span>{" "}
                    <span className="highlight-red">
                        {getParqueosDescripcion()}
                    </span>
                    ;{" "}
                    {getVal<string>("Descripcion_del_Inmueble.BodegasDescripcion") && (
                        <>
                            <span className="bold">c)</span>{" "}
                            <span className="highlight-red">
                                {getVal<string>("Descripcion_del_Inmueble.BodegasDescripcion")}
                            </span>
                            ,{" "}
                        </>
                    )}
                    {getVal<number>("Descripcion_del_Inmueble.BalconAreaNumeros") ? (
                        <>
                            <span className="bold">d)</span> Un balcón, con un
                            área aproximada de{" "}
                             <span className="highlight-red">
                                 {idToWords(
                                     getVal<number>(
                                         "Descripcion_del_Inmueble.BalconAreaNumeros",
                                     ).toString(),
                                 )}{" "}
                                 METROS CUADRADOS
                             </span>{" "}
                            (
                            <span className="highlight-red">
                                {getVal<number>(
                                    "Descripcion_del_Inmueble.BalconAreaNumeros",
                                )}
                            </span>{" "}
                            m2);{" "}
                        </>
                    ) : null}
                    {getVal<number>("Descripcion_del_Inmueble.TerrazaAreaNumeros") ? (
                        <>
                            <span className="bold">d)</span> Una terraza de
                            aproximadamente{" "}
                             <span className="highlight-red">
                                 {idToWords(
                                     getVal<number>(
                                         "Descripcion_del_Inmueble.TerrazaAreaNumeros",
                                     ).toString(),
                                 )}{" "}
                                 METROS CUADRADOS
                             </span>{" "}
                            (
                            <span className="highlight-red">
                                {getVal<number>(
                                    "Descripcion_del_Inmueble.TerrazaAreaNumeros",
                                )}
                            </span>{" "}
                            m2), y{" "}
                        </>
                    ) : null}
                    <span className="bold">e)</span> El bien mueble (acción) de
                    la entidad relacionada y pertinente al proyecto.
                </p>
                <p>
                    Los acabados y equipamiento estándar con los que contará el
                    apartamento son los siguientes:
                </p>
                <div style={{ marginLeft: "20px" }}>
                    <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                        1. <span style={{ textDecoration: "underline" }}>Acabados incluidos:</span>
                    </p>
                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.1 PISOS INTERIORES:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>En sala, comedor y habitaciones:</span> Piso de madera de
                            ingeniería roble color "sand" o similar, duelas de 6"
                            de ancho y acabado satinado; instaladas con adhesivo
                            para pisos de madera.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>En cocina y baños:</span> Piso de porcelanato español, en
                            formato 60x120cms, imitación piedra color beige o
                            similar.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>En áreas de servicio:</span> Piso de cerámica esmaltada, en
                            formato 45x45 cms, imitación concreto color beige o
                            similar. Zócalo del mismo material de 10 cms., de alto.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: El color podría variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.2 PAREDES:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            <span style={{ fontWeight: "bold" }}>Muros perimetrales del apartamento</span> construidos en block
                            de concreto, con revestimiento cementicio blanco extra
                            liso.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            <span style={{ fontWeight: "bold" }}>Paredes interiores del apartamento</span> de tablayeso en
                            habitaciones o tabla RH en baños, con acabado liso.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            <span style={{ fontWeight: "bold" }}>Paredes divisorias entre área social y habitaciones</span> incluyen relleno de aislante termo-acústico de fibra
                            celulosa.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Acabado final incluye una capa de sello blanco más dos
                            capas de pintura látex blanco mate.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.3 CIELOS:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Cielo falso de tablayeso a 2.80 m de altura sobre nivel
                            de piso en área social y habitaciones, con acabado
                            liso.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Cielo falso de tabla RH a 2.60 m de altura sobre nivel
                            de piso en baños y área de servicio, con acabado liso.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Cenefa oculta de tablayeso para cortinero en dintel de
                            ventanas.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Acabado final incluye una capa de sello blanco más dos
                            capas de pintura látex blanco mate.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.4 VENTANERÍA:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Ventanas de aluminio línea europea color negro, con
                            vidrio laminado gris de 3+4mm., para aislamiento
                            acústico, con apertura proyectable.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Puertas corredizas de aluminio línea europea color
                            negro, con vidrio monolítico gris de 6mm., de altura
                            piso a cielo en salida a balcones/terraza.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: El color podría variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.5 CARPINTERÍA:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Zócalos de madera de 5" de alto perfil cuadrado mismo
                            color de las puertas, en área social, pasillos y
                            habitaciones.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Puertas de madera de ingeniería con enchape de caobilla
                            liso, de altura piso a cielo con marco de cajuela.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Cerradura de entrada tipo cerrojo digital electrónico
                            de códigos y conectividad wifi.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Cerradura en habitaciones tipo manija con llave, acabado
                            nickel satinado. En baños, closets y área de servicio,
                            tipo manija sin llave, acabado nickel satinado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.6 BAÑOS PRINCIPAL Y SECUNDARIOS:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Paredes de duchas y respaldo de sanitarios forradas
                            piso a cielo con porcelanato español, en formato
                            60x120cms, imitación piedra color beige o similar.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Mampara de vidrio templado en duchas, de 1.90m de alto,
                            sobre bordillo forrado con porcelanato.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Inodoro línea europea color blanco de tanque bajo con
                            mecanismo de doble descarga 4,5/3L, tapa y asiento con
                            caída amortiguada.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Lavamanos línea europea color blanco de submontar
                            rectangular, bajo encimera de sinterizado alpine white,
                            y mueble flotado de melamina con salpicadera de 10cms.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Grifería cromada monomando en lavamanos y duchas.
                            Cabezal de duchas tipo plato.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Extractor de olores en cielo con ducto al exterior (si
                            no hay ventana).
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: El color podría variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.7 BAÑO DE SERVICIO:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Paredes de ducha y respaldo de sanitarios forradas piso
                            a cielo con cerámico esmaltado en formato 45x45cms,
                            imitación concreto color beige o similar.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Inodoro de tanque color blanco, taza redonda y descarga
                            de manecilla.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Lavamanos con pedestal color blanco con grifo para agua
                            fría.
                        </li>
                        <li style={{ marginBottom: "5px" }}>Grifería cromada mezcladora de ducha.</li>
                        <li style={{ marginBottom: "5px" }}>Extractor de olores en cielo con ducto al exterior.</li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: El color podría variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.8 ACABADOS ELÉCTRICOS:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Interruptores análogos y tomacorrientes duplex con
                            placas color blanco brillante, tomacorrientes GFCI en
                            baños y cocina.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Placas de salida previstas para punto de red en salas y
                            habitaciones.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Lámparas tipo ojo de buey en cielo, acabado blanco y
                            luz LED cálida.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Perfil lineal en cielo de cocina con luz LED cálida.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        1.9 ACABADO EN BALCONES:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>Cielo suspendido imitación madera para exterior.</li>
                        <li style={{ marginBottom: "5px" }}>
                            Piso de porcelanato español antideslizante, en formato
                            60x120 cms, imitación piedra color beige o similar.
                            Zócalo del mismo material de 10 cms., de alto.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Baranda de vidrio templado con perfil de remate inox,
                            instalada en servilletero de aluminio.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Compartimiento previsto para instalar unidades externas
                            de aire acondicionado con cerramiento tipo louver.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Jardinera de concreto con recubrimiento interno
                            impermeable. Incluye macetero con planta según diseño
                            paisajístico.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: El color podría variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                        2. <span style={{ textDecoration: "underline" }}>Equipamiento incluido:</span>
                    </p>
                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        2.1 GABINETES DE COCINA:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Cocina con interior de melamina seda notte de 18mm o
                            similar, frentes y puertas de muebles base y aéreos en
                            tablero alvic color cashmere Md de 18 mm o similar.
                            Frente y puertas de muebles aéreos en tablero maderado
                            alvic velasquez 02 de 18 mm o similar. Gavetas con riel
                            merivobox Blum Cierre suave. Bisagras blumotion cierre
                            suave. Zócalo de pvc color aluminio. Uñero tipo gola de
                            aluminio.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Top de cocina en sinterizado snowed river o similar,
                            con salpicadera alta, acabado filo matado con engrosado
                            de 4cms al frente con corte a 45°.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Lavatrastos acero inox una fosa de submontar de 75 cms
                            de ancho, con grifo monomando tipo cuello de ganso con
                            aireador doble función.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: El color podría variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        2.2 CLOSETS:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Walk in closet, módulos de melamina importada de 15 mm
                            color lino cancun o similar, con entrepaños y
                            colgadores, gavetas con riel tipo euro cierre suave, no
                            incluye respaldo.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Closet de dormitorios secundarios, mueble interior con
                            entrepaños en tablero lino cancun de 15 mm o similar.
                            Frente de gavetas en lino cancun de 15 mm o similar.
                            Gavetas con riel euro. Puertas abatibles en lino cancun
                            de 15 mm o similar.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: El color podría variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        2.3 LAVANDERÍA:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Pileta de un lavadero de fibra de vidrio color blanco
                            con soporte de metal y chorro cromado.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Calentador de agua eléctrico; de paso en apartamentos
                            con hasta dos duchas; de tanque en apartamentos con
                            tres duchas o más.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Tomas de agua y drenaje en cajilla para lavadora, y
                            ducto de 4" hacia el exterior para secadora.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: El color podría variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>

                    <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                        2.4 ELECTRODOMÉSTICOS DE COCINA:
                    </p>
                    <ul style={{ listStyleType: "disc", marginLeft: "40px", marginTop: "5px", marginBottom: "5px", paddingLeft: "0" }}>
                        <li style={{ marginBottom: "5px" }}>
                            Refrigerador Samsung de 25 a 27 pies³ French door color
                            acero.
                        </li>
                        <li style={{ marginBottom: "5px" }}>Cooktop eléctrico de 30" Kitchenaid.</li>
                        <li style={{ marginBottom: "5px" }}>
                            Downdraft extractor de olores Kitchenaid oculto dentro
                            de gabinete con blower.
                        </li>
                        <li style={{ marginBottom: "5px" }}>Horno eléctrico empotrable de 30" Samsung.</li>
                        <li style={{ marginBottom: "5px" }}>Microondas empotrable con trimkit Samsung.</li>
                        <li style={{ marginBottom: "5px" }}>Dishwasher de 24" Samsung color acero.</li>
                        <li style={{ marginBottom: "5px" }}>Instalación de dichos electrodomésticos.</li>
                        <li style={{ marginBottom: "5px" }}>
                            Nota: La marca y el color podrían variar por falta de
                            disponibilidad en el mercado.
                        </li>
                    </ul>
                </div>
                <p style={{ marginTop: "15px" }}>
                    Los adquirentes tendrán derecho a utilizar las áreas o
                    amenidades comunes con las que contará el proyecto
                    "Bravante".
                </p>
                <p>
                    El inmueble ofrecido en este compromiso de compraventa,
                    soportará las servidumbres que se detallan en el Régimen de
                    Propiedad Horizontal que BRAVANTE, SOCIEDAD ANÓNIMA, ha
                    definido con el objeto de darle armonía, orden y uniformidad
                    al proyecto, principalmente en cuanto al uso de áreas
                    comunes, reglas de convivencia y cuotas que se fijen.
                </p>
                <p>
                    Manifestamos las partes que aceptamos que el área de los
                    bienes objeto de este contrato podrá variar en más o menos
                    hasta en un dos por ciento (2%).
                </p>
                <p>
                    Es convenido por las partes que la promesa de compraventa
                    constituye una obligación conjunta, en el entendido que LA
                    PARTE PROMITENTE VENDEDORA no cumple si no vende todos los
                    bienes inmuebles y el bien mueble (acción) antes mencionados
                    y la PARTE PROMITENTE COMPRADORA tampoco cumple si no compra
                    todos los bienes inmuebles y el bien mueble (acción) antes
                    mencionados en su conjunto. La PARTE PROMITENTE COMPRADORA{" "}
                    {compradores.length > 1 ? "prometemos" : "prometo"} comprar
                    dichos bienes inmuebles y bien mueble (acción) en su
                    conjunto, y ambas partes manifestamos que la promesa de
                    compraventa y la compraventa futura, están sujetas a las
                    estipulaciones y condiciones que se expresan en este
                    contrato.
                </p>
            </div>

            <div id="clausula-tercera" className="section-spacing">
                <p>
                    <span className="clause-title">TERCERA:</span> La promesa de
                    compraventa que se otorga en este acto se sujetará a las
                    estipulaciones siguientes:{" "}
                    <span className="bold">I) PRECIO:</span> El precio total de
                    la compraventa de los bienes prometidos en venta descritos
                    en la cláusula que antecede es de{" "}
                    <span className="bold highlight-yellow">
                        {getVal<string>(
                            "Condiciones_Economicas.PrecioLetras",
                            "[PRECIO_LETRAS]",
                        )
                            .replace(/\s*(quetzales|dólares|dólar)\s*$/i, "")
                            .toUpperCase()}{" "}
                        DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA (USD.
                        {getVal<number>(
                            "Condiciones_Economicas.PrecioNumeros",
                            0,
                        ).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        ), el cual incluye el IMPUESTO AL VALOR AGREGADO y
                        el IMPUESTO DEL TIMBRE correspondiente;
                    </span>{" "}
                    para lo cual en su momento se podrían redactar dos
                    documentos, el de la compraventa de inmuebles y el de la
                    compraventa de mueble (acción), cada uno con su precio
                    correspondiente.
                </p>
                <p>
                    <span className="bold">II) VARIACIÓN DEL PRECIO.</span>{" "}
                    Manifiesto como la Promitente Compradora que acepto de forma
                    expresa que en caso de nuevas leyes que regulen nuevos
                    impuestos relacionados con el objeto de este contrato y su
                    respectiva construcción o se aumenten los existentes, acepto
                    que en esa misma medida y proporción se aumentará el valor
                    de los bienes prometidos en venta, siempre que se acredite
                    fehacientemente el aumento en que dichas disposiciones han
                    afectado al precio pactado, aceptando consecuentemente dicha
                    variación como valor a cancelar de los bienes objeto de esta
                    promesa, cuyo pago se hará conforme y en conjunto al precio
                    antes establecido y según lo que se establece en el presente
                    contrato.{" "}
                    <span className="bold">III) MONEDA DE PAGO:</span> Las partes
                    libre y expresamente pactamos que el precio de este contrato
                    se pague en Dólares de los Estados Unidos de Norte América.
                    No obstante, la PARTE PROMITENTE COMPRADORA, mediante previa
                    autorización por escrito de la PARTE PROMITENTE VENDEDORA,
                    podrá efectuar el pago en Quetzales, para cuyo efecto la
                    PARTE PROMITENTE COMPRADORA autorizo a la PROMITENTE
                    VENDEDORA a aplicar la tasa de cambio referencial para la
                    VENTA de dólares de los Estados Unidos de América que
                    publique el Banco Agromercantil de Guatemala, Sociedad
                    Anónima, el día en que deba efectuarse el pago.{" "}
                    <span className="bold">IV) FORMA DE PAGO.</span> LA PARTE
                    PROMITENTE COMPRADORA pagaré el valor de los bienes
                    prometidos en venta de la siguiente forma:
                </p>
                <p>
                    <span className="bold">a)</span> Un primer pago por la
                    cantidad de{" "}
                    <span className="bold highlight-yellow">
                        {getVal<string>(
                            "Condiciones_Economicas.ReservaLetras",
                            "[RESERVA_LETRAS]",
                        )
                            .replace(/\s*(quetzales|dólares|dólar)\s*$/i, "")
                            .toUpperCase()}{" "}
                        DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA (USD.
                        {getVal<number>(
                            "Condiciones_Economicas.ReservaNumeros",
                            0,
                        ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        )
                    </span>{" "}
                    en concepto de reserva, que Yo, la parte Promitente
                    Vendedora manifiesto que tengo recibido a mi entera
                    satisfacción.
                </p>
                <p>
                    <span className="bold">b)</span> Un segundo pago por la
                    cantidad total de{" "}
                    <span className="highlight-yellow">
                        {getVal<string>(
                            "Condiciones_Economicas.SegundoPagoLetras",
                            "[SEGUNDO_PAGO_LETRAS]",
                        )
                            .replace(/\s*(quetzales|dólares|dólar)\s*$/i, "")
                            .toUpperCase()}{" "}
                        DÓLARES DE LOS ESTADOS UNIDOS DE NORTE AMÉRICA (USD.
                        {getVal<number>(
                            "Condiciones_Economicas.SegundoPagoNumeros",
                            0,
                        ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        )
                    </span>
                    , que la parte Promitente Compradora entregará mediante{" "}
                    <span className="highlight-red">
                        {getVal(
                            "Condiciones_Economicas.CantidadPagosLetras",
                            "[CANTIDAD_PAGOS_LETRAS]",
                        )}
                    </span>{" "}
                    (
                    <span className="highlight-red">
                        {getVal(
                            "Condiciones_Economicas.CantidadPagosNumeros",
                            "[CANTIDAD_PAGOS]",
                        )}
                    </span>
                    ) pagos a la Promitente Vendedora, de la siguiente forma:
                </p>
                <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                    <ol style={{ listStyleType: "decimal", paddingLeft: "0" }}>
                        {(() => {
                            const pagos = getVal<Pago[]>("Pagos", []);
                            if (!Array.isArray(pagos) || pagos.length === 0)
                                return null;
                            const meses = [
                                "enero",
                                "febrero",
                                "marzo",
                                "abril",
                                "mayo",
                                "junio",
                                "julio",
                                "agosto",
                                "septiembre",
                                "octubre",
                                "noviembre",
                                "diciembre",
                            ];
                            return pagos.map((p, idx) => {
                                if (!p.fecha || !p.value) return null;
                                const f = new Date(p.fecha);
                                const diaNum = f.getUTCDate();
                                const diaLetras = numberToWords(diaNum).toLowerCase();
                                const mesNombre = meses[f.getUTCMonth()];
                                const anioLetras = numberToWordsYear(f.getUTCFullYear()).toLowerCase();
                                const monto = parseFloat(p.value);
                                return (
                                    <li
                                        key={idx}
                                        style={{ 
                                            margin: "8px 0", 
                                            textIndent: "0",
                                            paddingLeft: "10px"
                                        }}
                                    >
                                        El día {diaLetras} ({diaNum}) de {mesNombre} de {anioLetras}, la cantidad de{" "}
                                        <span className="bold">
                                            {numberToWords(Math.floor(monto)).toUpperCase()}{" "}
                                            DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA (USD.
                                            {monto.toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                            )
                                        </span>
                                        .
                                    </li>
                                );
                            });
                        })()}
                    </ol>
                </div>
                <p>
                    y <span className="bold">c)</span> Un último pago por la
                    cantidad de{" "}
                    <span className="bold highlight-yellow">
                        {getSaldoFinal().letras.toUpperCase()} DÓLARES DE LOS
                        ESTADOS UNIDOS DE AMÉRICA (USD.
                        {getSaldoFinal().numeros})
                    </span>{" "}
                    que Yo, LA PARTE PROMITENTE COMPRADORA deberé pagar a LA
                    PARTE PROMITENTE VENDEDORA a más tardar al vencimiento del
                    plazo de la presente promesa; pago que Yo, LA PARTE
                    PROMITENTE COMPRADORA realizaré con los fondos que me serán
                    desembolsados en virtud de un crédito hipotecario que
                    gestionaré ante un Banco del sistema nacional para la
                    adquisición de los bienes objeto de este contrato. Es una
                    condición para el cumplimiento de la presente promesa que al
                    momento de otorgarse la escritura de compraventa respectiva
                    esté pagado el total del valor de los bienes objeto de este
                    contrato conforme lo aquí pactado.
                </p>
                <p>
                    <span className="bold">V) LUGAR DE PAGO.</span> LA PARTE
                    PROMITENTE COMPRADORA deberé efectuar los pagos en las
                    oficinas de LA PARTE PROMITENTE VENDEDORA, ubicadas en
                    Boulevard Rafael Landívar, 10-05, zona 16, Paseo Cayalá,
                    Edificio D-1, 2do. Nivel, Guatemala, Guatemala, las cuales
                    son del conocimiento de la Parte Promitente Compradora, sin
                    necesidad de cobro o requerimiento alguno, o de cualquier
                    forma o en cualquier otra dirección que me comunique en su
                    momento y por escrito la PROMITENTE VENDEDORA, o por medio
                    de transferencia bancaria, a la cuenta de la PROMITENTE
                    VENDEDORA. Los pagos los deberé efectuar la parte promitente
                    compradora en días y horas hábiles. En el caso que el día de
                    pago fuere un día inhábil, el pago lo efectuaré la parte
                    promitente compradora el día hábil siguiente.{" "}
                    <span className="bold">VI) MORA.</span> Si existe atraso en
                    efectuar cualquiera de los pagos antes indicados en la forma
                    y plazo aquí acordados, LA PARTE PROMITENTE COMPRADORA
                    reconozco y me obligo a pagar a la PARTE PROMITENTE
                    VENDEDORA un interés del TRES por ciento (3%) mensual sobre
                    el saldo vencido calculado a partir del día siguiente en que
                    debió efectuarse el pago hasta la fecha en que efectivamente
                    se realice el pago adeudado. Asimismo, por cada cheque
                    rechazado la PARTE PROMITENTE COMPRADORA me obligó a
                    cancelar la cantidad de QUINIENTOS QUETZALES EXACTOS (Q.
                    500.00) en concepto de gastos administrativos generados por
                    tal hecho.{" "}
                    <span className="bold">VII) DE LOS GRAVÁMENES.</span> LA
                    PARTE PROMITENTE VENDEDORA traspasaré los bienes libres de
                    gravámenes, limitaciones y/o anotaciones, salvo aquellas que
                    fueren necesarios para el proyecto a desarrollar, tales como
                    las servidumbres y régimen de propiedad horizontal y su
                    respectivo reglamento al cual estará sometido el Edificio al
                    que pertenecen los bienes objeto de este contrato.{" "}
                    <span className="bold">VIII) GASTOS.</span> Los honorarios
                    profesionales, gastos y aranceles de registro en que se
                    incurra para el presente contrato y la futura compraventa
                    correrán por cuenta de LA PARTE PROMITENTE COMPRADORA, los
                    cuales no se encuentran incluidos dentro del valor de la
                    compraventa prometida; estos deberán ser cancelados en su
                    totalidad al momento de la formalización de la compraventa
                    prometida en este documento. A partir de la fecha de
                    suscripción del contrato de compraventa prometido, serán a
                    cargo exclusivo de la PARTE PROMITENTE COMPRADORA los gastos
                    correspondientes a Impuesto Único Sobre Inmuebles (IUSI),
                    impuestos inmobiliarios, territoriales y cualquier otro
                    impuesto, o arbitrio en general no especificado aquí o
                    cualquier otro que se cree en el futuro, aplicables a los
                    bienes objeto de este contrato, así como mantenimiento y
                    gastos comunes de los bienes objeto de esta promesa que fije
                    el propietario o administración del edificio, de igual
                    manera, LA PARTE PROMITENTE COMPRADORA me obligo desde ya a
                    pagar los montos correspondientes al mantenimiento mensual
                    los cuales corresponderán a la Administración propia de
                    BRAVANTE o bien quien ejerza la administración del mismo.
                    Dicho monto está sujeto a cambio según lo considere la
                    Administración de los Condominios.{" "}
                    <span className="bold">IX) HONORARIOS Y GASTOS.</span> Los
                    honorarios notariales y gastos de inscripción que causen
                    este documento y la futura compraventa, correrán por cuenta
                    de la PARTE PROMITENTE COMPRADORA, los cuales No se
                    encuentran incluidos dentro del monto de la compraventa
                    prometida, debiendo ser LA PARTE PROMITENTE VENDEDORA quien
                    designe el Notario que autorice todos los documentos y
                    escrituras públicas relacionadas directa o indirectamente con
                    el presente contrato. El precio aquí pactado No incluye los
                    gastos y honorarios correspondientes a la autorización del
                    presente contrato y la compraventa prometida. La PARTE
                    PROMITENTE COMPRADORA renuncio expresamente a mi derecho de
                    elección del notario autorizante de la escritura de
                    compraventa definitiva y/o de cualquier otro documento o
                    escritura pública relacionada directa o indirectamente con el
                    presente contrato, y acepto al notario designado por la
                    PARTE PROMITENTE VENDEDORA.{" "}
                    <span className="bold">X) PLAZO.</span> El plazo del presente
                    contrato de Promesa de Compraventa es de{" "}
                    <span className="highlight-yellow">
                        {getPlazoMeses().letras.toUpperCase()} (
                        {getPlazoMeses().numeros})
                    </span>{" "}
                    meses.{" "}
                    <span className="bold">XI) ENTREGA.</span> La entrega y
                    recepción de los bienes objeto de la presente promesa de
                    compraventa se realizará al momento de la firma de la
                    escritura traslativa de dominio en la fecha aquí pactada, es
                    decir, a la fecha del vencimiento del plazo del presente
                    contrato, lo cuál sería en el mes de{" "}
                    <span className="highlight-yellow">
                        {getMesEntrega()}
                    </span>
                    . No obstante, las partes podremos suscribir el contrato
                    prometido antes de la fecha aquí indicada si ambas partes
                    así lo acordaremos y estuviéremos en posibilidad de hacerlo.
                    La PARTE PROMITENTE COMPRADORA tendré por recibido a mi
                    entera satisfacción los bienes a partir de ese momento. La
                    PARTE PROMITENTE COMPRADORA seré la única y exclusiva
                    responsable por pérdidas materiales, o por los daños y
                    perjuicios que sufra ésta, sus empleados, familiares, o
                    personas individuales que habiten el inmueble, a partir que
                    reciba el apartamento por parte de la PARTE PROMITENTE
                    VENDEDORA. No obstante lo aquí pactado, las partes de común
                    acuerdo pactamos que la entrega de los bienes y el plazo del
                    presente contrato podrá diferirse por un plazo de{" "}
                    <span style={{ textDecoration: "underline" }}>
                        seis meses adicionales y posteriores a la fecha de
                        entrega antes establecida
                    </span>
                    , sin responsabilidad para la PARTE PROMITENTE VENDEDORA.
                    Estos plazos son sin perjuicios de atraso por caso fortuito
                    o fuerza mayor que afecte el cumplimiento y siempre que la
                    parte promitente compradora cumpla con todas y cada una de
                    mis obligaciones y con efectuar los pagos en las fechas
                    indicadas. El plazo puede ser prorrogable por mutuo acuerdo
                    de las partes. Asimismo, pactamos las partes que en caso de
                    imposibilidad al desarrollo del presente proyecto en virtud
                    de retraso excesivo de las autorizaciones gubernamentales
                    respectivas, LA PARTE PROMITENTE VENDEDORA, deberé
                    notificar tal acontecimiento a la PARTE PROMITENTE
                    COMPRADORA y deberé devolver el cien por ciento (100%) del
                    monto efectivamente recibido sumado a un interés anual del
                    tres por ciento (3%) en concepto de daños y perjuicios,
                    calculado de la siguiente forma: Por cada pago recibido por
                    LA PARTE PROMITENTE VENDEDORA y efectivamente disponible, a
                    partir de ese día se calculará el interés, el cual no será
                    capitalizable; calculándose el intereses sobre cada pago
                    efectivamente recibido; sujeto al plazo y forma que se
                    estipula más adelante en este contrato, renunciando desde ya
                    LA PARTE PROMITENTE COMPRADORA a cualquier otro reclamo
                    judicial o extrajudicial por tal concepto.{" "}
                    <span className="bold">
                        XII) REGIMEN DE PROPIEDAD HORIZONTAL.
                    </span>{" "}
                    LA PARTE PROMITENTE COMPRADORA declaro estar enterada y
                    desde ya acepto que los bienes que por este acto prometo
                    comprar serán destinados únicamente para vivienda familiar,
                    asimismo, que dichos bienes estarán sometidos a Régimen de
                    Propiedad Horizontal, y por lo tanto, acepto desde ya
                    cumplir con el mismo y con los reglamentos y demás normas
                    legales del mismo, así como, con los reglamentos y normas
                    del "CONDOMINIO BRAVANTE", dado que los inmuebles prometidos
                    en venta se encuentran dentro del perímetro del mismo; y en
                    especial, con las obligaciones de pagos de cuotas de
                    mantenimientos y condiciones para la reventa o alquiler de
                    los inmuebles, los cuales son de mi conocimiento.{" "}
                    <span className="bold">
                        XIII) PLANOS Y CAMBIOS EN LA CONSTRUCCIÓN:
                    </span>{" "}
                    LA PARTE PROMITENTE COMPRADORA declaro expresamente que
                    conozco y acepto los planos de distribución interna de
                    ambientes así como acabados, distribución, diseño y no podré
                    solicitar que se hagan modificaciones o adiciones a los
                    planos y especificaciones antes mencionados, salvo que éstas
                    fueran aprobadas previamente por LA PARTE PROMITENTE
                    VENDEDORA y que el valor de las modificaciones o adiciones,
                    sea pagado en su totalidad por mí como LA PARTE PROMITENTE
                    COMPRADORA, antes de que se lleven a cabo las mismas. Así
                    mismo LA PROMITENTE VENDEDORA, me reservo el derecho de
                    realizar nuevos cambios en las especificaciones contenidas
                    en este contrato si así conviene a la arquitectura,
                    estructura y funcionamiento del proyecto, o si fuera
                    necesario porque algún elemento o material no puede
                    obtenerse en cantidad suficiente dentro del periodo de
                    construcción, o que dicho cambio sea requerido por alguna
                    autoridad estatal, municipal o administrativa.{" "}
                    <span className="bold">XIV) DE LA ACCIÓN.</span> LA PARTE
                    PROMITENTE COMPRADORA declaro estar de acuerdo que el bien
                    mueble (acción) que por el presente acto se me promete
                    vender, que sea de una entidad de carácter mercantil y/o
                    civil indistintamente, o bien, la misma se relacione tanto a
                    la administración del proyecto antes relacionado o a las
                    áreas comunes indistintamente; todo lo anterior a elección y
                    según disposición de la PARTE PROMITENTE VENDEDORA.
                </p>
            </div>

            <div id="clausula-cuarta" className="section-spacing">
                <p>
                    <span className="clause-title">
                        CUARTA: TERMINACIÓN ANTICIPADA.
                    </span>{" "}
                    Sin perjuicio de otros derechos que correspondan a LA PARTE
                    PROMITENTE VENDEDORA conforme este contrato, la PARTE
                    PROMITENTE VENDEDORA podré resolver en cualquier momento el
                    presente contrato, sin necesidad de declaración judicial
                    previa o posterior, y dar por terminado en forma anticipada
                    el mismo sin responsabilidad de mi parte, si LA PARTE
                    PROMITENTE COMPRADORA no cumple con una sola de sus
                    obligaciones de pago en la fecha, monto y forma aquí
                    pactados, dicho incumplimiento constituirá una condición
                    resolutoria expresa de este contrato. En caso ocurra el
                    hecho constitutivo de la condición resolutoria expresa, La
                    PARTE PROMITENTE VENDEDORA tengo el derecho de disponer de
                    los bienes objetos de este contrato en cualquier forma y
                    podré negociar, prometer en venta, vender o ceder los mismos
                    a un tercero, sin que haya necesidad que preceda orden o
                    resolución judicial o autorización alguna de LA PARTE
                    PROMITENTE COMPRADORA, procediéndose de conformidad con lo
                    expuesto en las cláusulas subsiguientes especialmente lo
                    relacionado al cumplimiento del pago indemnizatorio. Este
                    contrato también podrá darse por terminado por decisión
                    unilateral de la PARTE PROMITENTE VENDEDORA, o de la parte
                    PROMITENTE COMPRADORA, sin necesidad de justificar causa
                    alguna, pero en todo caso, las partes se obligan al
                    cumplimiento del pago indemnizatorio regulado en las
                    cláusulas siguientes. De igual manera, en caso que la{" "}
                    <span className="bold">
                        PARTE PROMITENTE COMPRADORA
                    </span>
                    , durante el plazo del presente contrato fuere sujeto de
                    procesos judiciales de cualquier índole o naturaleza que
                    conlleve la posibilidad de concluir con sentencia alguna de
                    índole condenatoria que afecte mi libertad y/o capacidad de
                    pago, por el presente acto confiero facultad especial a{" "}
                    <span className="bold">
                        LA PARTE PROMITENTE VENDEDORA
                    </span>{" "}
                    para resolver el presente contrato sin responsabilidad
                    indemnizatoria y/o legal alguna sujetándome al procedimiento
                    de devolución de los montos dados en concepto de enganche,
                    según lo estipulado en el presente contrato en cuanto a la
                    forma y plazo.
                </p>
            </div>

            <div id="clausula-quinta" className="section-spacing">
                <p>
                    <span className="clause-title">
                        QUINTA: CLAUSULA INDEMNIZATORIA DE LA PARTE PROMITENTE
                        VENDEDORA.
                    </span>{" "}
                    Las partes renunciamos expresamente a la aplicación del
                    artículo un mil cuatrocientos cuarenta y dos (1,442) del
                    Código Civil vigente, de manera que los pagos recibidos a
                    cuenta del precio no constituirán el equivalente a los daños
                    y perjuicios, ni la parte promitente vendedora estaré en la
                    obligación de restituir el doble de lo que hubiese recibido.
                    En relación a daños y perjuicios resultantes de la
                    inejecución a falta de cumplimiento del contrato, las partes
                    manifestamos que se regulará la relación contractual de
                    conformidad con lo que se establece en ésta y la siguiente
                    cláusula. El incumplimiento o el retardo en el cumplimiento
                    por parte de PROMITENTE VENDEDORA, se regirá por las
                    estipulaciones siguientes, pero cobrarán efecto, sí y solo
                    sí la PARTE PROMITENTE COMPRADORA he cumplido a cabalidad y
                    en tiempo con mis obligaciones de pago. Si la Parte
                    Vendedora decido resolver el presente contrato sin
                    justificar causa alguna o sin haber sido motivado por la
                    condición resolutoria expresa, deberé devolver a la parte
                    PROMITENTE COMPRADORA los montos recibidos a cuenta del
                    precio del apartamento sumado a un interés anual del tres
                    por ciento (3%) en concepto de daños y perjuicios, en un
                    plazo no mayor, de seis (6) meses a partir de la fecha que
                    se le notifique a la parte PROMITENTE COMPRADORA, calculado
                    de la siguiente forma: Por cada pago recibido por LA PARTE
                    PROMITENTE VENDEDORA y efectivamente disponible, a partir de
                    ese día se calculará el interés, el cual no será
                    capitalizable; calculándose el intereses sobre cada pago
                    efectivamente recibido.
                </p>
            </div>

            <div id="clausula-sexta" className="section-spacing">
                <p>
                    <span className="clause-title">
                        SEXTA: CLÁUSULA INDEMNIZATORIA DE LA PARTE PROMITENTE
                        COMPRADORA.
                    </span>{" "}
                    En caso de incumplimiento por parte de LA PARTE PROMITENTE
                    COMPRADORA, dará derecho A LA PARTE PROMITENTE VEDENDORA a
                    proceder de la siguiente forma: 1) a dar por concluida la
                    negociación sin ningún tipo de procedimiento posterior y 2)
                    cobrar por concepto de indemnización y perjuicios, los
                    siguientes montos en los siguientes casos:
                </p>
                <p style={{ marginLeft: "20px" }}>
                    <span className="bold">A.</span> Por desistir de la compra
                    prometida en el presente contrato por cualquier
                    circunstancia, por la no autorización del crédito bancario,
                    y por el incumplimiento a lo pactado en el presente
                    contrato; todo esto después de haber firmado la presente
                    promesa de compraventa de bienes inmuebles y mueble
                    (acción): El{" "}
                    <span className="bold">
                        diez por ciento (10%) del valor total de la compraventa
                        pactada en la presente promesa de compraventa de bienes
                        inmuebles y mueble (acción)
                    </span>
                    .
                </p>
                <p style={{ marginLeft: "20px" }}>
                    <span className="bold">B.</span> En el caso de haber
                    solicitado cambios y mejoras en el inmueble prometido en
                    venta, y estos cambios ya se hubieran realizado; por
                    desistir de la compra prometida en el presente contrato por
                    cualquier circunstancia, por la no autorización del crédito
                    bancario, y por el incumplimiento a lo pactado en el
                    presente contrato; todo esto después de haber firmado la
                    presente promesa de compraventa de bienes inmuebles y mueble
                    (acción): El{" "}
                    <span className="bold">
                        diez por ciento (10%) del valor total de la compraventa
                        pactada en la presente promesa de compraventa de bienes
                        inmuebles y mueble (acción)
                    </span>{" "}
                    más un fee de{" "}
                    <span className="bold">
                        CINCO MIL DOLARES DE LOS ESTADOS UNIDOS DE NORTE
                        AMERICA (UDS.5,000.00)
                    </span>
                    , más el monto efectivamente pagado por estos cambios.
                </p>
                <p>
                    En todos los casos anteriores, la penalización se descontará
                    directamente del monto que el cliente hubiera cancelado a la
                    fecha del desistimiento, acordando las partes que el plazo
                    para el reintegro del saldo a favor DE LA PARTE PROMITENTE
                    COMPRADORA, deberá realizarse en un plazo no mayor a seis
                    (6) meses, a partir de la fecha del desistimiento o
                    aplicación de la penalización.
                </p>
            </div>

            <div id="clausula-septima" className="section-spacing">
                <p>
                    <span className="clause-title">
                        SÉPTIMA: CESIÓN DE DERECHOS.
                    </span>{" "}
                    LA PARTE PROMITENTE COMPRADORA no{" "}
                    {compradores.length > 1 ? "podremos" : "podré"} negociar,
                    ceder, enajenar, o de cualquier otra forma disponer de las
                    obligaciones o derechos que{" "}
                    {compradores.length > 1 ? "adquirimos" : "adquiere"} en este
                    contrato, salvo que{" "}
                    {compradores.length > 1 ? "contemos" : "cuente"} con la
                    aprobación previa y por escrito de LA PARTE PROMITENTE
                    VENDEDORA, y esta la autorizará únicamente cuando: i) Ya LA
                    PARTE PROMITENTE COMPRADORA hubiera cancelado como mínimo el
                    setenta por ciento (70%) del enganche pactado, y ii) Que
                    dentro del proyecto ya hubiera un avance de ventas del
                    setenta por ciento (70%) de la totalidad del proyecto. LA
                    PARTE PROMITENTE VENDEDORA, por mi parte, quedo en libertad
                    de negociar, ceder, o enajenar los derechos y obligaciones
                    que adquiero en este contrato, parcial o totalmente, dando
                    posterior aviso a{" "}
                    {compradores.length > 1
                        ? "LOS PROMITENTES COMPRADORES"
                        : "LA PARTE PROMITENTE COMPRADORA"}
                    .
                </p>
            </div>

            <div id="clausula-octava" className="section-spacing">
                <p>
                    <span className="clause-title">
                        OCTAVA: PREEMINENCIA DEL PRESENTE CONTRATO.
                    </span>{" "}
                    {compradores.length > 1
                        ? "LOS PROMITENTES COMPRADORES"
                        : "EL PROMITENTE COMPRADOR"}{" "}
                    Y EL PROMITENTE VENDEDOR manifestamos que el texto del
                    contrato contenido en el presente documento privado,
                    prevalecerá sobre cualquier otro documento o acuerdo,
                    cotización, oral o escrito, respecto del objeto del presente
                    contrato. Por consiguiente, los documentos que hubieren sido
                    firmados con anterioridad por nosotros los otorgantes,
                    carecerán de validez en todo lo que fueren contradictorios,
                    incongruentes, estipulen condiciones distintas a lo pactado
                    en este documento privado o que aparecieren contrarias a las
                    intenciones de las partes contratantes. Continuamos
                    manifestando ambas partes que cualquier modificación,
                    adhesión o anexo al presente contrato para que se considere
                    parte integrante del mismo, debe de constar por escrito y
                    firmado por ambas partes.
                </p>
            </div>

            <div id="clausula-novena" className="section-spacing">
                <p>
                    <span className="clause-title">
                        NOVENA: LUGAR PARA RECIBIR NOTIFICACIONES.
                    </span>{" "}
                    Para todos los efectos legales que correspondan, las partes
                    contratantes señalamos como lugares para recibir toda clase
                    de notificaciones, citaciones y emplazamientos, las
                    direcciones:{" "}
                    <span className="bold">
                        a) LA PARTE PROMITENTE COMPRADORA:
                    </span>{" "}
                    <span className="highlight-yellow">
                        {getDireccionComprador()}
                    </span>
                    .{" "}
                    <span className="bold">
                        b) LA PARTE PROMITENTE VENDEDORA:
                    </span>{" "}
                    Boulevard Rafael Landívar diez guión cero cinco (10-05),
                    zona dieciséis (16), Paseo Cayalá, Edificio D uno (D1)
                    oficina doscientos dos (202) segundo nivel, del Municipio de
                    Guatemala, Departamento de Guatemala. Cualquier cambio de
                    dirección de cualquiera de las partes deberá avisarse por
                    escrito con acuse de recepción a la otra, y en tanto no se
                    haga, se tendrán por bien hechas las notificaciones,
                    citaciones y emplazamientos que se efectúen en los lugares
                    indicados.
                </p>
            </div>

            <div id="clausula-decima" className="section-spacing">
                <p>
                    <span className="clause-title">
                        DÉCIMA: CONFIDENCIALIDAD.
                    </span>{" "}
                    LA PARTE PROMITENTE COMPRADORA{" "}
                    {compradores.length > 1 ? "nos obligamos" : "me obligo"} a
                    mantener bajo estricta confidencialidad toda la información
                    que en virtud del presente contrato le fuera suministrada
                    por la PARTE PROMITENTE VENDEDORA, así como{" "}
                    {compradores.length > 1 ? "deberemos" : "deberé"} mantener
                    bajo esta misma reserva el texto de este contrato.
                </p>
            </div>

            <div id="clausula-decima-primera" className="section-spacing">
                <p>
                    <span className="clause-title">
                        DÉCIMA PRIMERA: CLAUSULA COMPROMISORIA.
                    </span>{" "}
                    Las partes contratantes convenimos en que de producirse
                    cualquier controversia, conflicto o disputa entre nosotras,
                    derivada directa o indirectamente de este contrato, de su
                    interpretación y/o de su ejecución o cumplimiento, se
                    resolverá en la forma siguiente:{" "}
                    <span className="bold">a)</span> Mediante la vía directa,
                    con o sin intermediación de un conciliador;{" "}
                    <span className="bold">b)</span> De no ser posible la
                    solución por la vía directa dentro de los tres meses
                    siguientes de suscitado el conflicto, ambas partes
                    renunciamos expresamente al fuero de nuestro domicilio y
                    jurisdicción, y a la competencia de los tribunales de
                    justicia de Guatemala, y mediante esta cláusula
                    compromisoria acordamos desde ya someter la controversia,
                    conflicto o disputa a un Arbitraje de Equidad de conformidad
                    con el Reglamento de Conciliación y Arbitraje del{" "}
                    <span className="bold">
                        CENAC (Centro de Conciliación y Arbitraje de la Cámara
                        de Comercio de Guatemala)
                    </span>
                    , el cual las partes contratantes aceptamos desde ahora en
                    forma irrevocable. Acordamos los contratantes que desde ya
                    autorizamos al CENAC para que nombre al árbitro de
                    conformidad con su reglamento, así mismo, acordamos que el
                    arbitraje, se llevará a cabo en la Ciudad de Guatemala, en
                    idioma español, y se decidirá por un solo árbitro.
                    Adicionalmente, acordamos las partes contratantes que el
                    CENAC será la institución encargada de administrar los
                    procedimientos de conciliación y arbitraje según sea el
                    caso, de conformidad con su normativa. El laudo arbitral no
                    se podrá impugnar, y las partes aceptamos desde ya que
                    constituirá título ejecutivo suficiente, perfecto y eficaz.
                </p>
            </div>

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
                    {compradores.map((_, idx) => (
                        <div
                            key={idx}
                            style={{ width: "45%", marginBottom: "50px" }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    borderBottom: "1px solid black",
                                }}
                            ></div>
                        </div>
                    ))}
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
                    <span className="bold">
                        {numberToWords(compradores.length + 1).toUpperCase()} (
                        {compradores.length + 1})
                    </span>{" "}
                    firmas que anteceden calzan en un Contrato de Promesa de
                    Compraventa de Bienes Inmuebles y Bien Mueble (Acción), y
                    son auténticas por haber sido puestas en mi presencia el día
                    de hoy por:{" "}
                    <span className="bold">
                        a) VENANCIO GÓMEZ (único apellido)
                    </span>
                    , quien se identifica con el Documento Personal de
                    Identificación -DPI- con Código Único de Identificación
                    -CUI- dos mil quinientos cuarenta, setenta y nueve mil
                    doscientos veintinueve, mil cuatrocientos uno (2540 79229
                    1401), extendido por el Registro Nacional de las Personas de
                    la República de Guatemala, compareciendo en su calidad de{" "}
                    <span className="bold">
                        ADMINISTRADOR ÚNICO Y REPRESENTANTE LEGAL
                    </span>{" "}
                    de la entidad{" "}
                    <span className="bold">BRAVANTE, SOCIEDAD ANÓNIMA</span>; y
                    por:{" "}
                </p>
                {compradores.map((c, idx) => (
                    <p key={idx} style={{ marginTop: "10px" }}>
                        <span className="bold">
                            {String.fromCharCode(98 + idx)}){" "}
                            <span className="highlight-yellow">{c.Nombre}</span>
                        </span>
                        , quien se identifica con el Documento Personal de
                        Identificación -DPI-, con Código Único de Identificación
                        -CUI- número{" "}
                        <span className="highlight-yellow">
                            {dpiToLetras(c.DPI || "")} ({formatCUI(c.DPI || "")})
                        </span>
                        , extendido por el Registro Nacional de las Personas de
                        la República de Guatemala;{" "}
                        {compradores.length > 1
                            ? "quienes vuelven"
                            : "quien vuelve"}{" "}
                        a firmar la presente acta de legalización ante el
                        infrascrito Notario quien de todo lo relacionado Doy Fe.
                    </p>
                ))}
            </div>

            <div style={{ marginTop: "80px" }}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "40px",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            width: "45%",
                            borderBottom: "1px solid black",
                        }}
                    ></div>
                    {compradores.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: "45%",
                                borderBottom: "1px solid black",
                            }}
                        ></div>
                    ))}
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
        </div>
    );
};
