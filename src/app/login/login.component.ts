import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userType: string = '';  // Type de l'utilisateur (admin ou caissier)
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.email === 'admin@example.com' && this.password === 'admin' && this.userType === 'admin') {
      this.authService.login('admin');  // Passer le rôle "admin"
      this.router.navigate(['/admin-dashboard']);
    } else if (this.email === 'caissier@example.com' && this.password === 'caissier' && this.userType === 'caissier') {
      this.authService.login('caissier');  // Passer le rôle "caissier"
      this.router.navigate(['/caissier-dashboard']);
    } else {
      this.errorMessage = 'Identifiants ou type d\'utilisateur incorrects';
    }
  }
}
