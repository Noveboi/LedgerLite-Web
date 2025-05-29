import { AbstractControl, ValidationErrors } from "@angular/forms"
import { SlimAccount } from "../../accounts/accounts.types"

export class EntryValidators {
    static onlyExistingAccounts(accounts: readonly SlimAccount[]) {
        return (control: AbstractControl): ValidationErrors | null => { 
            const value = control.value;

            if (value && 'id' in value && 'name' in value && accounts.includes(value)) {
                return null;
            }

            return { account: 'Invalid account'}
        }
    } 
}