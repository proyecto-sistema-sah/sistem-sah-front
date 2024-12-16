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
  selectedImageUrl: string | null = null; // Vista previa de la imagen seleccionada
  files: string[] = []; // Lista de URLs de archivos en Blob Storage
  allTiposUsuario: ITipoUsuario[] = []; // Lista de tipos de usuario
  public formRegister!: FormGroup; // Formulario reactivo
  public hide = true; // Mostrar/ocultar contraseña
  imagePreview: string | ArrayBuffer | null = null; // Almacena la imagen para previsualización
  private nombre: string = ''; // Nombre del archivo subido al Blob Storage
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
    private translation:TranslationService,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef // Para detectar cambios manualmente
    ) {
    }

  ngOnInit(): void {
    this.buildFormRegister(); // Construir el formulario
    this.languageSubscription = this.translation.language$.subscribe(() => {
      this.updateTranslations(); // Actualizar textos dinámicamente
    });
    this.updateTranslations(); // Actualizar textos dinámicamente
    this.getDataDefault(); // Cargar datos iniciales
  }

  // Redirige a la página de inicio de sesión
  onLogin(): void {
    this.router.navigate(['/login']);
  }

  // Construye el formulario reactivo con validaciones
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

  // Obtiene los tipos de usuario del servicio
  getDataDefault(): void {
    this.spinner.show();
    this.tipoUsuarioService
      .getAllTipoUsuario()
      .pipe(
        tap((data: IResponse) => {
          this.allTiposUsuario = data.data;
        }),
        catchError((err) => {
          console.error('Error:', err);
          this.utilitiesService.showErrorMessage(err.message);
          return of(null);
        }),
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe();
  }

  // Maneja la selección de archivo para subir
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.formRegister.patchValue({ imagen: file });
      this.formRegister.get('imagen')?.markAsTouched();
      this.formRegister.get('imagen')?.updateValueAndValidity();

      // Generar vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  // Método para crear el usuario
  createUsuario(): void {
    this.spinner.show();
    const file = this.formRegister.get('imagen')?.value;
    if (file) {
      this.blobStorageService
        .uploadFile(file)
        .then((response) => {
          this.nombre = response; // Guardar nombre de archivo subido
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
        .catch((error) => {
          console.error('Error al subir archivo:', error);
          this.utilitiesService.showErrorMessage(error.message);
          this.spinner.hide();
          return of(null);
        });
    }
  }

  // Registra al usuario en el backend
  private registerUser(usuario: Usuario): void {
    let mensaje = '';
    let valido = true;
    this.usuarioService
      .crearUsuario(usuario)
      .pipe(
        tap((data: IResponse) => {
          mensaje = data.message;
        }),
        catchError((err) => {
          console.error('Error al crear usuario:', err);
          this.utilitiesService.showErrorMessage(err.message);
          valido = false
          return of(null);
        }),
        finalize(() => {
          this.spinner.hide().then(() => {
            if(valido){
              this.utilitiesService
              .showSucessMessage(mensaje, 'Usuario Creado', 'Aceptar')
              .then(() => {
                this.router.navigate(['/login']);
              });
            }
          });
        })
      )
      .subscribe();
  }

  // Lista los archivos en Blob Storage (opcional)
  async listFiles(): Promise<void> {
    this.files = await this.blobStorageService.listBlobs();
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
