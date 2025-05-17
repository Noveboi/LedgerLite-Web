import { ChartAccountNode, ChartOfAccounts, SlimAccount } from '../../accounts.types';
import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-account-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './account-tree.component.html',
  styleUrl: './account-tree.component.css'
})
export class AccountTreeComponent {
  private accountService = inject(ChartOfAccountsService);

  childrenAccessor = (node: ChartAccountNode) => node.children ?? [];
  hasChild = (_: number, node: ChartAccountNode) => !!node.children && node.children.length > 0;
  
  dataSource = this.accountService
    .getChartOfAccounts()
    .pipe(
      map((chart) => chart.accounts)
    )
}