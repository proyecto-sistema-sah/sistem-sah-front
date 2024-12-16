import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, sizeFileSelect, strongPassword } from '@common/helpers/validators/formats.validators';
import { TranslateService } from '@ngx-translate/core';
import { ITipoUsuario } from '@sharedModule/models/ITipoUsuario';
import { IResponse } from '@sharedModule/models/Response';
import { Usuario } from '@sharedModule/models/Usuario';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { TipoUsuarioService } from '@sharedModule/service/tipoUsuario.service';
import { TranslationService } from '@sharedModule/service/TranslationService.service';
import { UsuarioService } from '@sharedModule/service/usuario.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css',
})
export class RegistrarUsuarioComponent implements OnInit {
  selectedImageUrl: string | null = null;
  files: string[] = [];
  allTiposUsuario: ITipoUsuario[] = [];
  public formRegister!: FormGroup;
  public hide = true;
  imagePreview: string | ArrayBuffer | null = null;
  private nombre: string = '';
  private languageSubscription!: Subscription;

  constructor(
    private blobStorageService: BlobStorageService,
    public readonly errorHandlerService: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService,
    private router: Router,
    private translation: TranslationService,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buildFormRegister();
    this.languageSubscription = this.translation.language$.subscribe(() => {
      this.updateTranslations();
    });
    this.updateTranslations();
    this.getDataDefault();
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  buildFormRegister(): void {
    this.formRegister = this.formBuilder.group({
      nombres: new FormControl<string>('', [Validators.required]),
      apellidos: new FormControl<string>('', [Validators.required]),
      correoUsuario: new FormControl<string>('', [
        Validators.required,
        Validators.email,
        emailValidator,
      ]),
      contrasenaUsuario: new FormControl('', [Validators.required, strongPassword]),
      repeatContrasenaUsuario: new FormControl('', [Validators.required, strongPassword]),
      tipoUsuario: new FormControl(0, [Validators.required]),
      imagen: new FormControl<File | null>(null, [Validators.required, sizeFileSelect]),
    });
  }

  getDataDefault(): void {
    this.spinner.show();
    this.tipoUsuarioService
      .getAllTipoUsuario()
      .pipe(
        tap((data: IResponse) => {
          this.allTiposUsuario = data.data;
        }),
        catchError(() => {
          this.translate.get('register.error.loadDataError').subscribe((message) => {
            this.utilitiesService.showErrorMessage(message);
          });
          return of(null);
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.formRegister.patchValue({ imagen: file });
      this.formRegister.get('imagen')?.markAsTouched();
      this.formRegister.get('imagen')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  createUsuario(): void {
    this.spinner.show();
    const file = this.formRegister.get('imagen')?.value;
    if (file) {
      this.blobStorageService
        .uploadFile(file)
        .then((response) => {
          this.nombre = response;
          const tipoUsuarioData = this.formRegister.get('tipoUsuario')?.value.split('-');
          const tipoUsuario: ITipoUsuario = {
            id: Number(tipoUsuarioData[0]),
            nombreTipoUsuario: tipoUsuarioData[1],
          };

          const usuario: Usuario = {
            nombresUsuario: this.formRegister.get('nombres')?.value,
            apellidosUsuario: this.formRegister.get('apellidos')?.value,
            correoUsuario: this.formRegister.get('correoUsuario')?.value,
            contrasena: this.formRegister.get('contrasenaUsuario')?.value,
            codigoImagenUsuario: response,
            tipoUsuarioDtoFk: tipoUsuario,
          };

          this.registerUser(usuario);
        })
        .catch(() => {
          this.translate.get('register.error.uploadError').subscribe((message) => {
            this.utilitiesService.showErrorMessage(message);
          });
          this.spinner.hide();
        });
    } else {
      this.translate.get('register.error.imageRequired').subscribe((message) => {
        this.utilitiesService.showErrorMessage(message);
      });
      this.spinner.hide();
    }
  }

  private registerUser(usuario: Usuario): void {
    if (
      this.formRegister.get('contrasenaUsuario')?.value !==
      this.formRegister.get('repeatContrasenaUsuario')?.value
    ) {
      this.translate.get('register.error.passwordMismatch').subscribe((message) => {
        this.utilitiesService.showErrorMessage(message);
      });
      return;
    }

    this.usuarioService
      .crearUsuario(usuario)
      .pipe(
        tap((data: IResponse) => {
          this.translate.get('register.success.created').subscribe((message) => {
            this.utilitiesService.showSucessMessage(
              message,
              this.translate.instant('register.messages.successTitle'),
              this.translate.instant('register.messages.acceptButton')
            );
          });
        }),
        catchError(() => {
          this.translate.get('register.error.userCreatedError').subscribe((message) => {
            this.utilitiesService.showErrorMessage(message);
          });
          return of(null);
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  private updateTranslations(): void {
    this.translate.use(this.translation.getCurrentLanguage());
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
