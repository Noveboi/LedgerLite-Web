import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from '../../auth/auth-service';
import { Observable } from 'rxjs';
import { CreateOrganizationRequest, CreateOrganizationResponse } from '../organization.requests';
import { Organization } from '../organizations.types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  create(request: CreateOrganizationRequest): void {
    this.api.post<CreateOrganizationResponse>('/organizations', request).subscribe(() => this.auth.getUser());
  }

  getAll(): Observable<Organization[]> {
    return this.api.get<Organization[]>('/organizations');
  }

  join(organizationId: string) {
    this.api.put(`/organizations/${organizationId}/join`).subscribe(() => {
      this.auth.getUser();
      this.router.navigate([''])
    })
  }
}