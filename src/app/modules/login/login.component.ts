import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../common/helpers/validators/formats.validators';
import { ErrorHandlerService } from '../../shared/service/errorHandler.service';
import { ILogin } from '../../shared/models/Login';
import { AuthService } from '../../shared/service/auth.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { Base64Service } from '@sharedModule/service/base64.service';
import { JwtData } from '@sharedModule/models/JwtData';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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

  constructor(
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService,
    private authService: AuthService,
    private base64Service: Base64Service,
    private subjectService: SubjectService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

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
    let error = false
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
          this.utilitiesService.showErrorMessage(err.message);
          this.spinner.hide();
          error = true
          return of(null);
        }),
        finalize(() => {
          if(error == false){
            this.spinner.hide().then(() => {
              this.utilitiesService.showSucessMessage('Inicio de sesión exitoso', 'inicio-sesion', 'Aceptar').then(() => {
                this.router.navigate(['/inicio']);
              });
            });
          }
        })
      )
      .subscribe();
  }
}
