import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../models/IResponse';
import { ILogin } from '../models/ILogin';
import { environment } from '../../../environment/environment';


@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private httpClient: HttpClient) { }


    public loginUser(newClient: ILogin): Observable<IResponse> {
        console.log(newClient)
        return this.httpClient.post<IResponse>("http://localhost:8001/api/v1/usuario/login", newClient);
    }

}