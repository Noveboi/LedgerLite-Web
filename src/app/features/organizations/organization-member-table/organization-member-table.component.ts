import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { OrganizationService } from '../services/organization.service';
import { AuthService } from '../../auth/auth-service';
import { filter, map, merge, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OrganizationMemberActionsComponent } from '../organization-member-actions/organization-member-actions.component';

interface MemberRow {
  memberId: string,
  roles: readonly string[],
  username: string,
  fullName: string
}

@Component({
  selector: 'app-organization-member-table',
  imports: [AgGridAngular, AsyncPipe],
  templateUrl: './organization-member-table.component.html',
  styleUrl: './organization-member-table.component.css'
})
export class OrganizationMemberTableComponent {
  private auth = inject(AuthService);
  private org = inject(OrganizationService);

  protected members$: Observable<MemberRow[]>

  constructor() {
    this.members$ = merge(this.auth.user$, this.org.remove$).pipe(
      filter(resp => resp !== null),
      map(resp => 'organizationId' in resp 
        ? resp.organizationId
        : resp.organization!.id
      ),
      switchMap(orgId => this.org.getMembers(orgId ?? '').pipe(
        map(members => members.map<MemberRow>(member => ({
          memberId: member.memberId!,
          fullName: member.fullName ?? '',
          roles: member.organizationRoles.map(role => role.name) ?? [],
          username: member.username
        })))
      ))
    );
  }
  
  protected colDefs: ColDef<MemberRow>[] = [
    {field: 'username'},
    {field: 'fullName'},
    {headerName: 'Roles', valueGetter: params => params.data?.roles.join(', ')},
    {
      headerName: 'Actions', 
      cellRendererSelector: params => {
        return {
          component: OrganizationMemberActionsComponent,
          params: { memberId: params.data?.memberId }
        }
      }
    }
  ]
}
