import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { IndividualTemplate } from "./templates/IndividualTemplate";
import { JuridicaTemplate } from "./templates/JuridicaTemplate";
import { numberToWords, numberToWordsYear } from "./templates/utils";
import type {
    Comprador,
    WebhookData,
    Estacionamiento,
} from "./templates/types";

interface DocumentoPromesaProps {
    showWebhookDataProp?: boolean;
    setShowWebhookDataProp?: (show: boolean) => void;
    hideControlBar?: boolean;
    viewModeProp?: "html" | "markdown";
    setViewModeProp?: (mode: "html" | "markdown") => void;
}

const DocumentoPromesa: React.FC<DocumentoPromesaProps> = ({
    showWebhookDataProp,
    setShowWebhookDataProp,
    hideControlBar = false,
}) => {
    const { id } = useParams();
    const [data, setData] = useState<WebhookData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fallback internal state
    const [internalShowWebhookData, setInternalShowWebhookData] =
        useState<boolean>(false);

    // Final state selection
    const showWebhookData = showWebhookDataProp ?? internalShowWebhookData;
    const setShowWebhookData =
        setShowWebhookDataProp ?? setInternalShowWebhookData;

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`${import.meta.env.VITE_API_URL}/promesa-document`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`,
                        );
                    }
                    const text = await response.text();
                    if (!text || text.trim() === "") {
                        throw new Error("Respuesta vacía del servidor");
                    }
                    try {
                        return JSON.parse(text);
                    } catch {
                        throw new Error("Respuesta inválida del servidor");
                    }
                })
                .then((jsonData: unknown) => {
                    let payload: WebhookData | null = null;
                    if (jsonData && typeof jsonData === "object") {
                        const root = (
                            Array.isArray(jsonData)
                                ? jsonData[0] || {}
                                : jsonData
                        ) as any;
                        let dt: any = null;
                        let rawPagos: any = null;

                        if (root.data && !Array.isArray(root.data)) {
                            dt = root.data;
                            rawPagos = dt.Pagos;
                        } else if (Array.isArray(root.data) && root.data[0]) {
                            const dataArray = root.data;
                            const container = dataArray[0]
                                ? (dataArray[0] as any).document_promesa_firma
                                : null;
                            dt = container
                                ? container.data
                                : dataArray[0] || null;
                            rawPagos = container
                                ? container.Pagos
                                : dt
                                  ? dt.Pagos
                                  : null;
                        } else if (root.Compradores || root.Inmueble) {
                            dt = root;
                            rawPagos = dt.Pagos;
                        }

                        if (dt) {
                            const first = (item: any) =>
                                (Array.isArray(item) ? item[0] : item) || {};
                            const inmueble = first(
                                dt.Inmueble || dt.Descripcion_del_Inmueble,
                            );
                            const precio = first(
                                dt.Precio || dt.Condiciones_Economicas,
                            );
                            const datosJur = first(dt.Datos_Juridicos);
                            const proj = first(dt.proyecto);

                            const stripCurrency = (str?: string) =>
                                str
                                    ? str
                                          .replace(
                                              /\s*(D[OÓ]LARES?|QUETZALES?)\s.*/i,
                                              "",
                                          )
                                          .trim()
                                    : "";

                            const mesStr = dt.FechaDocumento
                                ? (dt.FechaDocumento as string).split("-")[1]
                                : "01";
                            const mesesNombres = [
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
                            const mesNombre =
                                mesesNombres[parseInt(mesStr) - 1] || "enero";

                            const mappedCompradores = (
                                dt.Compradores || []
                            ).map((c: any) => ({
                                ...c,
                                Direccion: c.Domicilio || c.Direccion,
                                Domicilio: c.Domicilio || c.Direccion,
                            }));

                            const totalPagosNum = (
                                rawPagos ||
                                dt.Pagos ||
                                []
                            ).reduce((sum: number, p: any) => {
                                const v = parseFloat(p.value || p.Monto || 0);
                                return sum + (isNaN(v) ? 0 : v);
                            }, 0);

                            const plazoMesesNum: number =
                                precio.PlazoEngancheMeses ||
                                dt.cuotas ||
                                dt.PlazoEngancheMeses ||
                                0;
                            const plazoMesesLetras: string =
                                plazoMesesNum > 0
                                    ? numberToWords(plazoMesesNum).toLowerCase()
                                    : "";

                            let mesEntregaStr = "";
                            let diaEntregaNum = 0;
                            let diaEntregaLetras = "";
                            const fechaEnt =
                                precio.FechaEntrega ||
                                dt.fecha_entrega ||
                                dt.FechaEntrega;
                            if (fechaEnt && fechaEnt.includes("-")) {
                                const mesesNombresEnt = [
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
                                const partes = fechaEnt.split("-");
                                const mesIdx = parseInt(partes[1]) - 1;
                                mesEntregaStr = mesesNombresEnt[mesIdx] || "";
                                diaEntregaNum = partes[2] ? parseInt(partes[2]) : 0;
                                diaEntregaLetras = diaEntregaNum > 0 ? numberToWords(diaEntregaNum).toLowerCase() : "";
                            }

                            const isJuridica = dt.TipoPersona === "juridica";
                            const firstComp = mappedCompradores[0] || {};

                            payload = {
                                TipoPersona:
                                    dt.TipoPersona ||
                                    (dt.nombre_entidad || datosJur.EmpresaNombre
                                        ? "juridica"
                                        : "individual"),
                                Compradores: mappedCompradores,
                                Datos_Juridicos: {
                                    ...datosJur,
                                    EmpresaNombre:
                                        datosJur.EmpresaNombre ||
                                        dt.nombre_entidad ||
                                        dt.EmpresaNombre,
                                    RepresentanteNombre:
                                        datosJur.RepresentanteNombre ||
                                        dt.representante_legal ||
                                        dt.RepresentanteNombre,
                                    RepresentanteCargo:
                                        datosJur.RepresentanteCargo ||
                                        datosJur.cargo ||
                                        dt.RepresentanteCargo ||
                                        dt.RepresentanteLegal?.Cargo ||
                                        dt.representante_cargo ||
                                        datosJur.Cargo ||
                                        dt.Cargo ||
                                        datosJur.Puesto ||
                                        dt.Puesto,
                                    RepresentanteEdadLetras:
                                        datosJur.RepresentanteEdadLetras ||
                                        datosJur.RepresentanteEdad_Letras ||
                                        dt.RepresentanteEdad_Letras ||
                                        (isJuridica
                                            ? firstComp.Edad_Letras ||
                                              firstComp.Edad_LeTras
                                            : ""),
                                    RepresentanteEstadoCivil:
                                        datosJur.RepresentanteEstadoCivil ||
                                        (isJuridica
                                            ? firstComp.EstadoCivil
                                            : ""),
                                    RepresentanteProfesion:
                                        datosJur.RepresentanteProfesion ||
                                        (isJuridica ? firstComp.Profesion : ""),
                                    RepresentanteNacionalidad:
                                        datosJur.RepresentanteNacionalidad ||
                                        (isJuridica
                                            ? firstComp.Nacionalidad
                                            : ""),
                                    RepresentanteDPI_Letras:
                                        datosJur.RepresentanteDPI_Letras ||
                                        datosJur.RepresentanteDPILetras ||
                                        dt.RepresentanteDPI_Letras ||
                                        (isJuridica
                                            ? firstComp.DPI_Letras
                                            : ""),
                                    RepresentanteDPI:
                                        datosJur.RepresentanteDPI ||
                                        dt.NIT_representante_legal ||
                                        dt.RepresentanteDPI ||
                                        (isJuridica ? firstComp.DPI : ""),
                                    ActaNotarialFecha:
                                        datosJur.ActaNotarialFecha ||
                                        datosJur.FechaActa ||
                                        datosJur.ActaFecha ||
                                        dt.ActaNotarialFecha,
                                    ActaFechaDia: (
                                        datosJur.ActaNotarialFecha ||
                                        dt.ActaNotarialFecha ||
                                        ""
                                    )?.split("-")?.[2],
                                    ActaFechaMes:
                                        mesesNombres[
                                            parseInt(
                                                (
                                                    datosJur.ActaNotarialFecha ||
                                                    dt.ActaNotarialFecha ||
                                                    ""
                                                )?.split("-")?.[1],
                                            ) - 1
                                        ],
                                    ActaFechaAnio: (
                                        datosJur.ActaNotarialFecha ||
                                        dt.ActaNotarialFecha ||
                                        ""
                                    )?.split("-")?.[0],
                                    NotarioNombre:
                                        datosJur.NotarioNombre ||
                                        datosJur.NombreNotario ||
                                        datosJur.Notario ||
                                        dt.NotarioNombre ||
                                        dt.nombre_notario,
                                    InscritoNumero:
                                        datosJur.InscritoNumero ||
                                        datosJur.RegistroNumero ||
                                        dt.RegistroNumero,
                                    InscritoFolio:
                                        datosJur.InscritoFolio ||
                                        datosJur.RegistroFolio ||
                                        dt.RegistroFolio,
                                    InscritoLibro:
                                        datosJur.InscritoLibro ||
                                        datosJur.RegistroLibro ||
                                        dt.RegistroLibro,
                                },
                                Descripcion_del_Inmueble: {
                                    Apartamento:
                                        inmueble.Apartamento ||
                                        dt.Apartamento ||
                                        dt.id_inmueble
                                            ?.split(" ")[0]
                                            ?.replace("Apt", ""),
                                    Torre:
                                        inmueble.Torre || dt.Torre || "ETEREA",
                                    Nivel: (() => {
                                        const raw =
                                            inmueble.Nivel ??
                                            inmueble.Nivel_Numeros ??
                                            dt.Nivel ??
                                            dt.Nivel_Numeros;
                                        if (raw === undefined || raw === null) return undefined;
                                        const str = raw.toString();
                                        if (str === "") return undefined;
                                        const num = parseInt(str);
                                        if (!isNaN(num) && num <= 0)
                                            return `S${Math.abs(num) || 1}`;
                                        return str;
                                    })(),
                                    Nivel_Letras:
                                        inmueble.Nivel_Letras ||
                                        dt.Nivel_Letras,
                                    Habitaciones: (
                                        inmueble.Habitaciones ||
                                        inmueble.NoDormitorios ||
                                        dt.Habitaciones ||
                                        dt.NoDormitorios
                                    )?.toString(),
                                    Habitaciones_Letras:
                                        inmueble.Habitaciones_Letras ||
                                        dt.Habitaciones_Letras,
                                    DescripcionApartamento:
                                        (inmueble.Apartamento?.includes(
                                            " / ",
                                        )
                                            ? inmueble.Apartamento.split(
                                                  " / ",
                                              )
                                                  .slice(1)
                                                  .join(" / ")
                                            : undefined) ||
                                        inmueble.DescripcionApartamento ||
                                        dt.nombre_modelo ||
                                        dt.NombreModelo ||
                                        dt.modelo ||
                                        dt.Modelo,
                                    NumeroBR:
                                        dt.NumeroBR ||
                                        inmueble.NumeroBR ||
                                        dt.numeroBR,
                                    AreaConstruccionLetras:
                                        inmueble.AreaConstruccionLetras ||
                                        dt.AreaConstruccionLetras,
                                    AreaConstruccionNumeros:
                                        inmueble.AreaConstruccionM2 ||
                                        inmueble.AreaConstruccionNumeros ||
                                        dt.AreaConstruccionM2,
                                    ParqueosAreaLetras:
                                        inmueble.ParqueosAreaLetras ||
                                        dt.ParqueosAreaLetras,
                                    ParqueosAreaNumeros:
                                        inmueble.ParqueosAreaM2 ||
                                        inmueble.ParqueosAreaNumeros ||
                                        dt.ParqueosAreaM2,
                                    TerrazaAreaLetras:
                                        (inmueble.TerrazaAreaM2 ||
                                            dt.TerrazaAreaM2 ||
                                            0) > 0
                                            ? inmueble.TerrazaAreaLetras ||
                                              dt.TerrazaAreaLetras
                                            : undefined,
                                    TerrazaAreaNumeros:
                                        inmueble.TerrazaAreaM2 ||
                                        dt.TerrazaAreaM2,
                                    BalconAreaLetras:
                                        (inmueble.BalconAreaM2 ||
                                            dt.balcon_mts_cuadrados ||
                                            0) > 0
                                            ? inmueble.BalconAreaLetras ||
                                              dt.BalconAreaLetras
                                            : undefined,
                                    BalconAreaNumeros:
                                        inmueble.BalconAreaM2 ||
                                        dt.balcon_mts_cuadrados,
                                    TerrazaBalconAreaLetras:
                                        (inmueble.TerrazaAreaM2 ||
                                            dt.TerrazaAreaM2 ||
                                            0) > 0
                                            ? inmueble.TerrazaAreaLetras ||
                                              dt.TerrazaAreaLetras
                                            : inmueble.BalconAreaLetras ||
                                              dt.BalconAreaLetras,
                                    TerrazaBalconAreaNumeros:
                                        (inmueble.TerrazaAreaM2 ||
                                            dt.TerrazaAreaM2 ||
                                            0) > 0
                                            ? inmueble.TerrazaAreaM2 ||
                                              dt.TerrazaAreaM2
                                            : inmueble.BalconAreaM2 ||
                                              dt.balcon_mts_cuadrados,
                                    Estacionamientos: (
                                        inmueble.Estacionamientos ||
                                        dt.Estacionamientos ||
                                        []
                                    ).map((e: any) => ({
                                        Numero: e.Numero,
                                        Numero_Letras: e.Numero_Letras,
                                        Sotano: e.Sotano || "1",
                                        Sotano_Letras: e.Sotano_Letras || "UNO",
                                        Tipo: e.Tipo,
                                    })),
                                    Bodegas: (
                                        inmueble.Bodegas ||
                                        dt.Bodegas ||
                                        []
                                    ).map((b: any) => ({
                                        Numero: b.Numero,
                                        Numero_Letras: b.Numero_Letras,
                                        Sotano: b.Sotano || "1",
                                        Sotano_Letras: b.Sotano_Letras || "UNO",
                                    })),
                                },
                                Condiciones_Economicas: {
                                    PrecioLetras: stripCurrency(
                                        precio.PrecioLetras || dt.PrecioLetras,
                                    ),
                                    PrecioNumeros:
                                        precio.PrecioFinal ||
                                        dt.PrecioFinal ||
                                        dt.precio_total,
                                    ReservaLetras: stripCurrency(
                                        precio.ReservaLetras ||
                                            dt.ReservaLetras,
                                    ),
                                    ReservaNumeros:
                                        precio.EngancheMonto ||
                                        dt.EngancheMonto ||
                                        dt.enganche,
                                    SegundoPagoLetras: numberToWords(
                                        Math.round(totalPagosNum),
                                    ),
                                    SegundoPagoNumeros: totalPagosNum,
                                    CantidadPagosLetras: plazoMesesLetras,
                                    CantidadPagosNumeros: plazoMesesNum,
                                    TercerPagoLetras: stripCurrency(
                                        precio.SaldoFinanciarLetras ||
                                            dt.SaldoFinanciarLetras,
                                    ),
                                    TercerPagoNumeros:
                                        precio.SaldoFinanciar ||
                                        dt.SaldoFinanciar,
                                    SaldoFinanciar:
                                        precio.SaldoFinanciar ||
                                        dt.SaldoFinanciar,
                                },
                                Pagos: rawPagos || dt.Pagos,
                                Liquidacion_Final_y_Plazos: {
                                    PlazoMesesLetras: plazoMesesLetras,
                                    PlazoMesesNumeros: plazoMesesNum,
                                    MesEntrega: mesEntregaStr,
                                    AnioEntrega: fechaEnt
                                        ? parseInt(fechaEnt.split("-")[0])
                                        : 0,
                                    DiaEntrega: diaEntregaNum,
                                    DiaEntregaLetras: diaEntregaLetras,
                                    UltimoPagoLetras: stripCurrency(
                                        precio.SaldoFinanciarLetras ||
                                            dt.SaldoFinanciarLetras,
                                    ),
                                    UltimoPagoNumeros:
                                        precio.SaldoFinanciar ||
                                        dt.SaldoFinanciar,
                                },
                                FechaDocumento: dt.FechaDocumento,
                                Datos_de_Notificacion_y_Cierre:
                                    dt.FechaDocumento
                                        ? {
                                              Direccion:
                                                  mappedCompradores &&
                                                  mappedCompradores.length > 0
                                                      ? mappedCompradores[0]
                                                            .Domicilio_Letras ||
                                                        mappedCompradores[0]
                                                            .Domicilio ||
                                                        ""
                                                      : "",
                                              FechaFirmaDia: parseInt(
                                                  dt.FechaDocumento.split(
                                                      "-",
                                                  )[2],
                                              ),
                                              FechaFirmaMes: mesNombre,
                                              FechaFirmaAnio: parseInt(
                                                  dt.FechaDocumento.split(
                                                      "-",
                                                  )[0],
                                              ),
                                              FechaLegalizacionDia: parseInt(
                                                  dt.FechaDocumento.split(
                                                      "-",
                                                  )[2],
                                              ),
                                              FechaLegalizacionMes: mesNombre,
                                              FechaLegalizacionAnio: parseInt(
                                                  dt.FechaDocumento.split(
                                                      "-",
                                                  )[0],
                                              ),
                                          }
                                        : undefined,
                                proyecto:
                                    proj && Object.keys(proj).length > 5
                                        ? proj
                                        : {
                                              total_unidades: "noventa y cinco",
                                              total_unidades_numeros: "95",
                                              unidades_torre1:
                                                  "cuarenta y siete",
                                              unidades_torre1_numeros: "47",
                                              unidades_torre2:
                                                  "cuarenta y ocho",
                                              unidades_torre2_numeros: "48",
                                              variacion_unidades: "diez",
                                              numero_elevadores: "cuatro",
                                              elevadores_por_torre: "dos",
                                              fuente_agua:
                                                  "pozo externo el Edificio",
                                              entidad_agua:
                                                  "SERVIBOSQUES, SOCIEDAD ANÓNIMA",
                                              tipo_cisterna:
                                                  "cisterna de concreto",
                                              agua_potable: "no será potable",
                                              tratamiento_agua:
                                                  "potabilizar el agua",
                                              entidad_electrica:
                                                  "Empresa Eléctrica de Guatemala, Sociedad Anónima",
                                              planta_emergencia:
                                                  "una planta eléctrica de emergencia",
                                              sistema_security:
                                                  "gabinetes con extintores de incendios",
                                              sistema_acceso:
                                                  "Sistema de control de acceso",
                                              sistema_vigilancia:
                                                  "Circuito cerrado",
                                              sistema_drenaje:
                                                  "Sistema de drenajes pluviales y aguas negras",
                                              planta_tratamiento:
                                                  "planta de tratamiento de aguas residuales de uso ordinario",
                                              nombre_torre1: "IGNEA",
                                              nombre_torre2: "ETEREA",
                                          },
                            } as unknown as WebhookData;
                        }
                    }

                    if (payload) {
                        setData(payload);
                    }
                })
                .catch((error) =>
                    console.error("Error fetching document data:", error),
                )
                .finally(() => setLoading(false));
        }
    }, [id]);

    const getVal = <T,>(
        path: string,
        fallback: T = "[DATO_FALTANTE]" as unknown as T,
    ): T => {
        if (!data) return fallback;
        const keys = path.split(".");
        let current: any = data;
        for (const key of keys) {
            if (current && typeof current === "object" && key in current) {
                current = (current as Record<string, unknown>)[key];
            } else {
                return fallback;
            }
        }
        return (current as T) ?? fallback;
    };

    const getComprador = (
        index: number,
        field: keyof Comprador,
        fallback: string = `[COMPRADOR_${index + 1}_${field.toString().toUpperCase()}]`,
    ) => {
        const compradores = getVal<Comprador[]>("Compradores", []);
        if (compradores[index] && compradores[index][field]) {
            return compradores[index][field] as string;
        }
        return fallback;
    };

    const getDireccionComprador = () => {
        if (getVal<string>("TipoPersona", "") === "juridica") {
            return (
                getVal<string>("DatosFiscales.Direccion", "") ||
                getVal<string>("Datos_Juridicos.DireccionFiscal", "") ||
                getVal<string>(
                    "Datos_de_Notificacion_y_Cierre.Direccion",
                    "15 Calle 2-00 Zona 10, Ciudad de Guatemala",
                )
            );
        }
        return getVal<string>(
            "Datos_de_Notificacion_y_Cierre.Direccion",
            "15 Calle 2-00 Zona 10, Ciudad de Guatemala",
        );
    };

    const getParqueosDescripcion = () => {
        const ests = getVal<Estacionamiento[]>(
            "Descripcion_del_Inmueble.Estacionamientos",
            [],
        );
        if (ests.length === 0) return "Cero plazas de estacionamiento";

        const countStr =
            ests.length === 1
                ? "UNA (1)"
                : `${numberToWords(ests.length).toUpperCase()} (${ests.length})`;
        const plazaStr = ests.length === 1 ? "plaza" : "plazas";
        const identificadaStr =
            ests.length === 1 ? "identificada" : "identificadas";
        const ubicadaStr = ests.length === 1 ? "ubicada" : "ubicadas";

        const numeros = ests.map((e) => e.Numero).join(", ");
        const sotano = ests[0]?.Sotano || "1";

        return `${countStr} ${plazaStr} de estacionamiento ${identificadaStr} con los números: ${numeros}, ${ubicadaStr} en el sótano número: ${sotano}.`;
    };

    const getFechaLegalizacion = () => {
        const d = (data?.FechaDocumento || "").split("-");
        if (d.length < 3) return { dia: "[DIA]", mes: "[MES]", anio: "[AÑO]" };
        const f = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]));
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
        return {
            dia: f.getUTCDate().toString(),
            mes: meses[f.getUTCMonth()],
            anio: numberToWordsYear(f.getUTCFullYear()).toLowerCase(),
        };
    };

    const getFechaFirma = () => {
        const d = (data?.FechaDocumento || "").split("-");
        if (d.length < 3) return { dia: "[DIA]", mes: "[MES]", anio: "[AÑO]" };
        const f = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]));
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
        return {
            dia: f.getUTCDate().toString(),
            mes: meses[f.getUTCMonth()],
            anio: numberToWordsYear(f.getUTCFullYear()).toLowerCase(),
        };
    };

    const getPlazoMeses = () => {
        const letras = getVal<string>(
            "Liquidacion_Final_y_Plazos.PlazoMesesLetras",
            "veintidós",
        );
        const numeros = getVal<number>(
            "Liquidacion_Final_y_Plazos.PlazoMesesNumeros",
            22,
        );

        return { letras, numeros: numeros.toString() };
    };

    const getMesEntrega = () => {
        const dEnt = getVal<any>("Liquidacion_Final_y_Plazos", {});
        const mes = dEnt.MesEntrega || "[FECHA_ENTREGA]";
        const dia = dEnt.DiaEntrega as number | undefined;
        const diaLetras = dEnt.DiaEntregaLetras as string | undefined;
        const anio = dEnt.AnioEntrega as number | undefined;
        const anioTexto = anio ? numberToWordsYear(anio).toLowerCase() : "[AÑO]";
        const diaStr = diaLetras && dia ? `${diaLetras} (${dia}) de ` : "";
        return `${diaStr}${mes} de ${anioTexto}`;
    };

    const getFechaEntrega = () => {
        const dEnt = getVal<any>("Liquidacion_Final_y_Plazos", {});
        const mesStr = dEnt.MesEntrega || "";
        const anio = dEnt.AnioEntrega;

        // Si tenemos el año y podemos identificar el mes por nombre
        const mesesNombres = [
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
        const mesIdx = mesesNombres.findIndex((m) =>
            mesStr.toLowerCase().includes(m),
        );

        if (mesIdx !== -1 && anio) {
            return `${(mesIdx + 1).toString().padStart(2, "0")}/${anio}`;
        }

        return mesStr;
    };

    const getSaldoFinal = () => {
        const letras = getVal<string>(
            "Condiciones_Economicas.TercerPagoLetras",
            "[SALDO_LETRAS]",
        );
        const numeros = getVal<number>(
            "Condiciones_Economicas.TercerPagoNumeros",
            0,
        );

        return {
            letras,
            numeros: (numeros || 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
        };
    };

    if (loading) {
        return createPortal(
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#0f172a",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2147483647,
                    fontFamily: "'Outfit', sans-serif",
                }}
            >
                <style>{`
                    body { margin: 0; padding: 0; overflow: hidden; background-color: #0f172a; }
                    .loader-minimalist { display: flex; flexDirection: column; alignItems: center; gap: 2rem; color: #fff; }
                    .spinner-emerald { width: 50px; height: 50px; border: 3px solid rgba(16, 185, 129, 0.1); border-top: 3px solid #10b981; border-radius: 50%; animation: spin 0.8s linear infinite; }
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
                <div className="loader-minimalist">
                    <div className="spinner-emerald"></div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                            Generando Documento
                        </div>
                        <div style={{ color: "#94a3b8" }}>
                            Analizando compromiso de compraventa...
                        </div>
                    </div>
                </div>
            </div>,
            document.body,
        );
    }

    const tipoPersona = data?.TipoPersona || "individual";

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#f8fafc",
            }}
        >
            {!hideControlBar && (
                <div
                    className="no-print"
                    style={{
                        padding: "12px 20px",
                        backgroundColor: "#ffffff",
                        borderBottom: "1px solid #e2e8f0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                >
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            onClick={() => setShowWebhookData(!showWebhookData)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                fontWeight: 600,
                                cursor: "pointer",
                                border: "1px solid #3b82f6",
                                backgroundColor: showWebhookData
                                    ? "#3b82f6"
                                    : "#ffffff",
                                color: showWebhookData ? "#ffffff" : "#3b82f6",
                                transition: "all 0.2s",
                            }}
                        >
                            {showWebhookData
                                ? "Ocultar Webhook Data"
                                : "Ver Webhook Data"}
                        </button>
                        <button
                            onClick={() => window.print()}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                fontWeight: 600,
                                cursor: "pointer",
                                border: "none",
                                backgroundColor: "#6366f1",
                                color: "#ffffff",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}
                        >
                            Imprimir / PDF
                        </button>
                    </div>
                </div>
            )}

            {showWebhookData && (
                <div
                    className="no-print"
                    style={{
                        margin: "20px",
                        padding: "20px",
                        backgroundColor: "#1e293b",
                        color: "#e2e8f0",
                        borderRadius: "8px",
                        maxHeight: "400px",
                        overflow: "auto",
                        fontSize: "12px",
                        fontFamily: "monospace",
                    }}
                >
                    <h3 style={{ marginTop: 0, color: "#38bdf8" }}>
                        Payload del Webhook:
                    </h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}

            <div
                className="content-area"
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    padding: "40px 0",
                    backgroundColor: "#f8fafc",
                }}
            >
                <style>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; }
                        .content-area { padding: 0 !important; background: white !important; }
                    }
                `}</style>
                {tipoPersona === "juridica" ? (
                    <JuridicaTemplate
                        data={data}
                        getVal={getVal}
                        getComprador={getComprador}
                        getParqueosDescripcion={getParqueosDescripcion}
                        getFechaLegalizacion={getFechaLegalizacion}
                        getFechaFirma={getFechaFirma}
                        getSaldoFinal={getSaldoFinal}
                        getDireccionComprador={getDireccionComprador}
                        getPlazoMeses={getPlazoMeses}
                        getMesEntrega={getMesEntrega}
                    />
                ) : (
                    <IndividualTemplate
                        data={data}
                        getVal={getVal}
                        getComprador={getComprador}
                        getParqueosDescripcion={getParqueosDescripcion}
                        getFechaLegalizacion={getFechaLegalizacion}
                        getFechaFirma={getFechaFirma}
                        getSaldoFinal={getSaldoFinal}
                        getDireccionComprador={getDireccionComprador}
                        getPlazoMeses={getPlazoMeses}
                        getMesEntrega={getMesEntrega}
                    />
                )}
            </div>
        </div>
    );
};

export default DocumentoPromesa;
