import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MedicamentService } from '../../../services/medicament.service'; // Assurez-vous que le chemin est correct
import { medicament } from '../../../model/medicament.model';

@Component({
  selector: 'app-ajouter-medicament',
  templateUrl: './ajouter-medicament.component.html',
  styleUrls: ['./ajouter-medicament.component.css']
})
export class AjouterMedicamentComponent implements OnInit {
  newMedicament = new medicament();
  myForm!: FormGroup;

  constructor(
    private medicamentService: MedicamentService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
 // this.newMedicament.id = this.medicamentService.getNextId();
  
  
    this.myForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      barCode: ['', [Validators.required, this.barCodeLengthValidator()]],
      prix: ['', [Validators.required]],
      qteS: ['', [Validators.required]],
    });
  }

  barCodeLengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== null && value !== undefined && value.toString().length !== 8) {
        return { 'barCodeLength': true }; // Retourne une erreur si la longueur n'est pas de 8
      }
      return null; // Pas d'erreur
    };
  }

  addMedicament() {
   /* console.log(this.newMedicament);
    this.medicamentService.ajouterMedicament(this.newMedicament);
    this.router.navigate(['/admin-dashboard/medicament/listerMedicament']);
  }*/
    this.medicamentService.ajouterMedicament(this.newMedicament).subscribe({
      next: (etud) => {
        console.log(etud);
        this.router.navigate(['/admin-dashboard/medicament/listerMedicament']);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du médicament", err);
      }
    });
  }}
