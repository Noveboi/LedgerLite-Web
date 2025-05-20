import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiError } from '../../../types/error.types';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private snackbar = inject(MatSnackBar)

  handleError(error: unknown): void {
    console.log(error)

    if (error instanceof HttpErrorResponse) {
      if ('detail' in error.error) {
        this.showMessage(this.cleanDetail(error.error.detail))
      } else {
        this.showMessage(error.message)
      }
    }
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
