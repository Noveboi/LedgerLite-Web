export interface ChartOfAccounts {
    id: string,
    accounts: ChartAccountNode[]
}

export interface ChartAccountNode {
    account: SlimAccount
    children: ChartAccountNode[]
}

export interface Account extends SlimAccount {
    number: string
}

export interface SlimAccount {
    id: string,
    name: string,
    currency: string
    type: string,
    isControl: boolean
}

export const accountTypes = ['Asset', 'Liability', 'Expense', 'Revenue', 'Equity']