import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtData } from '@sharedModule/models/JwtData';
import { Base64Service } from '@sharedModule/service/base64.service';
import { BlobStorageService } from '@sharedModule/service/blobStorage.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  public urlImg:string = '';
  public nombreCompleto:string = '';

  constructor(
    private subjectService: SubjectService,
    private blobStorage: BlobStorageService,
    private utilitiesService: UtilitiesService,
    private router:Router,
    private spinner: NgxSpinnerService,
    private base64:Base64Service
  ){}

  ngOnInit(): void {
    this.subjectService.getValueBase64().pipe(
      tap((data) => {
        const response:JwtData  = this.base64.base64ToObject(data)
        this.urlImg = this.blobStorage.getBlobUrl(response.foto)
        this.nombreCompleto = response.nombreCompleto
      }),
      catchError((err) => {
        console.error("Error: ", err);
        this.utilitiesService.showErrorMessage(err.message).then(() => {
          this.router.navigate(['/login'])
          this.spinner.hide()
        })
        return of(null)
      }),
      finalize(() => this.spinner.hide() ) // Hiden Spinner
    ).subscribe()
  }

}
