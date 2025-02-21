import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  providers: [
    {
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptor,
        multi: true
    }
  ],
  template: ` <router-outlet /> `
})
export class AppComponent {
  title = 'FinanjaFrontend';
}
