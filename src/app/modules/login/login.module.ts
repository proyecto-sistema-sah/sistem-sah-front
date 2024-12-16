import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTES } from './login.routes';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Módulo que contiene la funcionalidad de inicio de sesión.
 */
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(LOGIN_ROUTES),
    HttpClientModule,
    TranslateModule
  ],
  providers: [AuthService, ErrorHandlerService, UtilitiesService]
})
export class LoginModule {}
