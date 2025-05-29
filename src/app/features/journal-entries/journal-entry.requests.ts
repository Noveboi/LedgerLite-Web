export interface UpdateJournalEntryRequest {
    entryId: string,
    lineId: string,
    entryDescription: string,
    transferAccountId: string,
    credit: number,
    debit: number
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