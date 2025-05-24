import { ChartAccountNode } from '../../accounts.types';
import {Component, inject, TrackByFunction} from '@angular/core';
import {MatTreeModule, MatTreeNodePadding} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';
import { map } from 'rxjs';
import { CreateAccountButtonComponent } from "../create-account-button/create-account-button.component";
import { AccountButtonGroupComponent } from "../account-button-group/account-button-group.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule, CreateAccountButtonComponent, MatTreeNodePadding, AccountButtonGroupComponent, RouterLink],
  templateUrl: './account-tree.component.html',
  styleUrl: './account-tree.component.scss'
})
export class AccountTreeComponent {
  private accountService = inject(ChartOfAccountsService);

  childrenAccessor = (node: ChartAccountNode) => node.children ?? [];
  hasChild = (_: number, node: ChartAccountNode) => !!node.children && node.children.length > 0;
  trackByFn: TrackByFunction<ChartAccountNode> = (_: number, item: ChartAccountNode) => item.account.id;
  stopClickPropagation = (e: MouseEvent) => e.stopPropagation();
   
  indentPixels = 15;

  dataSource = this.accountService.chart$.pipe(
    map(chart => chart.accounts)
  )
}