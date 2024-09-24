import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTES } from './login.routes';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(LOGIN_ROUTES),
  ],
  providers: [provideHttpClient()]
})
export class LoginModule { }