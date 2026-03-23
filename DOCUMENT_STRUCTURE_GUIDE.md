# Guía de Estructura y Estilos: Documento Promesa (Bravante-Forms)

Este documento sirve como referencia técnica para desarrolladores e IAs sobre la estructura, reglas de negocio y estilos aplicados en la generación de la "Promesa de Compraventa" del proyecto Bravante.

## 1. Localización de Archivos Core
- **Plantillas:** `src/components/templates/JuridicaTemplate.tsx` y `IndividualTemplate.tsx`.
- **Estilos:** `src/components/templates/DocumentStyles.tsx`.
- **Utilidades:** `src/components/templates/utils.ts`.

## 2. Sistema de Estilos y Resaltado
Los documentos utilizan un sistema de resaltado visual para identificar datos que provienen de fuentes externas (Webhook).
- **Clases de Resaltado:** `.highlight-yellow`, `.highlight-red`, `.dynamic-data`.
- **Color de Resaltado:** Verde vibrante (`#16a34a`).
- **Formato:** Todo campo mapeado debe estar envuelto en un `<span className="bold highlight-yellow">`.

## 3. Reglas de Formato de Datos

### Documento Personal de Identificación (DPI)
- **Representación en Letras:** Siempre en **MAYÚSCULAS**.
- **Separadores:** Los bloques de números en letras se separan por **comas (,)**.
- **Representación Numérica:** Se agrupa en formato `0000 00000 0000` con un **espacio único** entre bloques.
- **Ejemplo:** `DOS MIL QUINIENTOS CUARENTA, SETENTA Y NUEVE MIL DOSCIENTOS VEINTINUEVE, MIL CUATROCIENTOS UNO (2540 79229 1401)`.

### Conversión de Números a Palabras
- Se utiliza la utilidad `numberToWords` en `utils.ts`.
- Todos los montos y números importantes deben convertirse a letras y mostrarse en **MAYÚSCULAS**.

## 4. Lógica de Pagos (Forma de Pago)
La cláusula de "Forma de Pago" es dinámica y se basa en el array `Pagos` del payload:

1.  **Primer Pago (Reserva):** Se toma directamente del primer elemento del array `Pagos` (`pagos[0].value`).
2.  **Segundo Pago (Saldo Enganche):** Se calcula restando el primer pago del total de la reserva/enganche (`Condiciones_Economicas.ReservaNumeros`).
3.  **Pagos Mensuales:** Se listan a partir del segundo elemento del array `Pagos`.
4.  **Conteo de Pagos:** La cantidad de cuotas mensuales se calcula como `pagos.length - 1`.

## 5. Mapeo de Webhook
El payload principal contiene:
- `Compradores`: Array de objetos con datos personales.
- `Pagos`: Cronograma de pagos con `date` y `value`.
- `Datos_Juridicos`: Información para la plantilla legal (empresa, representante, etc.).
- `Descripcion_del_Inmueble`: Datos de apartamento, niveles y metros cuadrados.

## 6. Consideraciones para IA/Devs
Al realizar modificaciones:
1.  **Fidelidad Visual:** Mantener el `standard` de diseño premium (fuentes serif para títulos, sans-serif para cuerpo).
2.  **Gramática:** Asegurar que los géneros y plurales coincidan con el tipo de persona (Individual vs Jurídica).
3.  **UpperCase:** Los nombres propios, profesiones y números en letras suelen ir en mayúsculas por requisito legal de Bravante.
