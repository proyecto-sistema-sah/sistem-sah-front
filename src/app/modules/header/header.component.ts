import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoCuarto } from '@sharedModule/models/ITipoCuarto';
import { IResponse } from '@sharedModule/models/Response';
import { AuthService } from '@sharedModule/service/auth.service';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { TipoCuartoService } from '@sharedModule/service/tipoCuarto.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corregido typo en 'styleUrl'
})
export class HeaderComponent implements OnInit {
  // Inputs para datos del usuario
  @Input() public url: string = '';
  @Input() public nombreCompleto: string = '';

  // URL del logo
  public urlLogo: string = '';

  // Estado del menú desplegable
  public isDropdownOpen: boolean = false;

  // Lista de tipos de cuarto
  public listTipoCuarto: TipoCuarto[] = [];

  constructor(
    private router: Router,
    private blobStorage: BlobStorageService,
    private authService: AuthService,
    private subject: SubjectService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private tipoCuartoService: TipoCuartoService
  ) {}

  ngOnInit(): void {
    // Configurar el logo y cargar los datos iniciales
    this.urlLogo = this.blobStorage.getBlobUrl('logo.png');
    this.loadData();
  }

  /**
   * Cambia la vista al tipo de cuarto seleccionado y actualiza el estado.
   * 
   * @param path Ruta a navegar.
   * @param idTipoCuarto Identificador del tipo de cuarto.
   */
  cambiarTipoCuarto(path: string, idTipoCuarto: number): void {
    this.subject.setValue(String(idTipoCuarto));
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([path]);
    });
  }

  /**
   * Carga los tipos de cuarto disponibles desde el servicio.
   */
  private loadData(): void {
    this.spinner.show();
    this.tipoCuartoService.getAllTipoCuarto()
      .pipe(
        tap((data: IResponse) => {
          this.listTipoCuarto = data.data;
        }),
        catchError((err) => {
          console.error('Error:', err);
          this.utilitiesService.showErrorMessage(err.message);
          return of(null);
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  /**
   * Cierra sesión del usuario y redirige al login.
   */
  logout(): void {
    this.spinner.show();
    this.authService.logoutUser()
      .pipe(
        tap(() => {}),
        catchError((err) => {
          console.error('Error:', err);
          this.utilitiesService.showErrorMessage(err.message);
          return of(null);
        }),
        finalize(() => {
          sessionStorage.clear();
          this.spinner.hide().then(() => this.router.navigate(['/login']));
        })
      )
      .subscribe();
  }

  /**
   * Abre el menú desplegable.
   */
  openDropdown(): void {
    this.isDropdownOpen = true;
  }

  /**
   * Cierra el menú desplegable.
   */
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
