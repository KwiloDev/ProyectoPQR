// Convierte 1200000 → "1.200.000"
export function formatNumber(value) {
   if (!value) return "";
  const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${formatted}`;
}

// Limpia el valor entrando del input → solo números sin puntos
export function parseNumber(value) {
  if (!value) return "";
  return value.replace(/\./g, "").replace(/\D/g, "");
}
