import { Component, OnInit } from '@angular/core';
import { IFacturacion } from '@sharedModule/models/IFacturacion';
import { JwtData } from '@sharedModule/models/JwtData';
import { FacturacionService } from '@sharedModule/service/facturacion.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  /**
   * Lista de facturaciones del usuario.
   */
  facturaciones: IFacturacion[] = [];

  /**
   * Constructor que inyecta servicios necesarios.
   * @param facturacionService Servicio para consultar las facturaciones.
   * @param spinner Servicio para mostrar el spinner de carga.
   */
  constructor(
    private facturacionService: FacturacionService,
    private spinner: NgxSpinnerService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.obtenerFacturaciones();
  }

  /**
   * Obtiene la lista de facturaciones del usuario autenticado.
   */
  obtenerFacturaciones(): void {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      console.error('No se encontró un token válido.');
      return;
    }

    const data: JwtData = jwtDecode(token);

    this.spinner.show();
    this.facturacionService.getConsultarFacturacionesUsuario(data.codigoUsuario).subscribe({
      next: (response) => {
        this.facturaciones = response.data;
      },
      error: (err) => {
        console.error('Error al consultar las facturaciones:', err);
      },
      complete: () => this.spinner.hide()
    });
  }

  /**
   * Descarga el archivo PDF de la facturación seleccionada.
   * @param url URL del PDF a descargar.
   * @param codigo Código de la facturación (usado como nombre del archivo).
   */
  descargarPdf(url: string, codigo: string): void {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = `factura_${codigo}.pdf`; // Nombre dinámico del archivo.
    a.click();
  }
}
