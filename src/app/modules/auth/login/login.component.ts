import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginResponse } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    
    loginForm!: FormGroup;
    fieldNames: string[] = ['email', 'password'];
    errorMsg: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
        private loadService: LoadingService
    ){}

    ngOnInit(): void {
        this.loginForm = this.fb.group(
            this.fieldNames.reduce((acc, field) => {
                acc[field] = ['', Validators.required];
                return acc;
            }, {} as any)
        );
    }

    capitalizeFirstLetter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        const credentials = {
            emailOrUsername: this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        this.loadService.show();
  
        this.authService.login(credentials).subscribe({
          next: (res: LoginResponse) => {

            this.loadService.hide();
            
            localStorage.setItem('token', res.access_token);
            
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.loadService.hide();
            this.errorMsg = err.error.msg || 'Credenciales invalidas';
            this.alertService.showAlert('Nombre de usuario o contraseña incorrecta', 'Advertencia!', 'warning');
          }
        });
    }
}
