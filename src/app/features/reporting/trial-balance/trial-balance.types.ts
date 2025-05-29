import { FiscalPeriod } from "../../fiscal-periods/fiscal-periods.types";
import { AccountBalance as AccountBalance } from "../reporting.types";

export interface TrialBalance {
    totalCredits: number,
    totalDebits: number,
    period: FiscalPeriod,
    workingBalances: AccountBalance[]
}