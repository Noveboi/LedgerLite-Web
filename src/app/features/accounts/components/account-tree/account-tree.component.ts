import { ChartAccountNode } from '../../accounts.types';
import {Component, inject, TrackByFunction, viewChild} from '@angular/core';
import {MatTree, MatTreeModule, MatTreeNodePadding} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';
import { map } from 'rxjs';
import { CreateAccountButtonComponent } from "../create-account-button/create-account-button.component";
import { RouterLink } from '@angular/router';
import { AccountMenuComponent } from "../account-menu/account-menu.component";
import { PermissionsService } from '../../../../core/permissions/permissions.service';

@Component({
  selector: 'app-account-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule, CreateAccountButtonComponent, MatTreeNodePadding, RouterLink, AccountMenuComponent],
  templateUrl: './account-tree.component.html',
  styleUrl: './account-tree.component.scss'
})
export class AccountTreeComponent {
  private accountService = inject(ChartOfAccountsService);
  private perms = inject(PermissionsService);
  private tree = viewChild<MatTree<ChartAccountNode, string>>('tree');

  childrenAccessor = (node: ChartAccountNode) => node.children ?? [];
  hasChild = (_: number, node: ChartAccountNode) => !!node.children && node.children.length > 0;
  stopClickPropagation = (e: MouseEvent) => e.stopPropagation();
  canModify = () => this.perms.isAllowedToModify();
   
  indentPixels = 15;

  dataSource = this.accountService.chart$.pipe(
    map(chart => chart.accounts)
  )
}