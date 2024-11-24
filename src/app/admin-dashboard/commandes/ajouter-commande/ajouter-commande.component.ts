import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandeService } from '../../../services/commande.service';
import { Router } from '@angular/router';
import { MedicamentService } from '../../../services/medicament.service';
import { medicament } from '../../../model/medicament.model';
import { Commande } from '../../../model/commande.model';

@Component({
  selector: 'app-ajouter-commande',
  templateUrl: './ajouter-commande.component.html',
  styleUrls: ['./ajouter-commande.component.css']
})
export class AjouterCommandeComponent implements OnInit {
  commandeForm!: FormGroup; // Formulaire pour ajouter une commande
  medicament: medicament[] | undefined;

  constructor(
    private fb: FormBuilder,
    private commandeService: CommandeService,
    private medicamentService: MedicamentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.medicament = this.medicamentService.getMedicaments() || [];
    this.commandeForm = this.fb.group({
      nomClient: ['', [Validators.required]], // Validation du champ nomClient
      nomMedicament: ['', [Validators.required]],
      montantTotal: ['', [Validators.required, Validators.min(1)]],
      dateCommande: ['', [Validators.required]],
      quantite: [1, [Validators.required, Validators.min(1)]],
    });
  }

  // Méthode pour ajouter la commande via l'API
  ajouterCommande(): void {
    if (this.commandeForm.valid) {
      const nouvelleCommande: Commande = this.commandeForm.value; // Récupérer les données du formulaire
      this.commandeService.ajouterCommande(nouvelleCommande).subscribe(
        (commande) => {
          alert("Commande ajoutée avec succès !");
          this.commandeForm.reset();
          this.router.navigate(['admin-dashboard/commandes/liste']); // Réinitialiser le formulaire et naviguer
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la commande', error);
          alert('Erreur lors de l\'ajout de la commande');
        }
      );
    }
  }
  getMedicaments(): medicament[] {
    return this.medicament!;
}
}
