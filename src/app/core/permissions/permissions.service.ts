import { inject, Injectable } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { map, Observable } from 'rxjs';
import { PermissionsDocumentation } from './permissions.types';

const route = '/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private api = inject(ApiService);

  getModificationRoles(): Observable<readonly string[]> {
    return this.api.get<PermissionsDocumentation>(`${route}/modify`).pipe(
      map(resp => resp.allowedRoles)
    );
  }
}
