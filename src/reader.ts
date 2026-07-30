// ============================================
// READER — Lee el archivo de datos JSON
// ============================================

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Unit } from './types.js';

export async function readUnits(): Promise<Unit[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'units.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Unit[];
  } catch (err) {
    throw new Error(
      `No se pudo leer el archivo de unidades en ${filePath}: ${(err as Error).message}`
    );
  }
}