import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReportingMenuComponent } from "../components/reporting-menu/reporting-menu.component";

@Component({
  selector: 'app-reporting-layout',
  imports: [RouterOutlet, ReportingMenuComponent],
  templateUrl: './reporting-layout.component.html',
  styleUrl: './reporting-layout.component.css'
})
export class ReportingLayoutComponent {

}
