import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentService } from '../../../services/medicament.service'; // Assurez-vous que le chemin est correct
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { medicament } from '../../../model/medicament.model';

@Component({
  selector: 'app-modifier-medicament',
  templateUrl: './modifier-medicament.component.html',
  styleUrls: ['./modifier-medicament.component.css']
})
export class ModifierMedicamentComponent implements OnInit {
  newMedicament = new medicament();
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private medicamentService: MedicamentService, // Utilisation de MedicamentService
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']; // Récupérer l'ID de la route
    //this.newMedicament = this.medicamentService.consulterMedicament(id); // Remplir `newMedicament` avec les données récupérées
    this.medicamentService.consulterMedicament(id).subscribe({
      next: (medicament) => {
        this.newMedicament = medicament; // Remplir `newMedicament` avec les données récupérées
        this.myForm.patchValue(this.newMedicament); // Mettre à jour le formulaire
      },
      error: (err) => {
        console.error('Erreur lors du chargement du médicament', err);
      },
    });
  
    this.myForm = this.formBuilder.group({
      id: [this.newMedicament.id, [Validators.required]],
      nom: [this.newMedicament.nom, [Validators.required, Validators.minLength(3)]],
      barCode: [this.newMedicament.barCode, [Validators.required, this.cinLengthValidator()]],
      prix: [this.newMedicament.prix, [Validators.required]],
      qteS: [this.newMedicament.qteS, [Validators.required]],
    });
    this.myForm.patchValue(this.newMedicament);
  }

  cinLengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== null && value !== undefined && value.toString().length !== 8) {
        return { cinLength: true }; // Retourne une erreur si la longueur n'est pas de 8
      }
      return null; // Pas d'erreur
    };
  }

  modifierMedicament() {
  /*  if (this.myForm.valid) {
      // Mise à jour des valeurs de `newMedicament` avec le formulaire
      this.newMedicament = { ...this.newMedicament, ...this.myForm.value };
      console.log("Médicament à modifier : ", this.newMedicament);

      // Appel de la méthode pour modifier le médicament
      this.medicamentService.modifierMed(this.newMedicament);

      // Redirection vers la liste des médicaments après la modification
      this.router.navigate(['/admin-dashboard/medicament/listerMedicament']);
    }
  }*/
    if (this.myForm.valid) {
      // Mise à jour des valeurs de `newMedicament` avec les données du formulaire
      this.newMedicament = { ...this.newMedicament, ...this.myForm.value };
  
      console.log("Médicament à modifier : ", this.newMedicament);
  
      // Appel de la méthode pour modifier le médicament
      this.medicamentService.modifierMed(this.newMedicament).subscribe({
        next: (response) => {
          console.log('Médicament modifié avec succès', response);
  
          // Redirection après la modification
          this.router.navigate(['/admin-dashboard/medicament/listerMedicament']);
        },
        error: (err) => {
          console.error('Erreur lors de la modification du médicament', err);
        },
      });
    }
  }}
