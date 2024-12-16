import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@sharedModule/service/TranslationService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  currentLang: string = '';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.currentLang = this.translationService.getCurrentLanguage(); // Idioma inicial
  }

  onChangeLanguage(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    this.currentLang = lang;
    this.translationService.setLanguage(lang); // Cambia el idioma global
  }
}
