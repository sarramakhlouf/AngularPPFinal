import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  // Import du service Router

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string = '';  // 'admin' ou 'user'
  isHomePageOrLogin: boolean = false;  // Pour déterminer si on est sur la page d'accueil ou de login

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Vérifier si l'utilisateur est connecté et récupérer son rôle
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getRole(); // Utiliser le rôle récupéré de AuthService

    // Vérifier si on est sur la page d'accueil ou la page de login
    const currentUrl = this.router.url;
    this.isHomePageOrLogin = currentUrl === '/' || currentUrl === '/login';
  }
}
