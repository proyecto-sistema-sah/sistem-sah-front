import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { cambiarEstadoReserva } from '@sharedModule/models/CambiarEstadoReserva';
import { JwtData } from '@sharedModule/models/JwtData';
import { ReservaCuarto } from '@sharedModule/models/ReservaCuarto';
import { IResponse } from '@sharedModule/models/Response';
import { ReservaService } from '@sharedModule/service/reserva.service';
import { TranslationService } from '@sharedModule/service/TranslationService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = [
    'codigoReserva',
    'fechaInicioReserva',
    'fechaFinReserva',
    'valorTotalReserva',
    'estadoReservaDtoFk',
    'acciones'
  ];
  private languageSubscription!: Subscription;

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<ReservaCuarto>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reservaService: ReservaService,
    private spinner: NgxSpinnerService,
    private utilidades: UtilitiesService,
    private translation: TranslationService,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef // Para detectar cambios manualmente
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.languageSubscription = this.translation.language$.subscribe(() => {
      this.updateTranslations(); // Actualizar textos dinámicamente
    });
    this.updateTranslations(); // Actualizar textos dinámicamente
    this.fetchReservas();
  }

  /**
   * Cambia el estado de una reserva específica.
   * @param codigoReserva Código de la reserva a actualizar.
   * @param estadoNuevo Nuevo estado de la reserva.
   */
  public cambiarEstadoReserva(codigoReserva: string, estadoNuevo: string): void {
    const estadoFacturacion = estadoNuevo === 'COMPLETADO' ? 'PAGADO' : 'CANCELADO';

    const data: cambiarEstadoReserva = {
      codigoReserva,
      estadoNuevo,
      estadoFacturacion
    };

    this.spinner.show();

    this.reservaService
      .cambiarEstadoReserva(data)
      .pipe(
        tap((response: IResponse) => {
          this.translate.get('purchases.success.stateChanged').subscribe((message) => {
            this.utilidades.showSucessMessage(message);
          });
          this.fetchReservas(); // Actualiza la tabla tras el cambio
        }),
        catchError((err) => {
          console.error('Error al cambiar estado de la reserva:', err);
          this.translate.get('purchases.error.stateChange').subscribe((message) => {
            this.utilidades.showErrorMessage(message);
          });
          return of(null);
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  /**
   * Obtiene las reservas del usuario desde el servicio y actualiza la tabla.
   */
  private fetchReservas(): void {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
      this.translate.get('purchases.error.missingToken').subscribe((message) => {
        this.utilidades.showErrorMessage(message);
      });
      return;
    }

    const { codigoUsuario }: JwtData = jwtDecode(token);

    if (!codigoUsuario) {
      this.translate.get('purchases.error.invalidUser').subscribe((message) => {
        this.utilidades.showErrorMessage(message);
      });
      return;
    }

    this.spinner.show();

    this.reservaService
      .getReservasUsuario(codigoUsuario)
      .pipe(
        tap((response: IResponse) => {
          this.dataSource.data = response.data as ReservaCuarto[];
        }),
        catchError((err) => {
          console.error('Error al obtener reservas:', err);
          this.translate.get('purchases.error.reservationsLoad').subscribe((message) => {
            this.utilidades.showErrorMessage(message);
          });
          return of(null);
        }),
        finalize(() => {
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        })
      )
      .subscribe();
  }

  /**
   * Actualiza las traducciones dinámicamente cuando cambia el idioma.
   */
  private updateTranslations(): void {
    this.translate.use(this.translation.getCurrentLanguage());
    this.cdRef.detectChanges(); // Forzar la detección de cambios
  }

  /**
   * Método que se ejecuta al destruir el componente para liberar recursos.
   */
  ngOnDestroy(): void {
    // Cancelar suscripciones al destruir el componente
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
