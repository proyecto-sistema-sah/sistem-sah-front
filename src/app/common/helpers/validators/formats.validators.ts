import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidator({ value }: AbstractControl) {
    const emailUnicode =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
    return !emailUnicode.test(value) ? { email: true } : null;
  }

  export function strongPassword({ value }: AbstractControl) {
    const strongPasswordUnicode = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&\W]{8,}$/i;
    return !strongPasswordUnicode.test(value) ? { lowPassword: true } : null;
  }
  

  export function sizeFileSelect(control: AbstractControl): ValidationErrors | null {
    const file = control.value as File;
    
    if (file) {
      const maxSizeInBytes = 2; // 2MB
      const mbImage = file.size / (1024*1024)
      if (mbImage > maxSizeInBytes) {
        return { fileSizeTooLarge: true };
      }
    }
    return null; // No hay error si el archivo es válido o si no hay archivo
  }