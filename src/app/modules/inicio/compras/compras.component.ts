import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cambiarEstadoReserva } from '@sharedModule/models/CambiarEstadoReserva';
import { JwtData } from '@sharedModule/models/JwtData';
import { ReservaCuarto } from '@sharedModule/models/ReservaCuarto';
import { IResponse } from '@sharedModule/models/Response';
import { ReservaService } from '@sharedModule/service/reserva.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

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

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<ReservaCuarto>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reservaService: ReservaService,
    private spinner: NgxSpinnerService,
    private utilidades: UtilitiesService
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
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

    this.reservaService.cambiarEstadoReserva(data).pipe(
      tap((response: IResponse) => {
        this.utilidades.showSucessMessage(response.message);
        this.fetchReservas(); // Actualiza la tabla tras el cambio
      }),
      catchError((err) => {
        console.error('Error al cambiar estado de la reserva:', err);
        this.utilidades.showErrorMessage('Ocurrió un error al cambiar el estado.');
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    ).subscribe();
  }

  /**
   * Obtiene las reservas del usuario desde el servicio y actualiza la tabla.
   */
  private fetchReservas(): void {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
      this.utilidades.showErrorMessage('Token no encontrado. Inicia sesión nuevamente.');
      return;
    }

    const { codigoUsuario }: JwtData = jwtDecode(token);

    if (!codigoUsuario) {
      this.utilidades.showErrorMessage('Usuario no válido.');
      return;
    }

    this.spinner.show();

    this.reservaService.getReservasUsuario(codigoUsuario).pipe(
      tap((response: IResponse) => {
        this.dataSource.data = response.data as ReservaCuarto[];
      }),
      catchError((err) => {
        console.error('Error al obtener reservas:', err);
        this.utilidades.showErrorMessage('Ocurrió un error al cargar las reservas.');
        return of(null);
      }),
      finalize(() => {
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
      })
    ).subscribe();
  }
}
