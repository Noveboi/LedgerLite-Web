import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule],
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
