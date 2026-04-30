import React from "react";
import type { Comprador } from "../../types";

interface IndividualGeneralClausesProps {
    compradores: Comprador[];
    getDireccionComprador: () => string;
}

export const IndividualGeneralClauses: React.FC<IndividualGeneralClausesProps> = ({
    compradores,
    getDireccionComprador,
}) => {
    return (
        <>
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
                    indemnizatoria and/o legal alguna sujetándome al procedimiento
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
                    PROMITENTE VENDEDORA and efectivamente disponible, a partir de
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
        </>
    );
};
