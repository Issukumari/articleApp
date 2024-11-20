import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup; 
  constructor(private readonly fb: FormBuilder, private  readonly authService: AuthService, private readonly router: Router) {
}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });  }
onRegister(): void {
  if (this.registerForm.valid) {
    const { name, email, password } = this.registerForm.value;
    this.authService.register(name, email, password).subscribe({
      next: (user) => {
        this.router.navigate(['/login']);
      },
      error: (error) => console.error('Registration error:', error)
    });
  }
}
}