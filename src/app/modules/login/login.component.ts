import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../common/helpers/validators/formats.validators';
import { ErrorHandlerService } from '../../shared/service/errorHandler.service';
import { ILogin } from '../../shared/models/ILogin';
import { AuthService } from '../../shared/service/auth.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { Base64Service } from '@sharedModule/service/base64.service';

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
    private spinner: NgxSpinnerService
  ){}

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
    const {correoUsuario, contrasenaUsuario} = this.formLogin.value
    const objectUsuario:ILogin = {
      email:correoUsuario,
      contrasena: contrasenaUsuario
    }
    sessionStorage.removeItem('userToken');
    this.spinner.show(); // Show Spinner
    this.authService.loginUser(objectUsuario).pipe(
      tap((data) => {
        console.log(data);

          const cliente = this.base64Service.objectoToBase64(data.data);
          this.subjectService.setValueBase64(cliente);
          this.utilitiesService.showSucessMessage(data.mensaje, 'inicio-sesion', 'Aceptar');
      }),
      catchError((err) => {
        console.error("Error: ", err);
        this.utilitiesService.showErrorMessage(err.message)
        return of(null)
      }),
      finalize(() => this.spinner.hide() ) // Hiden Spinner
    ).subscribe();
  }

}
