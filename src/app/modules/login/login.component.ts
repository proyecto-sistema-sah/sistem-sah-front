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
import {jwtDecode, JwtPayload} from 'jwt-decode'
import { JwtData } from '@sharedModule/models/JwtData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public hide = true;
  public formLogin!:FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService,
    private authService:AuthService,
    private base64Service: Base64Service,
    private subjectService: SubjectService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private router:Router
  ){}

  onRegisterUser(){
      this.router.navigate(['/registrar'])
  }

  ngOnInit(): void {
    this.buildFormLogin();
  }

  buildFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      correoUsuario: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(120),
        Validators.email,
        emailValidator
      ]
      ),
      contrasenaUsuario: new FormControl('', [
        Validators.required,
        // Validators.pattern(StrongPasswordRegx)
      ])
    });
  }

  public loginUser({valid}:{valid:boolean}){
    if(!valid){
      this.formLogin.markAllAsTouched();
      return;
    }
    let mensaje = ''
    const {correoUsuario, contrasenaUsuario} = this.formLogin.value
    const objectUsuario:ILogin = {
      email:correoUsuario,
      contrasena: contrasenaUsuario
    }
    sessionStorage.removeItem('userToken');
    this.spinner.show(); // Show Spinner
    this.authService.loginUser(objectUsuario).pipe(
      tap((data) => {
          let cliente:JwtData = jwtDecode(data.data['token']);
          const obj64 = this.base64Service.objectoToBase64(cliente)
          this.subjectService.setValueBase64(obj64);
          mensaje = data.mensaje
      }),
      catchError((err) => {
        console.error("Error: ", err);
        this.utilitiesService.showErrorMessage(err.message)
        this.spinner.hide()
        return of(null)
      }),
      finalize(() => {
        this.spinner.hide().then(() => {
          this.utilitiesService.showSucessMessage(mensaje, 'inicio-sesion', 'Aceptar').then(() => {
            this.router.navigate(['/inicio']);
          });
        });
      } ) // Hiden Spinner
    ).subscribe();
  }

}
