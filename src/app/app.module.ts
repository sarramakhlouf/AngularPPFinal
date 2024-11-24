import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CommonModule} from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListeCommandesComponent } from './admin-dashboard/commandes/liste-commandes/liste-commandes.component';
import { RouterModule } from '@angular/router';
import { AjouterCommandeComponent } from './admin-dashboard/commandes/ajouter-commande/ajouter-commande.component';
import { ListerMedicamentComponent } from './admin-dashboard/medicament/lister-medicament/lister-medicament.component';
import { AjouterMedicamentComponent } from './admin-dashboard/medicament/ajouter-medicament/ajouter-medicament.component';
import { ModifierMedicamentComponent } from './admin-dashboard/medicament/modifier-medicament/modifier-medicament.component';
import { ListerEmployesComponent } from './admin-dashboard/employes/lister-employes/lister-employes.component';
import { AddEmployesComponent } from './admin-dashboard/employes/add-employes/add-employes.component';
import { UpdateEmployesComponent } from './admin-dashboard/employes/update-employes/update-employes.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    ListeCommandesComponent,
    AjouterCommandeComponent,
    ListerMedicamentComponent,
    AjouterMedicamentComponent,
    ModifierMedicamentComponent,
    ListerEmployesComponent,
    AddEmployesComponent,
    UpdateEmployesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
