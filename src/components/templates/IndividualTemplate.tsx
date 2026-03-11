import React from "react";
import type {
    TemplateProps,
    Comprador,
    Estacionamiento,
    Bodega,
    Pago,
} from "./types";
import { DocumentStyles } from "./DocumentStyles";
import { numberToWords, numberToWordsYear, toTitleCase } from "./utils";

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

    return (
        <div className="documento-promesa shadow-xl">
            <DocumentStyles />

            <div className="document-header">
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
                                                    {(
                                                        c.EstadoCivil || ""
                                                    ).toLowerCase()}
                                                </span>
                                                ,{" "}
                                                <span className="highlight-yellow">
                                                    {toTitleCase(c.Profesion || "")}
                                                </span>
                                                ,{" "}
                                                <span className="highlight-yellow">
                                                    {(
                                                        c.Nacionalidad ||
                                                        "guatemalteco"
                                                    ).toLowerCase()}
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
                                                    {c.DPI_Letras}
                                                </span>{" "}
                                                ({c.DPI}), extendido por el
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
                                        {compradores.length > 1
                                            ? "LOS PROMITENTES COMPRADORES"
                                            : "EL PROMITENTE COMPRADOR"}
                                    </span>
                                    {compradores.length > 1 ? " o " : " o "}
                                    <span className="party-name">
                                        "LA PARTE PROMITENTE COMPRADORA"
                                    </span>
                                    .
                                </>
                            );
                        } else {
                            return (
                                <>
                                    Yo,{" "}
                                    <span className="highlight-yellow">
                                        {getComprador(0, "Nombre")}
                                    </span>
                                    , quien declaro ser de{" "}
                                    <span className="highlight-yellow">
                                        {(getComprador(0, "Edad_Letras") || "").toLowerCase()}
                                    </span>{" "}
                                    años de edad,{" "}
                                    <span className="highlight-yellow">
                                        {(
                                            getComprador(0, "EstadoCivil") || ""
                                        ).toLowerCase()}
                                    </span>
                                    ,{" "}
                                    <span className="highlight-yellow">
                                        {toTitleCase(getComprador(0, "Profesion") || "")}
                                    </span>
                                    ,{" "}
                                    <span className="highlight-yellow">
                                        {(
                                            getComprador(
                                                0,
                                                "Nacionalidad",
                                                "guatemalteco",
                                            ) || ""
                                        ).toLowerCase()}
                                    </span>
                                    , de este domicilio, me identifico con el
                                    Documento Personal de Identificación -DPI-,
                                    con Código Único de Identificación -CUI-
                                    número{" "}
                                    <span className="highlight-yellow">
                                        {getComprador(0, "DPI_Letras")}
                                    </span>{" "}
                                    ({getComprador(0, "DPI")}), extendido por el
                                    Registro Nacional de las Personas de la
                                    República de Guatemala; quien en adelante
                                    seré referido simple e indistintamente como{" "}
                                    <span className="party-name">
                                        "EL PROMITENTE COMPRADOR"
                                    </span>{" "}
                                    o{" "}
                                    <span className="party-name">
                                        "LA PARTE PROMITENTE COMPRADORA"
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
                        f) Tuberías para las instalaciones de agua fría
                    </span>
                    . <span className="bold">g) Tubería para drenajes</span>{" "}
                    primarios y secundarios.{" "}
                    <span className="bold">
                        h) Un espacio para gimnasio equipado
                    </span>
                    . <span className="bold">i) Áreas de servicio</span> para
                    personal contratado del complejo.{" "}
                    <span className="bold">j) Áreas de juegos para niños</span>.{" "}
                    <span className="bold">
                        k) Salones de juegos y de usos múltiples
                    </span>
                    .{" "}
                    <span className="bold">
                        l) Áreas de estar para adultos y jóvenes
                    </span>
                    . <span className="bold">m) Sky Lounge</span> en azotea de
                    cada torre.{" "}
                    <span className="bold">
                        n) Área administrativa para el proyecto
                    </span>
                    .
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
                        {getVal(
                            "Descripcion_del_Inmueble.Nivel_Letras",
                            "[NIVEL_LETRAS]",
                        )}{" "}
                        ({getVal("Descripcion_del_Inmueble.Nivel")})
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
                                        {p.Numero_Letras || "[NUMERO_LETRAS]"}
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
                                            {b.Numero_Letras ||
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
                        {getVal(
                            "Descripcion_del_Inmueble.Nivel_Letras",
                            "[NIVEL_LETRAS]",
                        )}{" "}
                        ({getVal("Descripcion_del_Inmueble.Nivel")})
                    </span>{" "}
                    del Complejo; apartamento que consta de{" "}
                    <span className="highlight-yellow">
                        {getVal(
                            "Descripcion_del_Inmueble.Habitaciones_Letras",
                            "[HAB_LETRAS]",
                        )}{" "}
                        ({getVal("Descripcion_del_Inmueble.Habitaciones")})
                    </span>{" "}
                    habitaciones,{" "}
                    {getVal<string>("Descripcion_del_Inmueble.NumeroBR") && (
                        <>
                            <span className="highlight-yellow">
                                {getVal<string>("Descripcion_del_Inmueble.NumeroBR")}
                            </span>{" "}
                            baños,{" "}
                        </>
                    )}
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
                        )}
                    </span>{" "}
                    (
                    <span className="highlight-yellow">
                        {getVal(
                            "Descripcion_del_Inmueble.AreaConstruccionNumeros",
                        )}
                    </span>{" "}
                    metros cuadrados) de construcción;{" "}
                    <span className="bold">b)</span>{" "}
                    <span className="highlight-red">
                        {getParqueosDescripcion()}
                    </span>
                    ; <span className="bold">c)</span> Una terraza o balcón, con
                    un área aproximada de{" "}
                    <span className="highlight-red">
                        {getVal(
                            "Descripcion_del_Inmueble.TerrazaBalconAreaLetras",
                        )}
                    </span>{" "}
                    (
                    <span className="highlight-red">
                        {getVal(
                            "Descripcion_del_Inmueble.TerrazaBalconAreaNumeros",
                        )}
                    </span>{" "}
                    metros cuadrados); y <span className="bold">d)</span> El
                    bien mueble (acción) de la entidad relacionada y pertinente
                    al proyecto.
                </p>
                <p>
                    Los acabados y equipamiento estándar con los que contará el
                    apartamento son los siguientes:
                </p>
                <div style={{ marginLeft: "20px" }}>
                    <p>
                        - Acabado alisado en paredes y cielos más pintura
                        blanca;
                    </p>
                    <p>- Piso de madera de ingeniería en habitaciones;</p>
                    <p>
                        - Azulejo de porcelanato, colocados en área de piso,
                        paredes de duchas y respaldo de artefactos;
                    </p>
                    <p>- Mamparas de vidrio en duchas de baño, según diseño;</p>
                    <p>
                        - Puertas lisas enchapadas en madera con marcos
                        completos;
                    </p>
                    <p>
                        - Cerradura principal tipo manija satinadas y chapa
                        digital;
                    </p>
                    <p>- Cerraduras tipo manija satinadas;</p>
                    <p>
                        - Zócalo de PVC imitación madera de diez centímetros
                        (10cm.);
                    </p>
                    <p>
                        - Ventanería de aluminio línea europea con vidrio
                        laminado para aislamiento acústico, de ocho milímetros
                        (8mm);
                    </p>
                    <p>- Inodoros "one piece" doble descarga;</p>
                    <p>- Grifería cromada en duchas;</p>
                    <p>
                        - Lavamanos blanco con grifo cromado y gabinete de
                        melamina;
                    </p>
                    <p>
                        - Gabinetes de cocina en melamina con top de cuarzo,
                        según diseño;
                    </p>
                    <p>- Lavatrastos inoxidable con grifo cromado;</p>
                    <p>- Closets completos en melamina, según diseño;</p>
                    <p>
                        - Luminarias empotrables en cielo Led, según diseño
                        eléctrico;
                    </p>
                    <p>- Placas de interruptores y tomacorrientes blancas;</p>
                    <p>- Calentador de agua eléctrico;</p>
                    <p>
                        - Consultoría de interiorismo con el Arquitecto Feliz
                        Cardona, se incluye la pérgola en terraza, horno
                        microondas, cooktop y extractor de olores.
                    </p>
                </div>
                <p style={{ marginTop: "15px" }}>
                    Los adquirentes tendrán derecho a utilizar las áreas o
                    amenidades comunes y el título de acción le dará derecho a
                    El inmueble ofrecido en promesa de venta, soportará las
                    servidumbres que se detallan en el Régimen de Propiedad
                    Horizontal adscrito a cada unidad habitacional.
                </p>
                <p>
                    Manifestamos las partes que aceptamos que el área de los
                    bienes objeto de este contrato podrá variar en más o menos
                    hasta en un dos por ciento (2%).
                </p>
                <p>
                    Es convenido por las partes que la promesa de compraventa
                    constituye una obligación conjunta, toda vez que se trata de
                    un todo indivisible, para cuya realización de la compraventa
                    definitiva es requisito indispensable que se formalicen
                    simultáneamente los títulos de propiedad del inmueble y el
                    título de acción de El Bien Mueble (acción). LA PARTE
                    PROMITENTE COMPRADORA{" "}
                    {compradores.length > 1 ? "prometemos" : "prometo"} comprar
                    dichos bienes inmuebles y bien mueble (acción) en su
                    conjunto.
                </p>
            </div>

            <div id="clausula-tercera" className="section-spacing">
                <p>
                    <span className="clause-title">TERCERA:</span> La promesa de
                    compraventa que se otorga en este acto se sujetará a las
                    estipulaciones siguientes:{" "}
                    <span className="bold">I) PRECIO:</span> El precio total por
                    el cual se promete la compraventa de los bienes inmuebles
                    descritos en la cláusula segunda anterior es de{" "}
                    <span className="highlight-yellow">
                        {getVal<string>(
                            "Condiciones_Economicas.PrecioLetras",
                            "[PRECIO_LETRAS]",
                        )
                            .replace(/\s*(quetzales|dólares|dólar)\s*$/i, "")
                            .toUpperCase()}{" "}
                        DÓLARES DE LOS ESTADOS UNIDOS DE NORTE AMÉRICA (USD.
                        {getVal<number>(
                            "Condiciones_Economicas.PrecioNumeros",
                            0,
                        ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        )
                    </span>{" "}
                    el cual ya incluye el Impuesto al Valor Agregado
                    correspondientes.
                </p>
                <p>
                    <span className="bold">II) VARIACIÓN DEL PRECIO:</span> El
                    precio estipulado en el numeral romano uno (I) de esta
                    Cláusula, podrá variar por modificaciones al diseño o los
                    acabados solicitadas por la PARTE PROMITENTE COMPRADORA las
                    cuales deberán ser autorizadas previamente y por escrito por
                    la PARTE PROMITENTE VENDEDORA; lo cual deberá hacerse
                    constar en anexo al presente contrato.{" "}
                    <span className="bold">III) MONEDA DE PAGO:</span> Todos los
                    pagos a que se obliga la PARTE PROMITENTE COMPRADORA por
                    este contrato, deberán hacerse en Dólares de los Estados
                    Unidos de América.{" "}
                    <span className="bold">IV) FORMA DE PAGO:</span> La PARTE
                    PROMITENTE COMPRADORA pagará el precio total de la venta de
                    la siguiente forma:
                </p>
                <p>
                    a) Enganche:{" "}
                    <span className="highlight-yellow">
                        {getVal<string>(
                            "Condiciones_Economicas.ReservaLetras",
                            "[ENGANCHE_LETRAS]",
                        )
                            .replace(/\s*(quetzales|dólares|dólar)\s*$/i, "")
                            .toUpperCase()}{" "}
                        DÓLARES (USD.
                        {getVal<number>(
                            "Condiciones_Economicas.ReservaNumeros",
                            0,
                        ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        )
                    </span>
                    , que la PARTE PROMITENTE COMPRADORA pagará a LA PARTE
                    PROMITENTE VENDEDORA mediante{" "}
                    <span className="highlight-red">
                        {getVal(
                            "Condiciones_Economicas.CantidadPagosLetras",
                            "veinte",
                        )}
                    </span>{" "}
                    (
                    <span className="highlight-red">
                        {getVal(
                            "Condiciones_Economicas.CantidadPagosNumeros",
                            "20",
                        )}
                    </span>
                    ) pagos, de la siguiente forma:
                </p>
                <div style={{ marginLeft: "20px" }}>
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
                            const anioLetras = numberToWordsYear(f.getUTCFullYear()).toLowerCase();
                            const cuotaLetras = numberToWords(idx + 1).toLowerCase();
                            return (
                                <p
                                    key={idx}
                                    style={{ margin: "5px 0", textIndent: "0" }}
                                >
                                    El día{" "}
                                    <span className="highlight-red">
                                        {diaLetras} ({diaNum})
                                    </span>{" "}
                                    de{" "}
                                    <span className="highlight-red">
                                        {meses[f.getUTCMonth()]}
                                    </span>{" "}
                                    de{" "}
                                    <span className="highlight-red">
                                        {anioLetras}
                                    </span>
                                    {" "}se pagará la cuota número{" "}
                                    <span className="highlight-red">
                                        {cuotaLetras} ({idx + 1})
                                    </span>{" "}
                                    por la cantidad de{" "}
                                    <span className="highlight-red">
                                        {numberToWords(
                                            Math.floor(parseFloat(p.value)),
                                        ).toUpperCase()}{" "}
                                        DÓLARES (USD.
                                        {parseFloat(p.value).toLocaleString(
                                            "en-US",
                                            { minimumFractionDigits: 2 },
                                        )}
                                        )
                                    </span>
                                    ;
                                </p>
                            );
                        });
                    })()}
                </div>
                <p>
                    b) El saldo final es de{" "}
                    <span className="highlight-yellow">
                        {getSaldoFinal().letras.toUpperCase()} DÓLARES (USD.
                        {getSaldoFinal().numeros})
                    </span>{" "}
                    será pagado el día de la firma de la escritura pública de
                    compraventa definitiva.
                </p>
                <p>
                    <span className="bold">V) PLAZO:</span> El plazo será de{" "}
                    <span className="highlight-yellow">
                        {getPlazoMeses().letras} ({getPlazoMeses().numeros})
                    </span>{" "}
                    meses, es decir, el día{" "}
                    <span className="highlight-yellow">
                        {getMesEntrega()}
                    </span>
                    .
                </p>
            </div>

            <div id="clausula-cuarta" className="section-spacing">
                <p>
                    <span className="clause-title">
                        CUARTA: TERMINACIÓN ANTICIPADA.
                    </span>{" "}
                    Sin perjuicio de otros derechos que correspondan a LA PARTE
                    PROMITENTE VENDEDORA, de conformidad con lo establecido en
                    este documento y en la ley, LA PARTE PROMITENTE VENDEDORA
                    podrá resolver en cualquier momento el presente contrato,
                    sin necesidad de declaración judicial, si LA PARTE
                    PROMITENTE COMPRADORA no cumple con una sola de sus
                    obligaciones de pago de las cuotas o de cualquier obligación
                    derivada del presente contrato, el mismo contrato quedará
                    resuelto de pleno derecho; dicho incumplimiento constituirá
                    una condición resolutoria expresa de conformidad con el
                    artículo mil quinientos ochenta y uno (1,581) del Código
                    Civil.
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
                    Código Civil vigente. Si LA PARTE PROMITENTE VENDEDORA
                    decide resolver el presente contrato sin justificar causa
                    alguna, deberá devolver a LA PARTE PROMITENTE COMPRADORA los
                    montos recibidos sumado a un interés anual del tres por
                    ciento (3%) calculado desde la fecha en que recibió cada
                    pago.
                </p>
            </div>

            <div id="clausula-sexta" className="section-spacing">
                <p>
                    <span className="clause-title">
                        SEXTA: CLÁUSULA INDEMNIZATORIA DE LA PARTE PROMITENTE
                        COMPRADORA.
                    </span>{" "}
                    En caso de incumplimiento por parte de LA PARTE PROMITENTE
                    COMPRADORA de cualquiera de las obligaciones que por este
                    acto contrae o por desistimiento de la negociación, dará
                    derecho A LA PARTE PROMITENTE VENDEDORA a:{" "}
                    <span className="bold">1)</span> dar por concluida la
                    negociación y <span className="bold">2)</span> cobrar por
                    concepto de daños y perjuicios una indemnización, la cual se
                    fija de la siguiente forma:
                </p>
                <p>
                    <span className="bold">a)</span> Por desistimiento antes de
                    haber ingresado expediente de crédito para su análisis al
                    banco o FHA por parte de LA PARTE PROMITENTE COMPRADORA, se
                    penalizará con la cantidad de{" "}
                    <span className="bold">
                        DIEZ MIL DOLARES DE LOS ESTADOS UNIDOS DE NORTE AMERICA
                        (USD. 10,000.00)
                    </span>
                    .
                </p>
                <p>
                    <span className="bold">b)</span> Por desistimiento después
                    de haber ingresado expediente de crédito para su análisis al
                    banco o FHA por parte de LA PARTE PROMITENTE COMPRADORA, se
                    penalizará de la siguiente forma: Por desistimiento después
                    de haber firmado la promesa de compraventa de bienes
                    inmuebles y muebles acción, se penalizará con un{" "}
                    <span className="bold">cinco por ciento (5%)</span>, del
                    valor de lo prometido en compraventa.
                </p>
                <p>
                    <span className="bold">c)</span> El{" "}
                    <span className="bold">cinco por ciento (5%)</span> del
                    valor total de la compraventa pactada en la promesa de
                    compraventa de bienes inmuebles y mueble (acción) más un fee
                    de{" "}
                    <span className="bold">
                        CINCO MIL DOLARES DE LOS ESTADOS UNIDOS DE NORTE AMERICA
                        (USD.5,000.00)
                    </span>
                    , por desistir de la compra después de haber pedido cambios
                    y mejoras en el inmueble y estos se hubieran ya realizado,
                    siendo No reintegrable el monto pagado por las mejoras ya
                    realizadas.
                </p>
                <p>
                    El desistimiento por cualquier otra razón no contemplada en
                    los presentes incisos será revisado directamente por el
                    Consejo Administrativo de la entidad vendedora, quien
                    asignará la penalización en relación a la causa del
                    desistimiento, acordando desde ya que en ningún caso podrá
                    ser menor de{" "}
                    <span className="bold">
                        CUATRO MIL DOLARES DE LOS ESTADOS UNIDOS DE NORTE
                        AMERICA (USD.4,000.00)
                    </span>
                    .
                </p>
                <p>
                    En todos los casos anteriores, la penalización se descontará
                    directamente del monto del enganche o reserva que el cliente
                    hubiera cancelado a la fecha del desistimiento, acordando
                    las partes que el plazo para el reintegro del saldo a favor
                    DE LA PARTE PROMITENTE COMPRADORA, deberá realizarse en un
                    plazo no mayor a seis (6) meses, a partir de la fecha del
                    desistimiento o aplicación de la penalización.
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
                    VENDEDORA. LA PARTE PROMITENTE VENDEDORA, por su parte,
                    queda en libertad de negociar, ceder, o enajenar los
                    derechos y obligaciones que adquiere en este contrato,
                    parcial o totalmente, dando posterior aviso a{" "}
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
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: "9pt",
                                marginTop: "5px",
                            }}
                        >
                            POR LA PARTE VENDEDORA
                        </p>
                    </div>
                    {compradores.map((c, idx) => (
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
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "9pt",
                                    marginTop: "5px",
                                }}
                            >
                                POR LA PARTE COMPRADORA
                                <br />
                                {c.Nombre}
                            </p>
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
                            {c.DPI_Letras} ({c.DPI})
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
