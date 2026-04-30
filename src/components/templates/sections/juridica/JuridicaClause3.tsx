import React from "react";
import type { TemplateProps, Pago } from "../../types";
import { numberToWords, numberToWordsYear } from "../../utils";

interface JuridicaClause3Props extends TemplateProps {
    getSaldoFinal: () => { letras: string; numeros: string };
    getPlazoMeses: () => { letras: string; numeros: string };
    getMesEntrega: () => string;
}

export const JuridicaClause3: React.FC<JuridicaClause3Props> = ({
    getVal,
    getSaldoFinal,
    getPlazoMeses,
    getMesEntrega,
}) => {
    return (
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
                respective construcción o se aumenten los existentes, acepto
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
                PROMITENTE COMPRADORA pagará el valor de los bienes
                prometidos en venta de la siguiente forma:
            </p>
            <p>
                {(() => {
                    const pagos = getVal<Pago[]>("Pagos", []);
                    const engancheTotal = getVal<number>("Condiciones_Economicas.ReservaNumeros", 0);
                    const primerPagoMonto = pagos.length > 0 ? parseFloat(pagos[0].value || "0") : 0;
                    const segundoPagoMonto = engancheTotal - primerPagoMonto;
                    const cantPagosRestantes = pagos.length > 1 ? pagos.length - 1 : 0;

                    return (
                        <>
                            <span className="bold">a)</span> Un primer pago por la cantidad de{" "}
                            <span className="bold highlight-yellow">
                                {numberToWords(Math.floor(primerPagoMonto)).toUpperCase()}{" "}
                                DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA (USD.
                                {primerPagoMonto.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                )
                            </span>{" "}
                            en concepto de reserva, que Yo, la parte Promitente
                            Vendedora manifiesto que tengo recibido a mi entera
                            satisfacción.
                            <br /><br />
                            <span className="bold">b)</span> Un segundo pago por la cantidad total de{" "}
                            <span className="bold highlight-yellow">
                                {numberToWords(Math.floor(segundoPagoMonto)).toUpperCase()}{" "}
                                DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA (USD.
                                {segundoPagoMonto.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                )
                            </span>
                            , que la parte Promitente Compradora entregará mediante{" "}
                            <span className="highlight-red">
                                {numberToWords(cantPagosRestantes).toLowerCase()} ({cantPagosRestantes})
                            </span>{" "}
                            pagos a la Promitente Vendedora, de la siguiente forma:
                        </>
                    );
                })()}
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
                        return pagos.slice(1).map((p, idx) => {
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
                                    El día {diaLetras} ({diaNum}) de {mesNombre} de {anioLetras} ({f.getUTCFullYear()}), la cantidad de{" "}
                                    <span className="bold highlight-yellow">
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
                PROMITENTE COMPRADORA efectuará los pagos en las
                oficinas de LA PARTE PROMITENTE VENDEDORA, ubicadas en
                Boulevard Rafael Landívar, 10-05, zona 16, Paseo Cayalá,
                Edificio D-1, 2do. Nivel, Guatemala, Guatemala, las cuales
                son del conocimiento de la Parte Promitente Compradora, sin
                necesidad de cobro o requerimiento alguno, o de cualquier
                forma o en cualquier otra dirección que me comunique en su
                momento y por escrito la PROMITENTE VENDEDORA, o por medio
                de transferencia bancaria, a la cuenta de la PROMITENTE
                VENDEDORA. Los pagos los deberá efectuar la parte promitente
                compradora en días y horas hábiles. En el caso que el día de
                pago fuere un día inhábil, el pago lo efectuará la parte
                promitente compradora el día hábil siguiente.{" "}
                <span className="bold">VI) MORA.</span> Si existe atraso en
                efectuar cualquiera de los pagos antes indicados en la forma
                y plazo aquí acordados, LA PARTE PROMITENTE COMPRADORA
                reconoce y se obliga a pagar a la PARTE PROMITENTE
                VENDEDORA un interés del TRES por ciento (3%) mensual sobre
                el saldo vencido calculado a partir del día siguiente en que
                debió efectuarse el pago hasta la fecha en que efectivamente
                se realice el pago adeudado. Asimismo, por cada cheque
                rechazado la PARTE PROMITENTE COMPRADORA se obliga a
                cancelar la cantidad de QUINIENTOS QUETZALES EXACTOS (Q.
                500.00) en concepto de gastos administrativos generados por
                tal hecho.{" "}
                <span className="bold">VII) DE LOS GRAVÁMENES.</span> LA
                PARTE PROMITENTE VENDEDORA traspasará los bienes libres de
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
                manera, LA PARTE PROMITENTE COMPRADORA se obliga desde ya a
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
                PROMITENTE COMPRADORA renuncia expresamente a su derecho de
                elección del notario autorizante de la escritura de
                compraventa definitiva y/o de cualquier otro documento o
                escritura pública relacionada directa o indirectamente con el
                presente contrato, y acepta al notario designado por la
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
                La PARTE PROMITENTE COMPRADORA tendrá por recibido a su
                entera satisfacción los bienes a partir de ese momento. La
                PARTE PROMITENTE COMPRADORA será la única y exclusiva
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
                sus obligaciones y con efectuar los pagos en las fechas
                indicadas. El plazo puede ser prorrogable por mutuo acuerdo
                de las partes. Asimismo, pactamos las partes que en caso de
                imposibilidad al desarrollo del presente proyecto en virtud
                de retraso excesivo de las autorizaciones gubernamentales
                respectivas, LA PARTE PROMITENTE VENDEDORA, deberá
                notificar tal acontecimiento a la PARTE PROMITENTE
                COMPRADORA y deberá devolver el cien por ciento (100%) del
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
                LA PARTE PROMITENTE COMPRADORA declara estar enterada y
                desde ya acepta que los bienes que por este acto promete
                comprar serán destinados únicamente para vivienda familiar,
                asimismo, que dichos bienes estarán sometidos a Régimen de
                Propiedad Horizontal, y por lo tanto, acepta desde ya
                cumplir con el mismo y con los reglamentos y demás normas
                legales del mismo, así como, con los reglamentos y normas
                del "CONDOMINIO BRAVANTE", dado que los inmuebles prometidos
                en venta se encuentran dentro del perímetro del mismo; y en
                especial, con las obligaciones de pagos de cuotas de
                mantenimientos y condiciones para la reventa o alquiler de
                los inmuebles, los cuales son de su conocimiento.{" "}
                <span className="bold">
                    XIII) PLANOS Y CAMBIOS EN LA CONSTRUCCIÓN:
                </span>{" "}
                LA PARTE PROMITENTE COMPRADORA declara expresamente que
                conoce y acepta los planos de distribución interna de
                ambientes así como acabados, distribución, diseño y no podrá
                solicitar que se hagan modificaciones o adiciones a los
                planos y especificaciones antes mencionados, salvo que éstas
                fueran aprobadas previamente por LA PARTE PROMITENTE
                VENDEDORA y que el valor de las modificaciones o adiciones,
                sea pagado en su totalidad por LA PARTE PROMITENTE
                COMPRADORA, antes de que se lleven a cabo las mismas. Así
                mismo LA PROMITENTE VENDEDORA, se reserva el derecho de
                realizar nuevos cambios en las especificaciones contenidas
                en este contrato si así conviene a la arquitectura,
                estructura y funcionamiento del proyecto, o si fuera
                necesario porque algún elemento o material no puede
                obtenerse en cantidad suficiente dentro del periodo de
                construcción, o que dicho cambio sea requerido por alguna
                autoridad estatal, municipal o administrativa.{" "}
                <span className="bold">XIV) DE LA ACCIÓN.</span> LA PARTE
                PROMITENTE COMPRADORA declara estar de acuerdo que el bien
                mueble (acción) que por el presente acto se le promete
                vender, que sea de una entidad de carácter mercantil y/o
                civil indistintamente, o bien, la misma se relacione tanto a
                la administración del proyecto antes relacionado o a las
                áreas comunes indistintamente; todo lo anterior a elección y
                según disposición de la PARTE PROMITENTE VENDEDORA.
            </p>
        </div>
    );
};
