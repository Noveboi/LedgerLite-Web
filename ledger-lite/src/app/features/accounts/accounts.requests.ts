import { Currency } from "../../types/core.types";
import { AccountType } from "./accounts.types";

export interface CreateAccountRequest {
    name: string,
    number: string,
    type: AccountType,
    currency: Currency,
    isPlaceholder: boolean,
    description: string | null 
    parentId: string | null
}