import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AuthService } from '@sharedModule/service/auth.service';
import { SharedModule } from '@sharedModule/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule
  ],
  providers: [AuthService],
  exports: [HeaderComponent]
})
export class HeaderModule { }
