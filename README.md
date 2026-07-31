# 🚀 Proyecto Semanal — Procesador de Datos con Node.js

## 🎯 Objetivo
Construir una herramienta de línea de comandos (CLI) que lea datos desde un archivo JSON, los procese aplicando filtros y transformaciones, y genere un reporte con los resultados — todo usando **Node.js + TypeScript + async/await**.

---

## 📋 Mi Dominio Asignado

**Dominio:** Administración de Edificios

El proyecto trabaja con el recurso principal `Unit` (unidad del edificio: apartamento, parqueadero o depósito), que integra las 4 entidades de mi dominio:

- **Units** → identidad y estado de la unidad (`id`, `code`, `type`, `active`)
- **Owners** → propietario asociado (`ownerName`)
- **Fees** → cuota mensual de administración (`monthlyFee`)
- **Maintenance** → solicitudes de mantenimiento pendientes (`pendingMaintenance`)

Renombré todo el starter genérico de la siguiente forma:
- `Item` → `Unit`
- `items.json` → `units.json`
- Los campos de `Item` → atributos propios de `Unit`

### 💡 Adaptación de campos

| Campo original (`Item`) | Campo nuevo (`Unit`) | Entidad que representa |
|---|---|---|
| `name` | `code` (ej. "Apto 302") | Units |
| `category` | `type` (`apartment`, `parking`, `storage`) | Units |
| `price` | `monthlyFee` | Fees |
| `stock` | `pendingMaintenance` (# solicitudes abiertas) | Maintenance |
| `active` | `active` (ocupada / vacante) | Units |
| *(nuevo)* | `ownerName` | Owners |

---

## ✅ Requisitos Funcionales

### 1. Leer datos desde un archivo JSON
La herramienta lee el archivo `data/units.json` usando `fs/promises`.

### 2. Mostrar un resumen del catálogo
- Total de unidades
- Unidades activas vs inactivas (ocupadas vs vacantes)
- Cuota promedio (`averageFee`)
- Unidad con la cuota más alta y más baja

### 3. Filtrar por tipo de unidad
Aceptar un argumento de línea de comandos para filtrar por tipo:
```bash
pnpm start -- --type apartment
```

### 4. Generar reporte en un archivo de salida
Guardar el reporte en `output/report.json` usando `fs/promises.writeFile`.

### 5. Manejo de errores
- Si el archivo `units.json` no existe → mostrar error descriptivo y terminar con `process.exit(1)`
- Si el tipo no existe → mostrar aviso y listar los tipos disponibles (`apartment`, `parking`, `storage`)

---

## 🛠️ Entregables
1. **Código funcional** que pase `pnpm build` sin errores TypeScript
2. **README.md actualizado** con mi dominio y descripción del recurso
3. **Screenshots o logs** de la herramienta ejecutándose con distintos argumentos
4. **`data/units.json`** adaptado a mi dominio (12 registros)
5. **Reporte generado** en `output/report.json`

---

## ⏱️ Tiempo estimado: 2-3 horas

---

## 🧪 Cómo correr el proyecto
```bash
cd /proyecto_express_building_management\
pnpm install
pnpm dev                       # sin filtro — muestra todas las unidades
pnpm dev -- --type apartment   # con filtro por tipo
```

---

## 📊 Criterios de Evaluación

| Criterio | Peso |
|----------|------|
| Lee y parsea `units.json` correctamente | 20% |
| Calcula el resumen (total, promedio, extremos) | 20% |
| Filtra por tipo con `--type` | 20% |
| Escribe `output/report.json` correctamente | 20% |
| Manejo de errores (archivo no encontrado, tipo inexistente) | 10% |
| TypeScript estricto — `pnpm build` sin errores | 10% |

---

## 🔗 Recursos de Apoyo
- [Teoría: Módulos ESM](../../1-teoria/02-modulos-esm.md)
- [Teoría: async/await](../../1-teoria/03-async-await.md)
- [Ejercicio 01: Hello Node](../../2-practicas/ejercicio-01-hello-node/README.md)
- [Node.js fs/promises API](https://nodejs.org/docs/latest/api/fs.html#promises-api)
- [process.argv — Node.js docs](https://nodejs.org/docs/latest/api/process.html#processargv)