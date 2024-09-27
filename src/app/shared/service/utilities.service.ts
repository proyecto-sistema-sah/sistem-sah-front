import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ISafeAny } from '../models/ISafeAny';

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  constructor(private router: Router) {}

  async showErrorMessage(
    messageError = '',
    router = '',
    textoBotonConfirmar = '',
    textoBotonCancelar = ''
  ): Promise<boolean> {
    let aceptarCancelar = false;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'cancel-button',
        cancelButton: 'mat-focus-indicator mat-tooltip-trigger mat-raised-button mat-button-base',
      },
      buttonsStyling: true,
    });
    const swalConfig: ISafeAny = {
      html: messageError,
      icon: 'error',
      showCancelButton: textoBotonCancelar && true,
      confirmButtonText: textoBotonConfirmar ? textoBotonConfirmar : 'Cerrar',
      cancelButtonText: textoBotonCancelar,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    };
    await swalWithBootstrapButtons.fire(swalConfig).then((result: ISafeAny) => {
      if (result.isConfirmed && router !== '') {
        this.router.navigate([router]);
      }
      aceptarCancelar = result.isConfirmed;
    });
    return aceptarCancelar;
  }

  async showSucessMessage(
    messageSuccess = '',
    router = '',
    textoBotonConfirmar = '',
    textoBotonCancelar = ''
  ): Promise<boolean> {
    let aceptarCancelar = false;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'button-primary',
        cancelButton: 'cancel-button',
      },
      buttonsStyling: true,
    });
    const swalConfig: ISafeAny = {
      html: messageSuccess,
      icon: 'success',
      showCancelButton: textoBotonCancelar && true,
      confirmButtonText: textoBotonConfirmar ? textoBotonConfirmar : 'Cerrar',
      cancelButtonText: textoBotonCancelar,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    };
    await swalWithBootstrapButtons.fire(swalConfig).then((result: ISafeAny) => {
      if (result.isConfirmed && router !== '') {
        this.router.navigate([router]);
      }
      aceptarCancelar = result.isConfirmed;
    });
    return aceptarCancelar;
  }

  async showInfoMessage(
    messageInfo = '',
    router = '',
    textoBotonConfirmar = '',
    textoBotonCancelar = ''
  ): Promise<boolean> {
    let aceptarCancelar = false;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base',
        cancelButton: 'mdc-button mdc-button--raised mat-mdc-raised-button mat-warn mat-mdc-button-base',
      },
      buttonsStyling: true,
    });
    const swalConfig: ISafeAny = {
      html: messageInfo,
      icon: 'info',
      showCancelButton: textoBotonCancelar && true,
      confirmButtonText: textoBotonConfirmar ? textoBotonConfirmar : 'Cerrar',
      cancelButtonText: textoBotonCancelar,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    };
    await swalWithBootstrapButtons.fire(swalConfig).then((result: ISafeAny) => {
      if (result.isConfirmed && router !== '') {
        this.router.navigate([router]);
      }
      aceptarCancelar = result.isConfirmed;
    });
    return aceptarCancelar;
  }

  async showWarningMessage(
    messageInfo = '',
    router = '',
    textoBotonConfirmar = '',
    textoBotonCancelar = ''
  ): Promise<boolean> {
    let aceptarCancelar = false;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base',
        cancelButton: 'mdc-button mdc-button--raised mat-mdc-raised-button mat-warn mat-mdc-button-base',
      },
      buttonsStyling: true,
    });
    const swalConfig: ISafeAny = {
      html: messageInfo,
      icon: 'warning',
      showCancelButton: textoBotonCancelar && true,
      confirmButtonText: textoBotonConfirmar ? textoBotonConfirmar : 'Cerrar',
      cancelButtonText: textoBotonCancelar,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    };
    await swalWithBootstrapButtons.fire(swalConfig).then((result: ISafeAny) => {
      if (result.isConfirmed && router !== '') {
        this.router.navigate([router]);
      }
      aceptarCancelar = result.isConfirmed;
    });
    return aceptarCancelar;
  }
}
