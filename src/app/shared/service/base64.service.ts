import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { ISafeAny } from '@sharedModule/models/ISafeAny';

@Injectable({ providedIn: 'root' })
export class Base64Service {
     // Codifica un objeto en Base64
  objectoToBase64(objeto: ISafeAny): string {
    
    // Convierte el objeto a una cadena JSON
    const jsonString = JSON.stringify(objeto);
    // Convierte la cadena JSON a Buffer con codificación UTF-8
    const buffer = Buffer.from(jsonString, 'utf-8');
    // Convierte el Buffer a Base64
    const base64String = buffer.toString('base64');
    return base64String;
  }

  stringToBase64(cadena: string): string {
    // Convierte la cadena a Buffer con codificación UTF-8
    const buffer = Buffer.from(cadena, 'utf-8');
    // Convierte el Buffer a Base64
    const base64String = buffer.toString('base64');
    return base64String;
  }

  // Decodifica el Base64 a un string
  base64ToString(base64String: string): string {
    // Convierte la cadena Base64 a una cadena JSON
    const string = Buffer.from(base64String, 'base64').toString('utf-8');
    return string;
  }

  // Decodifica el Base64 a un objeto
  base64ToObject(base64String: string): ISafeAny {
    // Convierte la cadena Base64 a una cadena JSON
    const jsonString = Buffer.from(base64String, 'base64').toString('utf-8');
    // Parsea la cadena JSON a un objeto
    const obj = JSON.parse(jsonString);
    return obj;
  }
}