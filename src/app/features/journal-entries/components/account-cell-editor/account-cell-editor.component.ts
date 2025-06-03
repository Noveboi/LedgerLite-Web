import { AfterViewInit, Component, inject, Signal, signal, viewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { ChartOfAccountsService } from '../../../accounts/services/chart-of-accounts.service';
import { SlimAccount } from '../../../accounts/accounts.types';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-account-cell-editor',
  imports: [MatSelectModule, ReactiveFormsModule, AsyncPipe, MatOptionModule],
  templateUrl: './account-cell-editor.component.html',
  styleUrl: './account-cell-editor.component.css'
})
export class AccountCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  private params!: ICellEditorParams<any, any, any>;
  private accounts = inject(ChartOfAccountsService);
  private container = viewChild('container', { read: ViewContainerRef });
  protected selected = signal<SlimAccount | null>(null);


  protected accounts$ = this.accounts.allAccounts$.pipe(
    map(accounts => accounts.filter(x => x.id !== this.accounts.selectedAccount()?.account.id))
  )

  protected compareFn = (x: SlimAccount, y: SlimAccount) => x?.id === y?.id

  agInit(params: any): void {
    this.params = params;
    this.selected.set(params.selectedAccount);
  }

  getValue() {
    return this.selected();
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => this.container()?.element.nativeElement.focus())
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.params.onKeyDown(e);
      e.stopPropagation()
    }
  }
}
