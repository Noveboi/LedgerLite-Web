import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from '../../auth/auth-service';
import { map, Observable, switchMap } from 'rxjs';
import { CreateOrganizationRequest, CreateOrganizationResponse } from '../organization.requests';
import { Organization } from '../organizations.types';
import { Router } from '@angular/router';
import { User } from '../../users/users.types';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  create(request: CreateOrganizationRequest): Observable<CreateOrganizationResponse> {
    return this.api.post<CreateOrganizationResponse>('/organizations', request).pipe(
      switchMap((resp) => this.auth.getUser().pipe(
        map(() => resp)
      ))
    );
  }

  getAll(): Observable<Organization[]> {
    return this.api.get<Organization[]>('/organizations');
  }

  join(organizationId: string) {
    this.api.put(`/organizations/${organizationId}/join`).subscribe(() => {
      this.auth.getUser().subscribe(() => this.router.navigate(['']));
    })
  }

  getMembers(organizationId: string) {
    return this.api.get<User[]>(`organizations/${organizationId}/members`);
  }

  removeMember(organizationId: string, memberId: string) {
    return this.api.delete(`organizations/${organizationId}/members/${memberId}`);
  }
}