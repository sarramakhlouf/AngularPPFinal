import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employe } from '../../../model/employe.model';
import { EmployeService } from '../../../services/employes.service';

@Component({
  selector: 'app-lister-employes',
  templateUrl: './lister-employes.component.html',
  styleUrls: ['./lister-employes.component.css']
})
export class ListerEmployesComponent implements OnInit {
  employees: Employe[] = [];

  constructor(private employeService: EmployeService, private router: Router) {}

  ngOnInit(): void {
    // Souscription à l'Observable pour récupérer les employés
    this.employeService.listeEmployes().subscribe(
      (data: Employe[]) => {
        this.employees = data; // Assigner les employés reçus
      },
      error => {
        console.error('Erreur lors de la récupération des employés :', error);
      }
    );
  }
  supprimerEmploye(em: Employe) {
    const conf = confirm("Etes-vous sûr ?");
    if (conf && em.idEmploye) {
      this.employeService.supprimerEmploye(em.idEmploye).subscribe(
        () => {
          console.log(`Employé avec ID ${em.idEmploye} supprimé.`);
          // Mettre à jour la liste localement si nécessaire
          this.employees = this.employees.filter(e => e.idEmploye !== em.idEmploye);
        },
        error => {
          console.error('Erreur lors de la suppression de l\'employé :', error);
        }
      );
    } else {
      console.warn('Impossible de supprimer : ID employé manquant ou suppression annulée.');
    }
  }

  updateEmploye(id: number) {
    // Vérifiez si id est bien un nombre avant de naviguer
    console.log('ID à modifier : ', id);
    if (id) {
      this.router.navigate(['/admin-dashboard/employes/update', id]);
    } else {
      console.error('ID invalide pour la mise à jour de l\'employé');
    }
  }
}