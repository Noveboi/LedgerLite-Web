import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TrialBalanceTableComponent } from "../../reporting/trial-balance/components/trial-balance-table/trial-balance-table.component";

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, TrialBalanceTableComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = this.auth.user;

  navigateToCreateOrganization() {
    this.router.navigate(['organizations', 'create'])
  }
}
