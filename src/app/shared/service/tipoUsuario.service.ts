import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../models/Response';
import { environment } from '../../../environment/environment';


@Injectable({providedIn: 'root'})
export class TipoUsuarioService {
    
    constructor(private httpClient: HttpClient) { }


    public getAllTipoUsuario(): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${environment.api.baseUrlAPI}${environment.api.getAllTipoUsuario}`);
    }

}