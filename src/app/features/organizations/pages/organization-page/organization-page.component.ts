import { Component } from '@angular/core';
import { OrganizationMemberTableComponent } from "../../organization-member-table/organization-member-table.component";

@Component({
  selector: 'app-organization-page',
  imports: [OrganizationMemberTableComponent],
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.css'
})
export class OrganizationPageComponent {

}
