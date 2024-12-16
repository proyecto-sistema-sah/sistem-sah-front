import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {}

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang); // Guardar en almacenamiento local
  }

  getLanguage(): string {
    return localStorage.getItem('language') || 'es';
  }

  initLanguage() {
    const lang = this.getLanguage();
    this.translate.use(lang);
  }
}
