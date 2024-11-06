import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { IResponse } from "@sharedModule/models/Response";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class TipoCuartoService {
    
    constructor(private httpClient: HttpClient) { }


    public getAllTipoCuarto(): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${environment.api.baseUrlAPI}${environment.api.getAllTipoCuarto}`);
    }

}