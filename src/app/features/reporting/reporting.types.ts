import { SlimAccount } from "../accounts/accounts.types";

export interface AccountBalanceDto {
    account: SlimAccount,
    credit: number,
    debit: number
}