import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { map, Observable } from 'rxjs';
import { PermissionsDocumentation } from './permissions.types';
import { AuthService } from '../../features/auth/auth-service';
import { User } from '../../features/users/users.types';
import { LedgerSignalService } from '../services/ledger-signal.service';

const route = '/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private signals = inject(LedgerSignalService);

  private _isAllowedToModify = this.signals.make(false, {
    onAuthorized: () => this.determine()
  });

  isAllowedToModify = this._isAllowedToModify.asReadonly();

  private determine(): void {
    const user = this.auth.user();
    if (!user){
      this._isAllowedToModify.set(false);
      return;
    }

    if (!this.modificationRoles) {
      this.getModificationRoles().subscribe(roles => this._isAllowedToModify.set(this.isAllowed(user, roles)));
      return;
    }

    this._isAllowedToModify.set(this.isAllowed(user, this.modificationRoles))
  }

  private modificationRoles: readonly string[] | null = null;

  private getModificationRoles(): Observable<readonly string[]> {
    return this.api.get<PermissionsDocumentation>(`${route}/modify`).pipe(
      map(resp => resp.allowedRoles)
    );
  }

  private isAllowed(user: User, roles: readonly string[]): boolean {
    return roles.some(role => user.organizationRoles.some(userRole => role === userRole.name));
  }
}
