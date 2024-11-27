import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { ReservaCuarto } from "@sharedModule/models/ReservaCuarto";
import { IResponse } from "@sharedModule/models/Response";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FacturacionService {
    
    constructor(private httpClient: HttpClient) { }

    public getConsultarFacturacionesUsuario(codigoUsuario:string): Observable<IResponse> {
        let params = new HttpParams()
        .set('codigoUsuario', codigoUsuario)
        return this.httpClient.get<IResponse>(`${environment.api.baseUrlAPI}${environment.api.getConsultarFacturacionesUsuario}`, {params});
    }

}