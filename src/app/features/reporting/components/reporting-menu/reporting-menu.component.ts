import { Component, effect, HostBinding, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reporting-menu',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './reporting-menu.component.html',
  styleUrl: './reporting-menu.component.css'
})
export class ReportingMenuComponent {
  vertical = input<boolean>(false);

  @HostBinding('class.vertical') isVertical = false;

  constructor() {
    effect(() => {
      this.isVertical = this.vertical();
    })
  }
}
