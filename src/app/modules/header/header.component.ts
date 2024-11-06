import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoCuarto } from '@sharedModule/models/ITipoCuarto';
import { IResponse } from '@sharedModule/models/Response';
import { AuthService } from '@sharedModule/service/auth.service';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { TipoCuartoService } from '@sharedModule/service/tipoCuarto.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @Input()
  public url:string = '';

  @Input()
  public nombreCompleto:string = '';

  public urlLogo = '';

  public listTipoCuarto:TipoCuarto[] = []

  constructor(private router:Router,
    private blobStorage: BlobStorageService,
    private authService: AuthService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private tipoCuartoService:TipoCuartoService
  ){}

  ngOnInit(): void {
    this.urlLogo = this.blobStorage.getBlobUrl('logo.png')
    this.dataDefault()
  }

  dataDefault(){
    this.tipoCuartoService.getAllTipoCuarto().pipe(
      tap((data:IResponse) => {
        this.listTipoCuarto = data.data
      }),
      catchError((err) => {
        console.error("Error: ", err);
        this.spinner.hide()
        this.utilitiesService.showErrorMessage(err.message)
        return of(null)
      }),
      finalize(() => this.spinner.hide())
    ).subscribe()
  }

  logout() {
    this.spinner.show()
    this.authService.logoutUser().pipe(
      tap((data) => {}),
      catchError((err) => {
        console.error("Error: ", err);
        this.spinner.hide()
        this.utilitiesService.showErrorMessage(err.message)
        return of(null)
      }),
      finalize(() => {
       sessionStorage.clear()
        this.spinner.hide().then(() => {
          this.router.navigate(['/login']); 
        })
      })
    ).subscribe()
  }
  
}
