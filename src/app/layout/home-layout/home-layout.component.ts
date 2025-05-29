import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { NoOrganizationComponent } from './modes/no-organization/no-organization.component';
import { NormalHomeLayoutComponent } from './modes/normal/home-layout.component';

@Component({
  selector: 'app-home-layout',
  imports: [NoOrganizationComponent, NormalHomeLayoutComponent, NoOrganizationComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {
  private auth = inject(AuthService);
  user = this.auth.user;
}
