import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TrialBalanceTableComponent } from "../../reporting/trial-balance/components/trial-balance-table/trial-balance-table.component";

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, TrialBalanceTableComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
