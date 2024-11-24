import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHomePage: boolean = true;

  constructor(public authService: AuthService, private router: Router) {
    // Met à jour isHomePage au chargement initial
    this.isHomePage = this.router.url === '/' || this.router.url === '/login';
    
    // Abonnement pour mettre à jour isHomePage à chaque navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isHomePage = this.router.url === '/' || this.router.url === '/login';
    });
  }

  ngOnInit(): void {
    // Aucun code de redirection pour éviter de changer la page lors du rafraîchissement
    // On laisse l'utilisateur rester sur la page actuelle
  }

  // Méthode pour déconnecter l'utilisateur
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige vers la page de login après la déconnexion
  }
}
