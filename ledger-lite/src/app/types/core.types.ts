export type Currency = 'EUR' | 'USD' | 'GBP'
export const currencies = new Map<string, Currency>([
    ['€', 'EUR'],
    ['$', 'USD'],
    ['£', 'GBP']
]) 