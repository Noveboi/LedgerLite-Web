import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { OrganizationService } from '../services/organization.service';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-organization-member-actions',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './organization-member-actions.component.html',
  styleUrl: './organization-member-actions.component.css'
})
export class OrganizationMemberActionsComponent implements ICellRendererAngularComp {
  private auth = inject(AuthService);
  private org = inject(OrganizationService);
  private memberId: string | null = null;
  private params!: ICellRendererParams;
  
  onRemove() {
    const user = this.auth.user();
    if (!user?.organization || !this.memberId) {
      throw new Error('Invalid');
    }

    this.org.removeMember(user.organization.id, this.memberId).subscribe();
  }
  
  agInit(params: any): void {
    this.params = params;
    this.memberId = params.memberId;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }
}
