import { Component } from '@angular/core';
import { LoginComponent } from '@auth/login/login.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  template: ` <app-login /> `
})
export class AppComponent {
  title = 'FinanjaFrontend';
}
