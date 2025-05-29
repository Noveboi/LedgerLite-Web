import { SlimAccount } from "../accounts/accounts.types";

export interface AccountBalance {
    account: SlimAccount,
    credit: number,
    debit: number
}