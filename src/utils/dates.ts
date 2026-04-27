export const MONTH_NAMES_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
] as const;

/**
 * Devuelve un string con formato `D Mes` (por ej. "12 Marzo").
 */
export function formatDayMonth(date: Date, months: readonly string[] = MONTH_NAMES_ES): string {
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
}
