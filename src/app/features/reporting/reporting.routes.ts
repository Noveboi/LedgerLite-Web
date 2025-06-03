import { Routes } from "@angular/router";
import { ReportingLayoutComponent } from "./layout/reporting-layout.component";
import { IncomeStatementPageComponent } from "./pages/income-statement-page/income-statement-page.component";
import { BalanceSheetPageComponent } from "./pages/balance-sheet-page/balance-sheet-page.component";
import { CashFlowPageComponent } from "./pages/cash-flow-page/cash-flow-page.component";

export const REPORTING_ROUTES: Routes = [
    { path: '', component: ReportingLayoutComponent, children: [
        { path: 'income', component: IncomeStatementPageComponent },
        { path: 'balance', component: BalanceSheetPageComponent },
        { path: 'cash-flow', component: CashFlowPageComponent }
    ]}
]