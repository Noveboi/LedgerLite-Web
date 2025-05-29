import { Component, inject } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Organization } from '../organizations.types';

@Component({
  selector: 'app-join-organization',
  imports: [MatInput, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './join-organization.component.html',
  styleUrl: './join-organization.component.css'
})
export class JoinOrganizationComponent {
  private org = inject(OrganizationService);

  protected organizations = this.org.getAll();
  protected form = new FormGroup({
    organization: new FormControl<Organization | null>(null, [Validators.required])
  })

  protected displayFn = (val: Organization) => val.name;

  protected join() {
    const organization = this.form.value.organization;

    if (this.form.invalid || !organization) {
      return;
    }

    this.org.join(organization.id);    
  }
}
