import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../models/Response';
import { environment } from '../../../environment/environment';
import { Usuario } from '@sharedModule/models/Usuario';


@Injectable({providedIn: 'root'})
export class UsuarioService {
    
    constructor(private httpClient: HttpClient) { }


    public crearUsuario(usuario:Usuario): Observable<IResponse> {
        return this.httpClient.post<IResponse>(environment.api.createUsuario,usuario);
    }

}