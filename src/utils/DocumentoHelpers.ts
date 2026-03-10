
// @ts-ignore
// @ts-ignore
// @ts-ignore

export interface Comprador {
    Nombre?: string;
    DPI?: string;
    DPI_Letras?: string;
    ExtendidoEn?: string;
    EstadoCivil?: string;
    Profesion?: string;
    Edad_Numeros?: number;
    Edad_Letras?: string;
    Nacionalidad?: string;
    FechaNacimiento?: string;
    Direccion?: string;
    Domicilio?: string;
    Domicilio_Letras?: string;
    TelefonoDomicilio?: string;
    Celular?: string;
    NIT?: string;
    CorreoElectronico?: string;
    LugarTrabajo?: string;
    DireccionTrabajo?: string;
    TelefonoTrabajo?: string;
    IngresoMensual?: number;
    OtrosIngresos?: number;
}

export interface Proyecto {
    total_unidades?: string;
    total_unidades_numeros?: string;
    unidades_torre1?: string;
    unidades_torre1_numeros?: string;
    unidades_torre2?: string;
    unidades_torre2_numeros?: string;
    variacion_unidades?: string;
    numero_elevadores?: string;
    elevadores_por_torre?: string;
    fuente_agua?: string;
    entidad_agua?: string;
    tipo_cisterna?: string;
    agua_potable?: string;
    tratamiento_agua?: string;
    entidad_electrica?: string;
    planta_emergencia?: string;
    sistema_seguridad?: string;
    sistema_acceso?: string;
    sistema_vigilancia?: string;
    sistema_drenaje?: string;
    planta_tratamiento?: string;
    nombre_torre1?: string;
    nombre_torre2?: string;
}

export interface Pago {
    pago?: string;
    fecha?: string;
    value?: string;
}

export interface Estacionamiento {
    Numero?: string;
    Numero_Letras?: string;
    Sotano?: string;
    Sotano_Letras?: string;
    Tipo?: string;
}

export interface Bodega {
    Numero?: string;
    Numero_Letras?: string;
    Sotano?: string;
    Sotano_Letras?: string;
}

export interface DatosJuridicos {
    EmpresaNombre?: string;
    RepresentanteNombre?: string;
    RepresentanteCargo?: string;
    RepresentanteNacionalidad?: string;
    RepresentanteEstadoCivil?: string;
    RepresentanteProfesion?: string;
    RepresentanteEdadLetras?: string;
    ActaNotarialFecha?: string;
    NotarioNombre?: string;
    InscritoNumero?: string;
    InscritoFolio?: string;
    InscritoLibro?: string;
    RepresentanteDPI?: string;
    RepresentanteDPI_Letras?: string;
}

export interface WebhookData {
    TipoPersona?: "individual" | "juridica";
    Compradores?: Comprador[];
    Datos_Juridicos?: DatosJuridicos;
    proyecto?: Proyecto;
    Descripcion_del_Inmueble?: {
        Apartamento?: string;
        Torre?: string;
        Nivel?: string;
        Nivel_Letras?: string;
        Habitaciones?: string;
        Habitaciones_Letras?: string;
        DescripcionApartamento?: string;
        AreaConstruccionLetras?: string;
        AreaConstruccionNumeros?: number;
        ParqueosDescripcion?: string;
        ParqueosAreaLetras?: string;
        ParqueosAreaNumeros?: number;
        BodegasDescripcion?: string;
        TerrazaAreaLetras?: string;
        TerrazaAreaNumeros?: number;
        BalconAreaLetras?: string;
        BalconAreaNumeros?: number;
        Estacionamientos?: Estacionamiento[];
        Bodegas?: Bodega[];
    };
    Condiciones_Economicas?: {
        PrecioLetras?: string;
        PrecioNumeros?: number;
        ReservaLetras?: string;
        ReservaNumeros?: number;
        SegundoPagoLetras?: string;
        SegundoPagoNumeros?: number;
        CantidadPagosLetras?: string;
        CantidadPagosNumeros?: number;
        TercerPagoLetras?: string;
        TercerPagoNumeros?: number;
        SaldoFinanciar?: number;
    };
    Pagos?: Pago[];
    Liquidacion_Final_y_Plazos?: {
        PlazoMesesLetras?: string;
        PlazoMesesNumeros?: number;
        MesEntrega?: string;
        AnioEntrega?: number;
        UltimoPagoLetras?: string;
        UltimoPagoNumeros?: number;
    };
    Datos_de_Notificacion_y_Cierre?: {
        Direccion?: string;
        FechaFirmaDia?: number;
        FechaFirmaMes?: string;
        FechaFirmaAnio?: number;
        FechaLegalizacionDia?: number;
        FechaLegalizacionMes?: string;
        FechaLegalizacionAnio?: number;
    };
}

export const numberToWords = (num: number): string => {
    if (num === 0) return "CERO";
    if (num < 0) return "MENOS " + numberToWords(Math.abs(num));

    const units = [
        "", "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"
    ];
    const teens = [
        "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE"
    ];
    const tens = [
        "", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"
    ];
    const hundreds = [
        "", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"
    ];

    const convertGroup = (n: number): string => {
        let res = "";
        if (n >= 100) {
            if (n === 100) return "CIEN";
            res += hundreds[Math.floor(n / 100)];
            n %= 100;
            if (n > 0) res += " ";
        }
        if (n >= 20) {
            if (n === 20) return res + "VEINTE";
            if (n < 30) return res + "VEINTI" + units[n - 20];
            res += tens[Math.floor(n / 10)];
            n %= 10;
            if (n > 0) res += " Y " + units[n];
        } else if (n >= 10) {
            res += teens[n - 10];
        } else if (n > 0) {
            res += units[n];
        }
        return res;
    };

    let result = "";

    if (num >= 1000000) {
        const millions = Math.floor(num / 1000000);
        if (millions === 1) {
            result += "UN MILLÓN ";
        } else {
            result += convertGroup(millions) + " MILLONES ";
        }
        num %= 1000000;
    }

    if (num >= 1000) {
        const thousands = Math.floor(num / 1000);
        if (thousands === 1) {
            result += "MIL ";
        } else {
            result += convertGroup(thousands) + " MIL ";
        }
        num %= 1000;
    }

    if (num > 0) {
        result += convertGroup(num);
    }

    return result.trim().toUpperCase();
};

// Converts the last 2 digits of a year to Spanish words for legal documents.
// e.g. 2026 → "veintiséis", 2030 → "treinta", 2028 → "veintiocho"
export const yearSuffixToWords = (year: number): string => {
    const suffix = year % 100;
    const tens = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
    const teens = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
    const units = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
    if (suffix === 0) return "cero";
    if (suffix < 10) return units[suffix];
    if (suffix < 20) return teens[suffix - 10];
    if (suffix < 30) return suffix === 20 ? "veinte" : "veinti" + units[suffix - 20];
    const t = Math.floor(suffix / 10);
    const u = suffix % 10;
    return u === 0 ? tens[t] : tens[t] + " y " + units[u];
};

export const formatDateToWords = (dateStr: string): string => {
    if (!dateStr || !dateStr.includes("-")) return dateStr;
    const parts = dateStr.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${numberToWords(day)} DE ${months[month - 1].toUpperCase()} DE DOS MIL ${yearSuffixToWords(year).toUpperCase()}`;
};

