import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private languageSubject = new BehaviorSubject<string>('es');
  language$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {
    const browserLang = localStorage.getItem('appLanguage') || this.translate.getBrowserLang()!;
    const defaultLang = browserLang.match(/es|en/) ? browserLang : 'es';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.languageSubject.next(defaultLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('appLanguage', lang);
    this.languageSubject.next(lang); // Emite el nuevo idioma
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.defaultLang;
  }
}
