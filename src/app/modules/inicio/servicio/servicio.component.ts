import { Component } from '@angular/core';
import { IServicio } from '@sharedModule/models/IServicio';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { ServiceSerive } from '@sharedModule/service/service.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.css'
})
export class ServicioComponent {
  allServices: IServicio[] = []; // Lista completa de servicios
  featuredServices: IServicio[] = []; // Servicios destacados
  showAllServices = false; // Estado para mostrar todos los servicios

  constructor(private serviceService: ServiceSerive, private blobService:BlobStorageService) {}

  ngOnInit(): void {
    this.loadFeaturedServices();
  }

  // Cargar servicios destacados
  loadFeaturedServices(): void {
    this.serviceService.getAllService().subscribe({
      next: (response) => {
        this.allServices = response.data as IServicio[];
        for(const service of this.allServices){
          service.codigoImagenServicio = this.blobService.getBlobUrl(service.codigoImagenServicio)
        }
        this.featuredServices = this.allServices.slice(0, 3); // Mostrar solo los primeros 3
      },
      error: (err) => console.error('Error al cargar los servicios:', err),
    });
  }

  // Mostrar todos los servicios
  loadAllServices(): void {
    this.showAllServices = true;
  }
}
