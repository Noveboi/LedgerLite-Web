import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms"
import { SlimAccount } from "../../accounts/accounts.types"
import { filter, map, Observable } from "rxjs";

export class EntryValidators {
    static onlyExistingAccounts(accounts$: Observable<SlimAccount[]>): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => accounts$.pipe(
            map(accounts => {
                const value = control.value;
                if (value && 'id' in value && 'name' in value && accounts.includes(value)) {
                    return null;
                }

                return { account: true }
            })
        )
    } 
}