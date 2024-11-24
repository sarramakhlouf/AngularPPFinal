import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  private role: string = '';  // Variable pour stocker le rôle de l'utilisateur

  // Simule une connexion de l'utilisateur avec attribution du rôle
  login(role: string) {
    this.loggedIn = true;
    this.role = role; // Définir le rôle lors de la connexion
    localStorage.setItem('role',String(this.role));
  }

  // Simule la déconnexion de l'utilisateur
  logout() {
    this.loggedIn = false;
    this.role = ''; 
    localStorage.removeItem('loggedUser');
    localStorage.setItem('role',String(this.role));
     // Réinitialiser le rôle lors de la déconnexion
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // Retourne le rôle de l'utilisateur
  getRole(): string {
    return this.role;
  }
}
