import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LoadingSpinnerComponent],
  providers: [
    {
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptor,
        multi: true
    }
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'FinanjaFrontend';
}
