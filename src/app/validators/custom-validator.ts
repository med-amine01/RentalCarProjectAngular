import {FormControl, ValidationErrors} from "@angular/forms";

export class CustomValidator {

  static notBlank(control:FormControl):ValidationErrors{
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? { 'notBlank': true } : { 'notBlank': false };

  }
}
