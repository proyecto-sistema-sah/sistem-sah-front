import { AbstractControl } from "@angular/forms";

export function emailValidator({ value }: AbstractControl) {
    const emailUnicode =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
    return !emailUnicode.test(value) ? { email: true } : null;
  }

export function strongPassword({value} : AbstractControl){
  return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? { lowPassword: true } : null;
}