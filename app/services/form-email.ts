import { Directive, Attribute, forwardRef, Host } from '@angular/core';
import {NG_VALIDATORS, FormControl, NgForm} from '@angular/forms';


// Check two forms
function validateEmail() {
  return (c: FormControl) => {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  };
}

@Directive({
    selector: '[email-field]',
    providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }]
})

export class EmailValidator {

    validator: Function;

    constructor() {
        this.validator = validateEmail();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

};