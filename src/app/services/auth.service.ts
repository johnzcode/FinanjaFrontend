import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface LoginResponse{
    token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient) {}

    login(credenciales: { emailOrUsername: string, password: string }): Observable<LoginResponse>{
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciales);
    }

}
