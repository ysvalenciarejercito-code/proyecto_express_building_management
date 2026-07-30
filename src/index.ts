// ============================================
// ENTRY POINT — Orquesta todo el flujo
// ============================================

import { readUnits } from './reader.js';
import { filterByType, calculateSummary } from './processor.js';
import { writeReport } from './writter.js';
import type { Report } from './types.js';

async function main(): Promise<void> {
  try {
    // 1. Parsear el argumento --type desde process.argv
    const args = process.argv.slice(2);
    const typeIndex = args.indexOf('--type');
    const typeFilter: string | null = typeIndex !== -1 ? (args[typeIndex + 1] ?? null) : null;

    // 2. Leer los datos
    const units = await readUnits();

    // 3. Filtrar por tipo
    const filteredUnits = filterByType(units, typeFilter);

    // 4. Calcular el resumen
    const summary = calculateSummary(filteredUnits);

    // 5. Construir el reporte
    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: typeFilter,
      summary,
      units: filteredUnits,
    };

    // 6. Imprimir el resumen en consola
    console.log('--- Resumen de Unidades ---');
    console.log(`Total: ${summary.total}`);
    console.log(`Activas: ${summary.active}`);
    console.log(`Inactivas: ${summary.inactive}`);
    console.log(`Cuota promedio: $${summary.averageFee}`);
    console.log(`Tipos: ${summary.types.join(', ')}`);

    // 7. Escribir el reporte en disco
    await writeReport(report);
  } catch (err) {
    console.error('Error al generar el reporte:', (err as Error).message);
    process.exit(1);
  }
}

main();