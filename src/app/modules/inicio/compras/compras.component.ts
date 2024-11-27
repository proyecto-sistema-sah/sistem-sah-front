import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtData } from '@sharedModule/models/JwtData';
import { ReservaCuarto } from '@sharedModule/models/ReservaCuarto';
import { IResponse } from '@sharedModule/models/Response';
import { ReservaService } from '@sharedModule/service/reserva.service';
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
    'estadoReservaDtoFk'
  ];

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<ReservaCuarto>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reservaService: ReservaService,
    private spinner: NgxSpinnerService
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.fetchReservas();
  }

  /**
   * Obtiene las reservas del usuario desde el servicio.
   */
  private fetchReservas(): void {
    this.spinner.show();
    const token = sessionStorage.getItem('userToken');

    let codigoUsuario: JwtData = new JwtData();
    if (token) {
      codigoUsuario = jwtDecode(token);
    }

    this.reservaService
      .getReservasUsuario(codigoUsuario.codigoUsuario)
      .pipe(
        tap((response: IResponse) => {
          this.dataSource.data = response.data as ReservaCuarto[];
        }),
        catchError((err) => {
          console.error('Error al obtener reservas:', err);
          return of(null);
        }),
        finalize(() => {
          // Configurar el paginador una vez cargados los datos
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        })
      )
      .subscribe();
  }
}
