interface IncomeStatementMetrics {
    grossProfitMargin: number
}

export interface IncomeStatement {
    revenue: number,
    directExpenses: number,
    indirectExpenses: number,
    interest: number,
    tax: number,
    grossProfit: number,
    operatingProfit: number,
    netProfit: number,
    metrics: IncomeStatementMetrics
}