import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] 
})
export class HeaderComponent {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  goHome() {
    const isAuthenticated = this.authService.isAuthenticated(); 
    if (isAuthenticated) {
      this.router.navigate(['/home']); 
    } else {
      this.router.navigate(['/login']);
    }
  }

  openLogin() {
    this.router.navigate(['/login']);
  }

  openRegister() {
    this.router.navigate(['/register']);
  }
  createPost() {
    const isAuthenticated = this.authService.isAuthenticated(); 
    if (isAuthenticated) {
      this.router.navigate(['/createpost']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.error('Logout error:', error);
    });
  }
}

