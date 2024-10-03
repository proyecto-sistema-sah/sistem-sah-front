import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator, sizeFileSelect, strongPassword } from '@common/helpers/validators/formats.validators';
import { ITipoUsuario } from '@sharedModule/models/ITipoUsuario';
import { IResponse } from '@sharedModule/models/Response';
import { Usuario } from '@sharedModule/models/Usuario';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { TipoUsuarioService } from '@sharedModule/service/tipoUsuario.service';
import { UsuarioService } from '@sharedModule/service/usuario.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements OnInit{
  selectedImageUrl: string | null = null; // URL de la imagen seleccionada para previsualización
  files: string[] = []; // Lista de archivos con URLs desde el blob storage
  allTiposUsuario:ITipoUsuario[] = [];
  public formRegister!:FormGroup;
  public hide = true;
  imagePreview: string | ArrayBuffer | null = null;
  private nombre:string = '';

  constructor(private blobStorageService: BlobStorageService,
    public readonly errorHandlerService: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private usuarioService: UsuarioService,
    private tipoUsuarioService:TipoUsuarioService) {}
 
  ngOnInit(): void {
    this.buildFormRegister()
    this.getDataDefault()
  }

  buildFormRegister(): void {
    this.formRegister = this.formBuilder.group({
      nombres: new FormControl<String>('',[
        Validators.required,
      ]),
      apellidos: new FormControl<String>('',[
        Validators.required,
      ]),
      correoUsuario: new FormControl<string>('', [
        Validators.required, 
        Validators.email,
        emailValidator
      ]
      ),
      contrasenaUsuario: new FormControl('', [
        Validators.required,
        strongPassword
      ]),
      repeatContrasenaUsuario: new FormControl('', [
        Validators.required,
        strongPassword
      ]),
      tipoUsuario: new FormControl(0,[
        Validators.required
      ]),
      imagen: new FormControl<File | null> (null,[
        Validators.required,
        sizeFileSelect
      ])
    });
  }

  getDataDefault(){
    this.spinner.show();
    this.tipoUsuarioService.getAllTipoUsuario().pipe(
      tap((data:IResponse) => {
        this.allTiposUsuario = data.data
      }),
      catchError((err) => {
        console.error("Error: ", err);
        this.utilitiesService.showErrorMessage(err.message)
        return of(null)
      }),
      finalize(() => {
        this.spinner.hide()
      })
    ).subscribe();
  }

  // Manejar la selección de archivo
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file){
      this.formRegister.patchValue({imagen:file});
      this.formRegister.get('imagen')?.markAsTouched();
      this.formRegister.get('imagen')?.updateValueAndValidity();
    }
  }

  createUsuario(){
    this.spinner.show()
    const file = this.formRegister.get('imagen')?.value
    let usuario:Usuario = {}
    if (file) {
      this.blobStorageService.uploadFile(file).then(response => {
        this.nombre = response;
        const datas:string[] = this.formRegister.get('tipoUsuario')?.value.split('-')
        const tipoUsuario:ITipoUsuario = {
          id: Number(datas[0]),
          nombreTipoUsuario: datas[1]
        }
        usuario = {
          nombresUsuario: this.formRegister.get('nombres')?.value,
          apellidosUsuario: this.formRegister.get('apellidos')?.value,
          correoUsuario: this.formRegister.get('correoUsuario')?.value,
          contrasena: this.formRegister.get('contrasenaUsuario')?.value,
          codigoImagenUsuario: response,
          tipoUsuarioDtoFk:tipoUsuario
        }
      }).catch(error => {
        console.error("Hubo un error ", error)
      }).finally(() => {
        console.log(usuario);
        
        this.usuarioService.crearUsuario(usuario).pipe(
          tap((data:IResponse) => {
            console.log(data);
          }),
          catchError((err) => {
            console.error("Error: ", err);
            this.utilitiesService.showErrorMessage(err.message)
            return of(null)
          }),
          finalize(() => {
            this.spinner.hide()
          })
        ).subscribe();
      })
    }
  }
  

  // Listar archivos en el blob storage
  async listFiles(): Promise<void> {
    this.files = await this.blobStorageService.listBlobs();
  }

}
