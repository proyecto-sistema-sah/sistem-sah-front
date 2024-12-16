import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAlimentos } from '@sharedModule/models/IAlimentos';
import { AlimentoService } from '@sharedModule/service/alimento.service';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { TranslationService } from '@sharedModule/service/TranslationService.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gastronomia',
  templateUrl: './gastronomia.component.html',
  styleUrls: ['./gastronomia.component.css']
})
export class GastronomiaComponent implements OnInit {
  /**
   * Lista completa de alimentos.
   */
  allAlimentos: IAlimentos[] = [];

  /**
   * Alimentos destacados a mostrar inicialmente.
   */
  featuredAlimentos: IAlimentos[] = [];

  /**
   * Estado que controla si se muestran todos los alimentos.
   */
  showAllAlimentos = false;
  private languageSubscription!: Subscription;

  constructor(
    private alimentoService: AlimentoService,
    private blobService: BlobStorageService,
    private spinner: NgxSpinnerService,
              private translation:TranslationService,
              private translate: TranslateService,
              private cdRef: ChangeDetectorRef // Para detectar cambios manualmente
  ) {
  }

  ngOnInit(): void {
    this.languageSubscription = this.translation.language$.subscribe(() => {
      this.updateTranslations(); // Actualizar textos dinámicamente
    });
    this.updateTranslations(); // Actualizar textos dinámicamente
    this.loadFeaturedAlimentos();
  }

  /**
   * Carga los alimentos destacados desde el servicio.
   */
  loadFeaturedAlimentos(): void {
    this.spinner.show();
    this.alimentoService.getAllAlimentos().subscribe({
      next: (response) => {
        this.allAlimentos = response.data as IAlimentos[];
        this.allAlimentos.forEach((alimento) => {
          alimento.codigoImagen = this.blobService.getBlobUrl(alimento.codigoImagen);
        });
        this.featuredAlimentos = this.allAlimentos.slice(0, 3); // Mostrar los primeros 3 alimentos
      },
      error: (err) => {
        console.error('Error al cargar los alimentos:', err);
      },
      complete: () => this.spinner.hide()
    });
  }

  /**
   * Activa la visualización de todos los alimentos.
   */
  loadAllAlimentos(): void {
    this.showAllAlimentos = true;
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
