export const FECHAS_POR_DEFECTO = {
    // defaults...
};
export const getValProp = (data: any, path: string, defaultValue?: any): any => {
    if (!data) return defaultValue;
    const keys = path.split(".");
    let current = data;
    for (const key of keys) {
        if (current === undefined || current === null) return defaultValue;
        current = current[key];
    }
    return current !== undefined ? current : defaultValue;
};
export const getCompradorProp = (data: any, index: number, path: string, defaultValue?: any): any => {
    if (!data || !data.Compradores || !data.Compradores[index]) return defaultValue;
    return getValProp(data.Compradores[index], path, defaultValue);
};
export const numberToWords = (num: number): string => {
    // ...
};
// ... we'll need to copy the functions
