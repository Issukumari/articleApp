import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subject } from 'rxjs';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly articleService: ArticleService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          if (user.user.displayName) {
            localStorage.setItem('displayName', user.user.displayName);

            this.articleService.userNameSubject.next(user.user.displayName);
          } else {
            console.warn('DisplayName is undefined');
          }
          this.successMessage = 'User logged in successfully!'; 
          setTimeout(() => {
            this.router.navigate(['/home']); 
            this.successMessage = ''; 
          }, 1000); 
        },
        error: (error) => {
          this.errorMessage = 'Invalid credentials. Please try again.';
          console.error('Login error:', error)
          setTimeout(() => {
            this.errorMessage = ''; 
          }, 1000); 
      
        }
      });
    }
  }
}
