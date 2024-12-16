import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { CuartosDisponibles } from '@sharedModule/models/CuartosDisponibles';
import { Cuarto } from '@sharedModule/models/ICuarto';
import { JwtData } from '@sharedModule/models/JwtData';
import { ReservaCuarto } from '@sharedModule/models/ReservaCuarto';
import { IResponse } from '@sharedModule/models/Response';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { CuartoService } from '@sharedModule/service/cuarto.service';
import { ReservaService } from '@sharedModule/service/reserva.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { TranslationService } from '@sharedModule/service/TranslationService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-cuartos',
  templateUrl: './cuartos.component.html',
  styleUrls: ['./cuartos.component.css'],
})
export class CuartosComponent {
  cuartos: Cuarto[] = [];
  filteredCuartos: Cuarto[] = [];
  paginatedCuartos: Cuarto[] = [];
  pageSize: number = 8;

  minPrice: number = 0;
  maxPrice: number = 1000;
  selectedPrice: number = 1000;

  minDate: Date = new Date();
  startDate: Date | null = new Date();
  endDate: Date | null = new Date(new Date().setDate(new Date().getDate() + 1));
  private languageSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private cuartoService: CuartoService,
    private subject: SubjectService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private blobStorage: BlobStorageService,
    private reservaService: ReservaService,
    private translation: TranslationService,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef // Para detectar cambios manualmente
  ) {}

  ngOnInit(): void {
    this.languageSubscription = this.translation.language$.subscribe(() => {
      this.updateTranslations(); // Actualizar textos dinámicamente
    });
    this.updateTranslations(); // Actualizar textos dinámicamente
    this.loadAvailableRooms();
  }

  guardarReserva(codigoCuarto: string): void {
    const token = sessionStorage.getItem('userToken');
    if (!token) return;

    // Convertimos las fechas a solo la parte de día para evitar problemas con horas
    const start = new Date(this.startDate!);
    const end = new Date(this.endDate!);

    // Comparamos los días (el end debe ser al menos un día mayor que start)
    if (start >= end) {
      this.translate.get('rooms.error.endDateBeforeStart').subscribe((message) => {
        this.utilitiesService.showErrorMessage(message);
      });
      return;
    }

    const usuarioData: JwtData = jwtDecode(token);
    const reservaData: ReservaCuarto = {
      codigoCuarto,
      fechaInicioReserva: this.startDate,
      fechaFinReserva: this.endDate,
      codigoUsuarioDtoFk: {
        codigoUsuario: usuarioData.codigoUsuario,
      },
    };

    this.spinner.show();
    this.reservaService
      .postCrearReserva(reservaData)
      .pipe(
        tap(() => {
          this.translate.get('rooms.success.createReservation').subscribe((message) => {
            this.utilitiesService.showSucessMessage(message);
          });
          this.loadAvailableRooms(); // Refrescar la lista de cuartos disponibles
        }),
        catchError((error) => {
          console.error('Error al crear la reserva:', error);
          this.translate.get('rooms.error.createReservation').subscribe((message) => {
            this.utilitiesService.showErrorMessage(message);
          });
          return of(null);
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  loadAvailableRooms(): void {
    this.spinner.show();
    const subjectValue = this.subject.getValue();
    const idTipoCuarto = subjectValue ? Number(subjectValue) : 0;

    const request: CuartosDisponibles = {
      idTipoCuarto,
      fechaInicioReserva: this.startDate,
      fechaFinReserva: this.endDate,
    };

    this.cuartoService
      .getAllCuartos(request)
      .pipe(
        tap((response: IResponse) => {
          this.cuartos = response.data as Cuarto[];
          this.cuartos.forEach((cuarto) => {
            cuarto.codigoImagenCuarto = this.blobStorage.getBlobUrl(cuarto.codigoImagenCuarto);
          });
          this.setPriceRange();
          this.filterRooms();
        }),
        catchError((error) => {
          console.error('Error al cargar cuartos:', error);
          this.translate.get('rooms.error.loadRooms').subscribe((message) => {
            this.utilitiesService.showErrorMessage(message);
          });
          return of(null);
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  setPriceRange(): void {
    const prices = this.cuartos.map((cuarto) => cuarto.valorNocheCuarto);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.selectedPrice = this.maxPrice;
  }

  filterRooms(): void {
    this.filteredCuartos = this.cuartos.filter((cuarto) => cuarto.valorNocheCuarto <= this.selectedPrice);
    this.paginateRooms();
  }

  paginateRooms(event?: any): void {
    const startIndex = event ? event.pageIndex * event.pageSize : 0;
    const endIndex = startIndex + (event ? event.pageSize : this.pageSize);
    this.paginatedCuartos = this.filteredCuartos.slice(startIndex, endIndex);
  }

  private updateTranslations(): void {
    this.translate.use(this.translation.getCurrentLanguage());
    this.cdRef.detectChanges(); // Forzar la detección de cambios
  }

  ngOnDestroy(): void {
    // Cancelar suscripciones al destruir el componente
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
