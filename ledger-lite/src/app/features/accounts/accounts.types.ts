export interface ChartOfAccounts {
    id: string,
    accounts: ChartAccountNode[]
}

export interface ChartAccountNode {
    account: SlimAccount
    children: ChartAccountNode[]
}

export interface SlimAccount {
    id: string,
    name: string,
    type: AccountType
}

export type AccountType = 'asset' | 'liability' | 'expense' | 'income' | 'equity';