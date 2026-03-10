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
    ActaFechaDia?: string;
    ActaFechaMes?: string;
    ActaFechaAnio?: string;
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

export interface TemplateProps {
    data: WebhookData | null;
    getVal: <T>(path: string, fallback?: T) => T;
    getComprador: (index: number, field: keyof Comprador, fallback?: string) => string;
    getParqueosDescripcion: () => string;
    getFechaLegalizacion: () => { dia: string; mes: string; anio: string };
    getFechaFirma: () => { dia: string; mes: string; anio: string };
    getSaldoFinal: () => { letras: string; numeros: string };
    getDireccionComprador: () => string;
    getPlazoMeses: () => { letras: string; numeros: string };
    getFechaEntrega: () => string;
    getMesEntrega: () => string;
}
