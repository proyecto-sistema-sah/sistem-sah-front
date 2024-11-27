import { Component } from '@angular/core';

/**
 * Componente principal de la página de inicio.
 * Contiene un carrusel de imágenes y una sección introductoria con texto y botones.
 */
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  /**
   * Lista de URLs de las imágenes del carrusel.
   * Cada imagen representa una sección destacada del sistema.
   */
  images: string[] = [
    'https://imagenesmf.blob.core.windows.net/imagenes/paisaje.jpg',
    'https://imagenesmf.blob.core.windows.net/imagenes/piscinas.jpg',
    'https://imagenesmf.blob.core.windows.net/imagenes/restaurantes.jpg',
    'https://imagenesmf.blob.core.windows.net/imagenes/hoteles.jpg'
  ];
}
