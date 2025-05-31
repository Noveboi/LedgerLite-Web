import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from "../../../components/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganizationService } from '../services/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-organization-form',
  imports: [MatFormFieldModule, MatInputModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-organization-form.component.html',
  styleUrl: './create-organization-form.component.css'
})
export class CreateOrganizationFormComponent {
  private organizations = inject(OrganizationService);
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);

  group = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  handleCreateOrganization(e: SubmitEvent) {
    e.preventDefault()
    if (this.group.invalid){
      return;
    }

    const value = this.group.value;
    if (!value.name || value.name === '') {
      return;
    }

    this.organizations.create({ name: value.name }).subscribe(resp => {
      this.snackbar.open(`Successfully created organization '${resp.name}'`)
      this.router.navigate(['']);
    })
  }
}