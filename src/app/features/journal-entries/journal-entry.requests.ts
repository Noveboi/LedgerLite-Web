export interface UpdateJournalEntryRequest {
    lineId: string
    description: string | null
    transferAccountId: string | null
    occursAt: string | null
    credit: number | null
    debit: number | null
}

export interface CreateJournalEntryRequest {
    referenceNumber: string,
    occursAt: string,
    description: string,
    amount: number,
    debitAccountId: string,
    creditAccountId: string,
    fiscalPeriodId: string
}