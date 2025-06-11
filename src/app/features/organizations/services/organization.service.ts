import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from '../../auth/auth-service';
import { BehaviorSubject, filter, map, Observable, switchMap } from 'rxjs';
import { Organization } from '../organizations.types';
import { Router } from '@angular/router';
import { User } from '../../users/users.types';
import { CreateOrganizationRequest, CreateOrganizationResponse } from '../organization.requests';

type RemoveMemberResponse = {
  organizationId: string,
  memberId: string
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  private _remove$ = new BehaviorSubject<RemoveMemberResponse | null>(null);
  public remove$ = this._remove$.pipe(
    filter(x => x !== null)
  );

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
    this.api.delete(`organizations/${organizationId}/members/${memberId}`).subscribe(() => {
      this._remove$.next({organizationId, memberId});
    });
  }
}