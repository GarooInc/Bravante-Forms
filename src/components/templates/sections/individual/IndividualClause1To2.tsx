import React from "react";
import type { TemplateProps, Comprador, Estacionamiento, Bodega } from "../../types";
import { numberToWords, idToWords } from "../../utils";
import { ProjectFinishes } from "../shared/ProjectFinishes";

interface IndividualClause1To2Props extends TemplateProps {
    compradores: Comprador[];
    getParqueosDescripcion: () => string;
}

export const IndividualClause1To2: React.FC<IndividualClause1To2Props> = ({
    getVal,
    compradores,
    getComprador,
    getParqueosDescripcion,
}) => {
    return (
        <>
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
                    {(() => {
                        let li = 2;
                        const L = (n: number) => String.fromCharCode(97 + n);

                        const isMissing = (v: unknown) => !v || String(v) === "[DATO_FALTANTE]";

                        const bodegasRaw = getVal<string>("Descripcion_del_Inmueble.BodegasDescripcion");
                        const balconRaw = getVal<number>("Descripcion_del_Inmueble.BalconAreaNumeros");
                        const terrazaRaw = getVal<number>("Descripcion_del_Inmueble.TerrazaAreaNumeros");

                        const bodegas = isMissing(bodegasRaw) ? null : bodegasRaw;
                        const balcon = isMissing(balconRaw) ? null : balconRaw;
                        const terraza = isMissing(terrazaRaw) ? null : terrazaRaw;

                        const bodegasL = bodegas ? L(li++) : null;
                        const balconL = balcon ? L(li++) : null;
                        const terrazaL = terraza ? L(li++) : null;
                        const bienMuebleL = L(li);

                        const lastConditional = terrazaL ? "terraza" : balconL ? "balcon" : bodegasL ? "bodegas" : null;

                        return (
                            <>
                                {bodegas && bodegasL && (
                                    <>
                                        <span className="bold">{bodegasL})</span>{" "}
                                        <span className="highlight-red">{bodegas}</span>
                                        {lastConditional === "bodegas" ? ", y " : ", "}
                                    </>
                                )}
                                {balcon && balconL && (
                                    <>
                                        <span className="bold">{balconL})</span> Un balcón, con un área aproximada de{" "}
                                        <span className="highlight-red">
                                            {idToWords(balcon.toString())} METROS CUADRADOS
                                        </span>{" "}
                                        (<span className="highlight-red">{balcon}</span> m2)
                                        {lastConditional === "balcon" ? ", y " : "; "}
                                    </>
                                )}
                                {terraza && terrazaL && (
                                    <>
                                        <span className="bold">{terrazaL})</span> Una terraza de aproximadamente{" "}
                                        <span className="highlight-red">
                                            {idToWords(terraza.toString())} METROS CUADRADOS
                                        </span>{" "}
                                        (<span className="highlight-red">{terraza}</span> m2), y{" "}
                                    </>
                                )}
                                <span className="bold">{bienMuebleL})</span> El bien mueble (acción) de la entidad relacionada y pertinente al proyecto.
                            </>
                        );
                    })()}
                </p>
                
                <ProjectFinishes />

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
        </>
    );
};
