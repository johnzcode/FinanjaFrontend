import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginComponent } from '@auth/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  providers: [
    {
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptor,
        multi: true
    }
  ],
  template: ` <app-login /> `
})
export class AppComponent {
  title = 'FinanjaFrontend';
}
