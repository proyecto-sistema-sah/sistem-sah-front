import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtData } from '@sharedModule/models/JwtData';
import { Base64Service } from '@sharedModule/service/base64.service';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

/**
 * Componente principal de la sección "Inicio".
 * Gestiona la obtención de datos del usuario, como nombre y foto, y los transmite al componente `Header`.
 */
@Component({
  selector: 'app-inicio',
  template: `
    <!-- Header Component -->
    <app-header [url]="urlImg" [nombreCompleto]="nombreCompleto"></app-header>
    <router-outlet></router-outlet>
  `,
})
export class InicioComponent implements OnInit {
  /** URL de la imagen del usuario */
  public urlImg: string = '';
  /** Nombre completo del usuario */
  public nombreCompleto: string = '';

  constructor(
    private subjectService: SubjectService,
    private blobStorage: BlobStorageService,
    private utilitiesService: UtilitiesService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private base64: Base64Service
  ) {}

  /**
   * Método de inicialización del componente.
   * Obtiene datos del usuario autenticado a través de un token codificado en base64.
   */
  ngOnInit(): void {
    this.subjectService
      .getValueBase64()
      .pipe(
        tap((data) => {
          const response: JwtData = this.base64.base64ToObject(data);
          this.urlImg = this.blobStorage.getBlobUrl(response.foto);
          this.nombreCompleto = response.nombreCompleto;
        }),
        catchError((err) => {
          console.error('Error:', err);
          this.utilitiesService.showErrorMessage(err.message).then(() => {
            this.router.navigate(['/login']);
            this.spinner.hide();
          });
          return of(null);
        }),
        finalize(() => this.spinner.hide()) // Oculta el spinner al finalizar
      )
      .subscribe();
  }
}
