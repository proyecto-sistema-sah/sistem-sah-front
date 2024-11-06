import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../models/Response';
import { ILogin } from '../models/Login';
import { environment } from '../../../environment/environment';


@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private httpClient: HttpClient) { }


    public loginUser(newClient: ILogin): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${environment.api.baseUrlAPI}${environment.api.getAuthLogin}`, newClient);
    }

    public logoutUser(): Observable<IResponse> {
        const headers = new HttpHeaders({
            'Authorization': ''
        })
        return this.httpClient.post<IResponse>(`${environment.api.baseUrlAPI}${environment.api.getLogouthUsuario}`,{}, {headers});
    }

}
