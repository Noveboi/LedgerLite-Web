import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AccountTreeComponent } from "../../features/accounts/components/account-tree/account-tree.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { UserProfileBannerComponent } from "../../features/users/user-profile-banner/user-profile-banner.component";

@Component({
  selector: 'app-home-layout',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterOutlet, AccountTreeComponent, LogoComponent, UserProfileBannerComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {
  toggleTheme() {
    document.body.classList.toggle('dark')
  }
}