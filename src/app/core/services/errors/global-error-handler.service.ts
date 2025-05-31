import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidationError } from '../../../types/error.types';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private snackbar = inject(MatSnackBar)

  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse && error.error) {
      if ('detail' in error.error) {
        this.showMessage(this.cleanDetail(error.error.detail))
      } else if (Array.isArray(error.error))  {
        const errors: any[] = error.error;
        if (errors.length === 0)
          return;

        const firstError = errors[0];
        if ('errorMessage' in firstError) {
          this.showMessages((errors as ValidationError[]).map(err => err.errorMessage));
        } else {
          this.showMessage(error.message)
        }
      } else {
        this.showMessage(error.message)
      }
    }
  }

  private showMessages(messages: readonly string[]) {
    messages.forEach(message => this.showMessage(message));
  }

  private showMessage(message: string) {
    this.snackbar.open(
      message,
      'Close',
      {
        duration: 5000
      }
    )
  }

  private cleanDetail(detail: unknown) {
    if (typeof detail === 'string') {
      return detail
        .replace('Next error(s) occurred:* ', '')
        .replace('\n', '')
    } else {
      return 'An unknown error occured'
    }
  }
}
