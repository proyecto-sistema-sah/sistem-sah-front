import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../common/helpers/validators/formats.validators';
import { ErrorHandlerService } from '../../shared/service/errorHandler.service';
import { ILogin } from '../../shared/models/Login';
import { AuthService } from '../../shared/service/auth.service';
import { catchError, finalize, of, Subscription, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { Base64Service } from '@sharedModule/service/base64.service';
import { JwtData } from '@sharedModule/models/JwtData';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TranslationService } from '@sharedModule/service/TranslationService.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Componente que maneja el inicio de sesión.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  /** Control de visibilidad de la contraseña */
  public hide = true;
  /** Formulario de inicio de sesión */
  public formLogin!: FormGroup;
  loginTitle: string = '';
  private languageSubscription!: Subscription;
  
  constructor(
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService,
    private authService: AuthService,
    private base64Service: Base64Service,
    private subjectService: SubjectService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private translation:TranslationService,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef // Para detectar cambios manualmente
  ) {
  }

  /**
   * Navega a la página de registro.
   */
  onRegisterUser(): void {
    this.router.navigate(['/registrar']);
  }

  /**
   * Inicialización del componente.
   */
  ngOnInit(): void {
    this.buildFormLogin();
    // Suscribirse al cambio de idioma
    this.languageSubscription = this.translation.language$.subscribe({
      next:(value) =>{
        this.updateTranslations(); // Actualizar textos dinámicamente
      },
      complete: () => {
        this.spinner.hide()
      }
    });

  }

  /**
   * Construye el formulario de inicio de sesión con validaciones.
   */
  private buildFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      correoUsuario: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.email,
        emailValidator
      ]),
      contrasenaUsuario: new FormControl('', [
        Validators.required
      ])
    });
  }

  /**
   * Maneja el inicio de sesión al enviar el formulario.
   * @param valid Estado de validez del formulario
   */
  public loginUser({ valid }: { valid: boolean }): void {
    if (!valid) {
      this.formLogin.markAllAsTouched();
      return;
    }
  
    const { correoUsuario, contrasenaUsuario } = this.formLogin.value;
    const objectUsuario: ILogin = {
      email: correoUsuario,
      contrasena: contrasenaUsuario
    };
  
    sessionStorage.removeItem('userToken');
    this.spinner.show();
    let error = false;
    this.authService
      .loginUser(objectUsuario)
      .pipe(
        tap((data) => {
          const cliente: JwtData = jwtDecode(data.data['token']);
          const obj64 = this.base64Service.objectoToBase64(cliente);
          this.subjectService.setValueBase64(obj64);
        }),
        catchError((err) => {
          console.error('Error:', err);
          this.translate.get('login.error').subscribe((errorText) => {
            this.utilitiesService.showErrorMessage(errorText.message);
          });
          this.spinner.hide();
          error = true;
          return of(null);
        }),
        finalize(() => {
          if (error === false) {
            this.spinner.hide().then(() => {
              this.translate.get('login.success').subscribe((successText) => {
                this.utilitiesService
                  .showSucessMessage(successText.title, 'inicio-sesion', successText.button)
                  .then(() => {
                    this.router.navigate(['/inicio']);
                  });
              });
            });
          }
        })
      )
      .subscribe();
  }

  private updateTranslations(): void {
    this.translate.use(this.translation.getCurrentLanguage())
    this.cdRef.detectChanges(); // Forzar la detección de cambios
  }

  ngOnDestroy(): void {
    // Cancelar suscripciones al destruir el componente
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
