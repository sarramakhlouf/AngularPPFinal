// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'];  // Le rôle requis pour la route
    const userRole = this.authService.getRole();  // Récupérer le rôle de l'utilisateur

    if (this.authService.isLoggedIn() && userRole === expectedRole) {
      return true;  // L'utilisateur est connecté et a le rôle correct, on permet l'accès
    } else {
      // Si l'utilisateur n'est pas autorisé, redirigez-le vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
