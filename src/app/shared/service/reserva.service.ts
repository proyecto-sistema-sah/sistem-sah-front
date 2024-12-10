import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { cambiarEstadoReserva } from "@sharedModule/models/CambiarEstadoReserva";
import { ReservaCuarto } from "@sharedModule/models/ReservaCuarto";
import { IResponse } from "@sharedModule/models/Response";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ReservaService {
    
    constructor(private httpClient: HttpClient) { }

    public postCrearReserva(reservaCuarto:ReservaCuarto): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${environment.api.baseUrlAPI}${environment.api.postCrearReserva}`, reservaCuarto);
    }

    public getReservasUsuario(codigoUsuario:string): Observable<IResponse> {
        let params = new HttpParams()
        .set('codigoUsuario', codigoUsuario)
        return this.httpClient.get<IResponse>(`${environment.api.baseUrlAPI}${environment.api.getReservasUsuario}`, {params});
    }

    public cambiarEstadoReserva(cambiarEstadoReserva:cambiarEstadoReserva):Observable<IResponse>{
        return this.httpClient.post<IResponse>(`${environment.api.baseUrlAPI}${environment.api.postCambiarEstado}`, cambiarEstadoReserva);
    }

}