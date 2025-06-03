import { JournalEntryLine } from "../journal-entries/journal-entry.types"

export interface ChartOfAccounts {
    id: string,
    accounts: ChartAccountNode[]
}

export interface ChartAccountNode {
    account: SlimAccount
    children: ChartAccountNode[]
}

export interface AccountWithLines {
    account: Account
    lines: readonly JournalEntryLine[]
}

export interface Account extends SlimAccount {
    number: string,
    description: string,
    expenseType: string | null
}

export interface SlimAccount {
    id: string,
    name: string,
    currency: string
    type: string,
    isControl: boolean
}
