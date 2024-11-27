import { Component } from '@angular/core';
import { IServicio } from '@sharedModule/models/IServicio';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { ServiceSerive } from '@sharedModule/service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * Componente para mostrar los servicios del hotel.
 */
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
})
export class ServicioComponent {
  /** Lista completa de servicios disponibles */
  allServices: IServicio[] = [];
  /** Lista de servicios destacados */
  featuredServices: IServicio[] = [];
  /** Indica si se deben mostrar todos los servicios */
  showAllServices = false;

  constructor(
    private serviceService: ServiceSerive,
    private blobService: BlobStorageService,
    private spinner: NgxSpinnerService
  ) {}

  /**
   * Método de inicialización del componente.
   * Carga los servicios destacados al iniciar.
   */
  ngOnInit(): void {
    this.loadFeaturedServices();
  }

  /**
   * Carga los servicios destacados desde el servicio API.
   */
  loadFeaturedServices(): void {
    this.spinner.show();
    this.serviceService.getAllService().subscribe({
      next: (response) => {
        this.allServices = response.data as IServicio[];
        // Actualiza la URL de las imágenes con el servicio de Blob
        this.allServices.forEach(
          (service) => (service.codigoImagenServicio = this.blobService.getBlobUrl(service.codigoImagenServicio))
        );
        this.featuredServices = this.allServices.slice(0, 3); // Muestra solo los primeros 3
      },
      error: (err) => console.error('Error al cargar los servicios:', err),
      complete: () => this.spinner.hide(),
    });
  }

  /**
   * Muestra la lista completa de servicios.
   */
  loadAllServices(): void {
    this.showAllServices = true;
  }
}
