import { Currency } from "../../types/core.types"

export interface ChartOfAccounts {
    id: string,
    accounts: ChartAccountNode[]
}

export interface ChartAccountNode {
    account: SlimAccount
    children: ChartAccountNode[]
}

export interface Account extends SlimAccount {
    number: string,
    currency: Currency,
    isControl: boolean
}

export interface SlimAccount {
    id: string,
    name: string,
    type: AccountType
}

export type AccountType = 'asset' | 'liability' | 'expense' | 'income' | 'equity';
export const accountTypes = ['Asset', 'Liability', 'Expense', 'Income', 'Equity']