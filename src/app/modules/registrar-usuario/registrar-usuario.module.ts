import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RegistrarUsuarioComponent } from './registrar-usuario.component';
import { REGISTRAR_USUARIO_ROUTES } from './registrar-usuario.routes';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    RegistrarUsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(REGISTRAR_USUARIO_ROUTES),
    HttpClientModule,
    TranslateModule
  ],
  providers: [provideHttpClient()]
})
export class RegistrarUsuarioModule { }