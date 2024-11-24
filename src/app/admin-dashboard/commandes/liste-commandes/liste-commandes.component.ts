import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../model/commande.model';

@Component({
  selector: 'app-liste-commandes',
  templateUrl: './liste-commandes.component.html',
  styleUrls: ['./liste-commandes.component.css']
})
export class ListeCommandesComponent implements OnInit {
  commandes: Commande[] = []; // Liste des commandes
  loading: boolean = true; // Indicateur de chargement
  errorMessage: string = ''; // Message d'erreur

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.commandeService.getCommandes().subscribe(
      (commandes) => {
        this.loading = false;
        if (Array.isArray(commandes)) {
          this.commandes = commandes; // Récupérer les commandes depuis l'API si la réponse est un tableau
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau de commandes');
          this.errorMessage = 'Erreur de format des données reçues';
        }
      },
      (error) => {
        this.loading = false;
        console.error('Erreur lors de la récupération des commandes', error);
        this.errorMessage = 'Erreur lors de la récupération des commandes';
      }
    );
  }

  // Méthode pour supprimer une commande via l'API
  supprimerCommande(id: number): void {
    this.commandeService.supprimerCommande(id).subscribe(
      () => {
        alert('Commande supprimée avec succès');
        this.commandes = this.commandes.filter(commande => commande.id !== id); // Mettre à jour la liste localement
      },
      (error) => {
        console.error('Erreur lors de la suppression de la commande', error);
        alert('Erreur lors de la suppression de la commande');
      }
    );
  }
}
