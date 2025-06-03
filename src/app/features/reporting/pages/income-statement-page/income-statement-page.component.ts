import { Component } from '@angular/core';
import { StatementTitleComponent } from "../../components/statement-title/statement-title.component";
import { IncomeStatementTableComponent } from "../../statements/income/components/income-statement-table/income-statement-table.component";

@Component({
  selector: 'app-income-statement-page',
  imports: [StatementTitleComponent, IncomeStatementTableComponent],
  templateUrl: './income-statement-page.component.html',
  styleUrl: './income-statement-page.component.css'
})
export class IncomeStatementPageComponent {

}
