/* import { Component } from '@angular/core';
import { Employe } from '../../../model/employe.model';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeService } from '../../../services/employes.service';

@Component({
  selector: 'app-add-employes',
  templateUrl: './add-employes.component.html',
  styleUrl: './add-employes.component.css'
})
export class AddEmployesComponent {
  newEmployee = new Employe();
  constructor(private employeService: EmployeService,
    private activatedRoute :ActivatedRoute,
    private router :Router){}
  addEmploye(){
    //console.log(this.newEmployee);
    this.employeService.addEmploye(this.newEmployee);
    this.router.navigate(['admin-dashboard/employes/lister']);
  }

}
 */
import { Component } from '@angular/core';
import { Employe } from '../../../model/employe.model';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeService } from '../../../services/employes.service';

@Component({
  selector: 'app-add-employes',
  templateUrl: './add-employes.component.html',
  styleUrl: './add-employes.component.css'
})
export class AddEmployesComponent {
  newEmployee = new Employe();
  constructor(private employeService: EmployeService,
    private activatedRoute :ActivatedRoute,
    private router :Router){}
  addEmploye(){
;    console.log(this.newEmployee);
    this.employeService.addEmploye(this.newEmployee).subscribe(
      (employe) => {
        alert("Employée ajoutée avec succès !");
        this.router.navigate(['admin-dashboard/employes/lister']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'employée', error);
        alert('Erreur lors de l\'ajout de l\'employée');
      }
    );
  }

}