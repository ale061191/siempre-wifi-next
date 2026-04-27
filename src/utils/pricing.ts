export const PRICE_PER_DAY_USD = 15 as const;

export function calcDays(start: Date, end: Date): number {
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function calcTotalPriceUSD(days: number, quantity = 1, pricePerDay: number = PRICE_PER_DAY_USD): number {
    if (days <= 0 || quantity <= 0) return 0;
    return days * pricePerDay * quantity;
}
