import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { CuartosDisponibles } from "@sharedModule/models/CuartosDisponibles";
import { IResponse } from "@sharedModule/models/Response";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class CuartoService {
    
    constructor(private httpClient: HttpClient) { }


    public getAllCuartos(cuartosDisponibles:CuartosDisponibles): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${environment.api.baseUrlAPI}${environment.api.postCuartos}`, cuartosDisponibles);
    }

}