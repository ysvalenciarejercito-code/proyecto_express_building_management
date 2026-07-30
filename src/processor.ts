// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================

import type { Unit, UnitSummary } from './types.js';

export function filterByType(units: Unit[], typeFilter: string | null): Unit[] {
  if (typeFilter === null) {
    return units;
  }

  const filtered = units.filter(
    (u) => u.type.toLowerCase() === typeFilter.toLowerCase()
  );

  if (filtered.length === 0) {
    const availableTypes = Array.from(new Set(units.map((u) => u.type)));
    throw new Error(
      `No hay unidades del tipo "${typeFilter}". Tipos disponibles: ${availableTypes.join(', ')}`
    );
  }

  return filtered;
}

export function calculateSummary(units: Unit[]): UnitSummary {
  const active = units.filter((u) => u.active);
  const inactive = units.filter((u) => !u.active);

  const totalFees = units.reduce((sum, u) => sum + u.monthlyFee, 0);
  const averageFee = Math.round((totalFees / units.length) * 100) / 100;

  const mostExpensive = units.reduce((max, u) =>
    u.monthlyFee > max.monthlyFee ? u : max
  );
  const cheapest = units.reduce((min, u) =>
    u.monthlyFee < min.monthlyFee ? u : min
  );

  const types = Array.from(new Set(units.map((u) => u.type)));

  return {
    total: units.length,
    active: active.length,
    inactive: inactive.length,
    averageFee,
    mostExpensive,
    cheapest,
    types,
  };
}