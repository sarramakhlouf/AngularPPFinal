import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListeCommandesComponent } from './admin-dashboard/commandes/liste-commandes/liste-commandes.component';
import { AjouterCommandeComponent } from './admin-dashboard/commandes/ajouter-commande/ajouter-commande.component';
import { RoleGuard } from './guards/role.guard';
import { AjouterMedicamentComponent } from './admin-dashboard/medicament/ajouter-medicament/ajouter-medicament.component';
import { ListerMedicamentComponent } from './admin-dashboard/medicament/lister-medicament/lister-medicament.component';
import { ModifierMedicamentComponent } from './admin-dashboard/medicament/modifier-medicament/modifier-medicament.component';
import { AddEmployesComponent } from './admin-dashboard/employes/add-employes/add-employes.component';
import { ListerEmployesComponent } from './admin-dashboard/employes/lister-employes/lister-employes.component';
import { UpdateEmployesComponent } from './admin-dashboard/employes/update-employes/update-employes.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, 
    children: [
      { path: 'commandes/liste', component: ListeCommandesComponent }, 
      { path: 'commandes/ajouter', component: AjouterCommandeComponent }, 
      {path : 'medicament/listerMedicament',component:ListerMedicamentComponent},
      { path: '', redirectTo: 'medicament/listerMedicament', pathMatch: 'full' },
      {path : 'medicament/ajouterMedicament',component:AjouterMedicamentComponent},
      { path: 'medicament/modifierMedicament/:id', component: ModifierMedicamentComponent },
      { path: 'employes/lister', component: ListerEmployesComponent }, 
      { path: 'employes/add', component: AddEmployesComponent },
      { path: 'employes/update/:id', component: UpdateEmployesComponent },
    ]
  } , 
  { 
    path: 'caissier-dashboard',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data: { role: 'caissier' },
    children: [
      { path: 'medicament/listerMedicament', component: ListerMedicamentComponent },
      { path: '', redirectTo: 'medicament/listerMedicament', pathMatch: 'full' } // Rediriger le caissier vers la liste des médicaments
    ]
  },
  { path: '**', redirectTo: '' }   // Liste des commandes // Redirige vers la page d'accueil pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
