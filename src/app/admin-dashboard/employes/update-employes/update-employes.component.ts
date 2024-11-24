import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from '../../../model/employe.model';
import { EmployeService } from '../../../services/employes.service';

@Component({
  selector: 'app-update-employes',
  templateUrl: './update-employes.component.html',
  styleUrls: ['./update-employes.component.css']
})
export class UpdateEmployesComponent implements OnInit {
  newEmploye = new Employe();
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeService: EmployeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.employeService.consulterEmploye(id).subscribe({
      next : (employee) => {
        console.log(employee);
        this.newEmploye = employee; // Remplir `newEmploye` avec les données récupérées
        this.myForm.patchValue(this.newEmploye);
      },
     error: (err) => {
        console.error('Employé non trouvé ou erreur de récupération.');
      },
    });

    if (!this.newEmploye) {
      console.error('Employé non trouvé');
      this.router.navigate(['/admin-dashboard/employes/lister']);
      return;
    }

    console.log('Employé trouvé :', this.newEmploye);

    this.initForm(this.newEmploye);
  }

  initForm(employe: Employe): void {
    this.myForm = this.formBuilder.group({
      idEmploye: [{ value: employe.idEmploye, disabled: true }, [Validators.required]],
      emailEmploye: [employe.emailEmploye, [Validators.required, Validators.email]],
      fullNameEmploye: [employe.fullNameEmploye, [Validators.required, Validators.minLength(3)]],
      dateNaissanceEmploye: [employe.dateNaissanceEmploye, [Validators.required]],
      numTelEmploye: [employe.numTelEmploye, [Validators.required, Validators.pattern('^[0-9]{8,10}$')]]
    });
  }

  modifierEmploye(): void {
    if (this.myForm.valid && this.newEmploye) {
      const updatedEmploye: Employe = {
        ...this.newEmploye,
        ...this.myForm.getRawValue() // Inclut les champs désactivés
      };

      console.log('Employé à modifier :', updatedEmploye);
      this.employeService.updateEmploye(updatedEmploye).subscribe({
        next: (response: any) => {
          console.log('Employé modifié avec succès', response);
  
          // Redirection après la modification
          this.router.navigate(['/admin-dashboard/employes/lister']);
        },
        error: (err) => {
          console.error('Erreur lors de la modification du l\'employé', err);
        },
      });
    }
  }
}