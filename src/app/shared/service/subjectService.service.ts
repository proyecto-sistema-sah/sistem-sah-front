import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  
  private datosNavegacionBase64Subject = new BehaviorSubject<string>('');

  constructor() {
    console.log('servicio subject');
  }

  setValueBase64(value: string) {
    this.datosNavegacionBase64Subject.next(value);
  }

  getValueBase64() {
    return this.datosNavegacionBase64Subject.asObservable();
  }

}
