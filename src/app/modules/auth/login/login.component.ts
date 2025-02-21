import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginResponse } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    
    loginForm!: FormGroup;
    errorMsg: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ){}

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }

        this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.loginForm) {
          const credentials = {
            emailOrUsername: this.loginForm.value.email,
            password: this.loginForm.value.password
          };
    
          this.authService.login(credentials).subscribe({
            next: (res: LoginResponse) => {
              
              localStorage.setItem('token', res.access_token);
              
              this.router.navigate(['/dashboard']);
            },
            error: (err) => {
              this.errorMsg = err.error.msg || 'Credenciales invalidas';
            }
          });
        }
    }
}
