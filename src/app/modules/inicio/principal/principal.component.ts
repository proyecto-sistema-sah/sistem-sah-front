import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '@sharedModule/service/TranslationService.service';
import { Subscription } from 'rxjs';

/**
 * Componente principal de la página de inicio.
 * Contiene un carrusel de imágenes y una sección introductoria con texto y botones.
 */
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  private languageSubscription!: Subscription;
  
    constructor(
      private translation:TranslationService,
      private translate: TranslateService,
      private cdRef: ChangeDetectorRef // Para detectar cambios manualmente
    ) {
    }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.languageSubscription = this.translation.language$.subscribe(() => {
      this.updateTranslations(); // Actualizar textos dinámicamente
    });
    this.updateTranslations(); // Actualizar textos dinámicamente
  }  
  
  /**
   * Lista de URLs de las imágenes del carrusel.
   * Cada imagen representa una sección destacada del sistema.
   */
  images: string[] = [
    'https://imagenesmf.blob.core.windows.net/imagenes/paisaje.jpg',
    'https://imagenesmf.blob.core.windows.net/imagenes/piscinas.jpg',
    'https://imagenesmf.blob.core.windows.net/imagenes/restaurantes.jpg',
    'https://imagenesmf.blob.core.windows.net/imagenes/hoteles.jpg'
  ];

  getSlideLabel(index: number): string {
    return `${this.translate.instant('CARRUSEL.SLIDE')} ${index + 1}`;
  }
  private updateTranslations(): void {
    this.translate.use(this.translation.getCurrentLanguage())
    this.cdRef.detectChanges(); // Forzar la detección de cambios
  }

  ngOnDestroy(): void {
    // Cancelar suscripciones al destruir el componente
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
