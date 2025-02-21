import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface LoginResponse{
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;
    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    setItem(key: string, value: string): void {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, value);
        }
    }

    login(credenciales: { emailOrUsername: string, password: string }){
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciales)
        .pipe(
            tap(response => {
                this.isAuthenticated = true;
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
            })
        )
    }

    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return !!localStorage.getItem('access_token');
        }
        return false;
    }
    
    getToken(): string | null {
        return localStorage.getItem('access_token');
    }
    
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.isAuthenticated = false;
    }

}
