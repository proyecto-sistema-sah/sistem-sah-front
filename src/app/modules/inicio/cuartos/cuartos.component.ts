import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CuartosDisponibles } from '@sharedModule/models/CuartosDisponibles';
import { Cuarto } from '@sharedModule/models/ICuarto';
import { JwtData } from '@sharedModule/models/JwtData';
import { ReservaCuarto } from '@sharedModule/models/ReservaCuarto';
import { IResponse } from '@sharedModule/models/Response';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { CuartoService } from '@sharedModule/service/cuarto.service';
import { ReservaService } from '@sharedModule/service/reserva.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

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

  minDate: Date = new Date(); // Fecha mínima: Hoy
  startDate: Date | null = new Date(); // Fecha inicial seleccionada
  endDate: Date | null = new Date(new Date().setDate(new Date().getDate() + 1)); // Fecha final seleccionada

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private cuartoService: CuartoService,
    private subject:SubjectService,
    private spinner: NgxSpinnerService,
    private blobStorage: BlobStorageService,
    private reservaService:ReservaService
  ) {}

  ngOnInit(): void {
    this.searchRooms();
  }

  guardarReserva(codigoCuarto:string){
    const token = sessionStorage.getItem("userToken")
    let codigoUsuario:JwtData = new JwtData()
    console.log(token)
    if(token){
      console.log(jwtDecode(token))
      codigoUsuario = jwtDecode(token)
    }
    const data:ReservaCuarto = {
      codigoCuarto: codigoCuarto,
      fechaInicioReserva: this.startDate,
      fechaFinReserva: this.endDate,
      codigoUsuarioDtoFk: {
        codigoUsuario: codigoUsuario.codigoUsuario
      },
    }
    this.spinner.show()
    this.reservaService.postCrearReserva(data).pipe(
      tap((response: IResponse) => {
      }),
      catchError((err) => {
        console.error('Error:', err);
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    ).subscribe();
  }

  // Método que realiza la búsqueda de cuartos
  searchRooms() {
    this.spinner.show();
    const textoSubject = this.subject.getValue()
    let idTipoCuarto = 0;
    if(textoSubject){
      idTipoCuarto = Number(textoSubject)
    }
    const cuartosDisponible: CuartosDisponibles = {
      idTipoCuarto: idTipoCuarto, // Actualiza según el filtro necesario
      fechaInicioReserva: this.startDate,
      fechaFinReserva: this.endDate,
    };

    this.cuartoService.getAllCuartos(cuartosDisponible).pipe(
      tap((response: IResponse) => {
        this.cuartos = response.data as Cuarto[];
        this.cuartos.forEach((cuarto) => {
          cuarto.codigoImagenCuarto = this.blobStorage.getBlobUrl(cuarto.codigoImagenCuarto);
        });
        this.setPriceRange();
        this.applyFilters(); // Aplica el filtro de precios
      }),
      catchError((err) => {
        console.error('Error:', err);
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    ).subscribe();
  }

  // Configura el rango de precios
  setPriceRange() {
    const prices = this.cuartos.map((cuarto) => cuarto.valorNocheCuarto);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.selectedPrice = this.maxPrice; // Inicializa al máximo
  }

  // Aplica los filtros de precio
  applyFilters() {
    this.filteredCuartos = this.cuartos.filter((cuarto) => cuarto.valorNocheCuarto <= this.selectedPrice);
    this.updatePaginatedCuartos();
  }

  // Actualiza los cuartos paginados
  updatePaginatedCuartos(event?: any) {
    const startIndex = event ? event.pageIndex * event.pageSize : 0;
    const endIndex = startIndex + (event ? event.pageSize : this.pageSize);
    this.paginatedCuartos = this.filteredCuartos.slice(startIndex, endIndex);
  }
}
