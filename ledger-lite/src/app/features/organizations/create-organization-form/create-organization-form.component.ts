import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'app-create-organization-form',
  imports: [MatFormFieldModule, MatInputModule, ButtonComponent],
  templateUrl: './create-organization-form.component.html',
  styleUrl: './create-organization-form.component.css'
})
export class CreateOrganizationFormComponent {
  handleCreateOrganization(e: SubmitEvent) {
    e.preventDefault()
    console.log('ok!')
  }
}