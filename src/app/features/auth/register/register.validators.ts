import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class RegisterValidators {
    static confirmPassword(control: AbstractControl): ValidationErrors | null {
        if (!(control instanceof FormGroup)) {
            console.log('not group', control);
            return null;
        }

        const passwordControl = control.get('password');
        const confirmPasswordControl = control.get('confirmPassword');

        if (!passwordControl || !confirmPasswordControl) {
            console.log('no password or forgot password', control);
            return null;
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
            return { confirmPassword: true };
        }

        return null;
    }
}