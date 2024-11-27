import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { ReservaCuarto } from "@sharedModule/models/ReservaCuarto";
import { IResponse } from "@sharedModule/models/Response";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ReservaService {
    
    constructor(private httpClient: HttpClient) { }

    public postCrearReserva(reservaCuarto:ReservaCuarto): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${environment.api.baseUrlAPI}${environment.api.postCrearReserva}`, reservaCuarto);
    }

}