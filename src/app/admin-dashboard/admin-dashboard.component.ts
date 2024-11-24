import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isLoggedIn: boolean = false; // 'admin' ou autre rôle
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté et récupérer son rôle
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getRole();
  }

  logout(): void {
    // Appel à la méthode de déconnexion du service d'authentification
    this.authService.logout();
    this.router.navigate(['login']); // Redirection vers la page d'accueil après la déconnexion
  }
}
