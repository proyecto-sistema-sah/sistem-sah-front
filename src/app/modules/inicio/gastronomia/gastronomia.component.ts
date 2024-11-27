import { Component } from '@angular/core';
import { IAlimentos } from '@sharedModule/models/IAlimentos';
import { AlimentoService } from '@sharedModule/service/alimento.service';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';

@Component({
  selector: 'app-gastronomia',
  templateUrl: './gastronomia.component.html',
  styleUrl: './gastronomia.component.css'
})
export class GastronomiaComponent {
  allAlimentos: IAlimentos[] = []; // Lista completa de alimentos
  featuredAlimentos: IAlimentos[] = []; // Alimentos destacados
  showAllAlimentos = false; // Estado para mostrar todos los alimentos

  constructor(private alimentoService: AlimentoService, private blobService:BlobStorageService) {}

  ngOnInit(): void {
    this.loadFeaturedAlimentos();
  }

  // Cargar alimentos destacados
  loadFeaturedAlimentos(): void {
    this.alimentoService.getAllAlimentos().subscribe({
      next: (response) => {
        this.allAlimentos = response.data as IAlimentos[];
        for(const alimento of this.allAlimentos){
          alimento.codigoImagen = this.blobService.getBlobUrl(alimento.codigoImagen)
        }
        this.featuredAlimentos = this.allAlimentos.slice(0, 3); // Mostrar solo los primeros 3
      },
      error: (err) => console.error('Error al cargar los alimentos:', err),
    });
  }

  // Mostrar todos los alimentos
  loadAllAlimentos(): void {
    this.showAllAlimentos = true;
  }
}
