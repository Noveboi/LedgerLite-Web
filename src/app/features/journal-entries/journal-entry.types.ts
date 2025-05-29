import { SlimAccount } from "../accounts/accounts.types";

export interface JournalEntryLine {
    id: string,
    entryId: string,
    occursAt: string,
    entryDescription: string,
    credit: number,
    debit: number,
    transferAccount: SlimAccount
}