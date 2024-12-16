import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFacturacion } from '@sharedModule/models/IFacturacion';
import { JwtData } from '@sharedModule/models/JwtData';
import { FacturacionService } from '@sharedModule/service/facturacion.service';
import { TranslationService } from '@sharedModule/service/TranslationService.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  /**
   * Lista de facturaciones del usuario.
   */
  facturaciones: IFacturacion[] = [];
  private languageSubscription!: Subscription;

  /**
   * Constructor que inyecta servicios necesarios.
   * @param facturacionService Servicio para consultar las facturaciones.
   * @param spinner Servicio para mostrar el spinner de carga.
   */
  constructor(
    private facturacionService: FacturacionService,
    private spinner: NgxSpinnerService,
                  private translation:TranslationService,
                  private translate: TranslateService,
                  private cdRef: ChangeDetectorRef // Para detectar cambios manualmente
  ) {
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.languageSubscription = this.translation.language$.subscribe(() => {
      this.updateTranslations(); // Actualizar textos dinámicamente
    });
    this.updateTranslations(); // Actualizar textos dinámicamente
    this.obtenerFacturaciones();
  }

  /**
   * Obtiene la lista de facturaciones del usuario autenticado.
   */
  obtenerFacturaciones(): void {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      console.error('No se encontró un token válido.');
      return;
    }

    const data: JwtData = jwtDecode(token);

    this.spinner.show();
    this.facturacionService.getConsultarFacturacionesUsuario(data.codigoUsuario).subscribe({
      next: (response) => {
        this.facturaciones = response.data;
      },
      error: (err) => {
        console.error('Error al consultar las facturaciones:', err);
      },
      complete: () => this.spinner.hide()
    });
  }

  /**
   * Descarga el archivo PDF de la facturación seleccionada.
   * @param url URL del PDF a descargar.
   * @param codigo Código de la facturación (usado como nombre del archivo).
   */
  descargarPdf(url: string, codigo: string): void {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = `factura_${codigo}.pdf`; // Nombre dinámico del archivo.
    a.click();
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
