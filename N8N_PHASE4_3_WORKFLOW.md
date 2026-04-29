# N8N Workflow: PHASE4.3 - LLENAR DOCUMENTO LEGAL

**ID:** `xTNw4_8oAxaNDLxiaN0td`  
**Estado:** Activo  
**Disponible vía MCP:** Sí  
**Última modificación:** 2026-04-29  

Este workflow es el backend que alimenta `DocumentoPromesa.tsx`. Recibe el ID de un cliente, recopila datos de tres fuentes (MongoDB, Monday.com y el PDF de la promesa), los procesa con IA y devuelve el JSON estructurado listo para renderizar el documento legal.

---

## Endpoint

```
POST https://agentsprod.redtec.ai/webhook/promesa-document
Content-Type: application/json

{ "id": "<MongoDB_client_id>" }
```

El mismo path es llamado desde `DocumentoPromesa.tsx` usando `VITE_API_URL/promesa-document`.

---

## Flujo completo

```
Webhook (POST /promesa-document)
    ↓
Find Client (MongoDB: clients, busca por _id)
    ↓
SI Promesa fue generada (IF: ¿existe document_promesa_firma?)
    ├── SÍ → Edit Fields → Respond to Webhook  ← fast path: retorna JSON ya guardado
    └── NO → continúa el proceso completo
                ↓
        Get Principal Client (Monday.com: board item por monday_id)
                ↓ (3 ramas en paralelo)
    ┌───────────┬────────────────┬──────────────────┐
    ↓           ↓                ↓
Obtener URL  SUBITEMS        Identificador
de Archivo   from Monday     (Set: extrae Identificador)
    ↓           ↓                ↓
Descargar   Split Out1      Find Related Clients
Promesa PDF     ↓            (MongoDB: mismo Identificador)
    ↓       Loop Items1          ↓
Extract         ↓            Loop Over Items
from File   CURRENT              ↓
(texto PDF) PAYMENT          Nmbre y Sexo
    ↓       (pago/fecha/val)     ↓
    │           ↓            Aggregate
    │       Aggregate2       (relation_nombre_sexo_list[])
    │       (Pagos[])            │
    └───────────────────────────┘
                ↓
            Merge1 (texto PDF + lista nombre/sexo)
                ↓
        Information Extractor (LangChain)
        + OpenAI gpt-5.4-mini
                ↓
        NORMALIZE DATA (Code JS)
                ↓
            DATA (Code JS)
            (fusiona: documento ← AI  +  registrales ← Monday)
                ↓
        Merge (DATA + Pagos[])
                ↓
        DATA TO SEND (Set: estructura data, Pagos, sexo)
                ↓
        Code in JavaScript2 (prepara _id + document_promesa_firma)
                ↓
        Update Client (MongoDB: guarda document_promesa_firma)
                ↓
        Respond to Webhook Form
        → { status: "success", data: { ...campos, Pagos: [...] } }
```

---

## Detalle de cada nodo

### Trigger
- **Webhook** — `POST /promesa-document`, CORS abierto (`*`), responde vía nodo `Respond to Webhook`.

### Fase 1 — Lookup del cliente
- **Find Client** — MongoDB, colección `clients`, query `{ "_id": "<id del body>" }`.
- **SI Promesa fue generada** — IF que chequea si `document_promesa_firma` ya existe en el documento del cliente. Si existe, responde de inmediato sin reprocesar (cache persistente en MongoDB).

### Fase 2 — Recolección de datos (3 ramas paralelas)

#### Rama A — PDF de la promesa
1. **Obtener URL de Archivo** — GraphQL a Monday.com, lee la columna `file_mkyf8anx` del item para obtener `public_url` del archivo.
2. **Descargar Promesa de Compraventa** — HTTP GET al `public_url`, descarga el PDF como binario.
3. **Extract from File** — Extrae el texto plano del PDF. El texto resultante es el input principal para la IA.

#### Rama B — Pagos / subitems de Monday.com
1. **SUBITEMS from Monday** — GraphQL a Monday.com, obtiene todos los subitems del item principal con sus `column_values`.
2. **Split Out1** — Divide el array `data.items[0].subitems` en items individuales.
3. **Loop Over Items1** — Itera cada subitem:
   - **CURRENT PAYMENT** — Extrae `{ pago: name, fecha: col[2].text, value: col[3].text }` y vuelve al loop.
   - Al terminar: **Aggregate2** agrupa todo en array `Pagos[]`.

> `Pagos[0]` = reserva (primer pago/enganche). `Pagos[1..n]` = cuotas mensuales. Ver reglas de pago en CLAUDE.md.

#### Rama C — Clientes relacionados (para resolver sexo de compradores)
1. **Identificador** — Extrae el campo `Identificador` del cliente encontrado en MongoDB (identifica a todos los co-compradores de un mismo expediente).
2. **Find Related Clients** — MongoDB, busca todos los clientes con ese mismo `Identificador`.
3. **Loop Over Items** — Itera cada cliente relacionado:
   - **Nmbre y Sexo** — Extrae `{ Nombre, sexo }` y vuelve al loop.
   - Al terminar: **Aggregate** agrupa en `relation_nombre_sexo_list[]`.

Esta lista se pasa a la IA para que asigne el sexo correcto a cada comprador del documento.

### Fase 3 — Extracción con IA

**Merge1** combina el texto del PDF (Rama A) con la lista nombre/sexo (Rama C).

**Information Extractor** (nodo LangChain `@n8n/n8n-nodes-langchain.informationExtractor`) envía al modelo:
```
Compromiso de Compraventa: <texto extraído del PDF>
Sexo de cada Comprador: [{"Nombre": "...", "sexo": "M/F"}, ...]
```

**OpenAI Chat Model** — modelo `gpt-5.4-mini` (verificar nombre exacto en n8n, posible typo).

El system prompt define **14 reglas de extracción**:

| Regla | Qué hace |
|-------|----------|
| R1 | Detecta `TipoPersona`: `"individual"` o `"juridica"` según campo "En representación de" |
| R2 | Extrae todos los compradores del documento (PROMITENTE + SEGUNDO si existe); asigna sexo desde la lista o infiere por nombre |
| R3 | DPI/CUI → `DPI_Letras` en 3 bloques separados por coma: `"2334 91937 0101"` → `"dos mil..., noventa y un mil..., cero ciento uno"` |
| R4 | Edad como entero (`Edad_Numeros`) y en letras sin "años" (`Edad_Letras`) |
| R5 | Todas las fechas en ISO 8601 `YYYY-MM-DD` |
| R6 | `Domicilio_Letras`: cada número de la dirección en palabras, guiones como "guion" |
| R7 | `Nivel_Letras` y `Habitaciones_Letras` en MAYÚSCULAS |
| R8 | Áreas en m² → letras MAYÚSCULAS con "PUNTO" para decimales: `176.27` → `"CIENTO SETENTA Y SEIS PUNTO VEINTISIETE"` |
| R9 | Estacionamientos y bodegas: `Numero_Letras` en MAYÚSCULAS, `Sotano` como entero y `Sotano_Letras` en MAYÚSCULAS |
| R10 | Precios en letras: `"MONTO EN PALABRAS (USD.XXX,XXX.XX)"` — aplica a `PrecioLetras`, `ReservaLetras`, `SaldoFinanciarLetras` |
| R11 | Inmueble completo: balcón, terraza, bodegas, sótanos; defaults en 0 si vacíos |
| R12 | Precios numéricos: elimina `$`, `%`, `,` → `number` puro |
| R13 | Extrae sección de Autorización de información crediticia como objeto separado |
| R14 | `Datos_Juridicos` solo se puebla si `TipoPersona === "juridica"`; corresponde al representante legal del COMPRADOR, no de Bravante |

El schema de salida es idéntico a la interfaz `WebhookData` de `src/components/templates/types.ts`.

**NORMALIZE DATA** (Code JS) — post-procesamiento del output de IA: garantiza tipos correctos, convierte strings a `number`, inicializa arrays vacíos, pone `0` en campos numéricos ausentes.

### Fase 4 — Ensamblado y persistencia

**DATA** (Code JS) — fusiona dos fuentes en un solo objeto:
```js
{
  documento: /* datos extraídos por IA del PDF */,
  registrales: {
    // columnas directas de Monday.com (Get Principal Client)
    telefono:           cols[1].text,
    correo:             cols[2].text,
    identificacion:     cols[6].text,
    estado_civil:       cols[7].text,   // nota: typo en el código ("esatdo_civil")
    direccion:          cols[8].text,
    precio_total:       cols[12].text,
    modelo:             cols[13].text,
    enganche:           cols[14].text,
    cuotas:             cols[15].text,
    telefono_vendedor:  cols[16].text,
    vendedor:           cols[17].text,
    fecha_nacimiento:   cols[18].text,
    id_inmueble:        cols[45].text,
    parqueos_adicionales: cols[48].text,
    fecha_entrega:      cols[49].text,
    nombre_entidad:     cols[51].text,
    representante_legal: cols[52].text,
    NIT:                cols[53].text,
    NIT_representante_legal: cols[54].text,
    bodega_nro:         cols[47].text,
    balcon_mts_cuadrados: cols[46].text,
  }
}
```

> Los `registrales` se fusionan sobre `documento` vía `Object.assign({}, documento, registrales)`, por lo que **los campos de Monday.com sobreescriben los de la IA** si coinciden en nombre.

**Merge** — combina DATA con `Pagos[]` (Rama B).

**DATA TO SEND** — estructura la respuesta final: `{ data: { ...documento, ...registrales }, Pagos: [...], sexo }`.

**Code in JavaScript2** — prepara el documento para MongoDB: `{ _id: <clean_id>, document_promesa_firma: <data_to_send> }`. Limpia comillas extras del `_id` con regex.

**Update Client** — MongoDB, actualiza el campo `document_promesa_firma` del cliente.

**Respond to Webhook Form** — responde HTTP 200:
```json
{
  "status": "success",
  "data": {
    "...todos los campos del documento...",
    "Pagos": [
      { "pago": "Reserva", "fecha": "...", "value": "..." },
      { "pago": "Cuota 1", "fecha": "...", "value": "..." }
    ]
  }
}
```

---

## Fuentes de datos y su prioridad

| Campo | Fuente | Prioridad |
|-------|--------|-----------|
| Datos del comprador (nombre, DPI, edad, etc.) | IA extrae del PDF | Base |
| Datos del inmueble (modelo, nivel, áreas) | IA extrae del PDF | Base |
| Precios y conversiones a letras | IA calcula | Base |
| Teléfono, correo, dirección, NIT | Monday.com columns | Sobreescribe IA |
| Precio total, enganche, cuotas | Monday.com columns | Sobreescribe IA |
| Vendedor, fecha entrega, entidad | Monday.com columns | Sobreescribe IA |
| Pagos (reserva + cuotas) | Subitems de Monday.com | Array separado |
| Sexo de compradores | MongoDB (clientes relacionados) | Pasado a IA |

---

## Relación con este repo (frontend)

`DocumentoPromesa.tsx` (`src/components/DocumentoPromesa.tsx`) llama a este webhook:
```ts
// POST ${VITE_API_URL}/promesa-document con body { id }
// La respuesta puede venir en varios formatos que el componente normaliza:
// - { status, data: { ... } }
// - { document_promesa_firma: { ... } }
// - directamente el objeto WebhookData
```

El JSON que devuelve este workflow se mapea 1:1 con la interfaz `WebhookData` de `src/components/templates/types.ts`. Si se agrega un campo nuevo al workflow, debe agregarse también a esa interfaz para que los templates puedan usarlo.

---

## Workflows relacionados (Fase 4)

| ID | Nombre | Descripción |
|----|--------|-------------|
| `8PD3mEOSAZrnkQErQ6nqZ` | PHASE4.1 - BRAVANTE | Entrada de la fase 4 |
| `G0QpNQyEMtfwuHlF` | PHASE4.2 - BRAVANTE | Procesamiento previo |
| `xTNw4_8oAxaNDLxiaN0td` | **PHASE4.3 - BRAVANTE** | **Este workflow** |
| `rwddBTUDw6CRRkzo` | PHASE4.3.1 - BRAVANTE | Sub-flujo paralelo |
| `pbr4Nm8ZmW8i0QACeHfIe` | PHASE4.3.2 - BRAVANTE | Sub-flujo paralelo |

---

## Problemas conocidos y notas

1. **Nombre del modelo AI:** el nodo usa `gpt-5.4-mini` — verificar si es un typo. Los nombres válidos conocidos son `gpt-4o-mini`, `gpt-4.1-mini`, etc.

2. **Cache sin invalidación:** una vez que `document_promesa_firma` existe en MongoDB, el fast path lo retorna siempre sin regenerar. Si cambian datos del cliente en Monday.com, el documento NO se actualiza automáticamente. Para forzar regeneración hay que borrar el campo `document_promesa_firma` del documento en MongoDB.

3. **Typo en campo:** el nodo DATA tiene `esatdo_civil` (debería ser `estado_civil`). El frontend debe manejar esta inconsistencia.

4. **Sin manejo de errores:** no hay ramas de error (`onError`) ni reintentos. Si el PDF no existe en Monday, si la IA falla, o si MongoDB no responde, el webhook no retornará respuesta al cliente React (timeout).

5. **Prioridad de fuentes:** los `registrales` de Monday sobreescriben los datos de la IA. Si un campo como `modelo` viene del PDF y también de la columna 13 de Monday, gana Monday.

6. **Integración con PromesaFirma:** después de que el usuario firma el documento, el flujo `PHASE4.3.1` o `PHASE4.3.2` se encarga de subir la firma; este workflow solo genera el documento base.
