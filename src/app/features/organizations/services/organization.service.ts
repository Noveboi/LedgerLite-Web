import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { CreateOrganizationRequest, CreateOrganizationResponse } from '../organizations.types';
import { AuthService } from '../../../core/services/auth-service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  create(request: CreateOrganizationRequest): void {
    this.api.post<CreateOrganizationResponse>('/organizations', request).subscribe({
      next: (resp) => {
        this.auth.getUser()
      }
    });
  }
}