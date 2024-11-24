import { Injectable } from '@angular/core';
import { Employe } from '../model/employe.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  employees: Employe[] = [];
  apiURL: string = 'http://localhost:8090/api/emp'; // URL de l'API

  // Définir les options HTTP par défaut (headers par exemple)
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) {}
    /*this.employees = [
      { idEmploye: 1, FullNameEmploye: "Nom Prenom 1", emailEmploye: "employe1@gmail.com", NumTelEmploye: 25147789, dateNaissanceEmploye: new Date("1996-12-04") },
      { idEmploye: 2, FullNameEmploye: "Nom Prenom 2", emailEmploye: "employe2@gmail.com", NumTelEmploye: 25147789, dateNaissanceEmploye: new Date("1996-12-04") },
      { idEmploye: 3, FullNameEmploye: "Nom Prenom 3", emailEmploye: "employe3@gmail.com", NumTelEmploye: 25147789, dateNaissanceEmploye: new Date("1996-12-04") },
    ];*/
  

  // Retourne la liste des employés
  listeEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiURL).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des employés', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  // Ajoute un nouvel employé
  addEmploye(employe: Employe): Observable<Employe | null>{
    return this.http.post<Employe>(this.apiURL,employe, this.httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de l\'employé', error);
        return of(null); // Retourne null en cas d'erreur
      })
    );
  }

  // Supprime un employé
  supprimerEmploye(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, this.httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression de l\'employé', error);
        return of(); // Retourne un Observable vide en cas d'erreur
      })
    );
  }

  // Recherche un employé par ID
  consulterEmploye(id: number): Observable<Employe> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Employe>(url).pipe(
      catchError(error => {
        console.error(`Erreur lors de la récupération de l'employé avec ID ${id}`, error);
        return of(); // Retourne null en cas d'erreur
      })
    );
  }

  // Met à jour un employé existant
  updateEmploye(employe: Employe): Observable<Employe | null> {
    const url = `${this.apiURL}/${employe.idEmploye}`;
    return this.http.put<Employe>(url, employe, this.httpOptions).pipe(
      catchError(error => {
        console.error(`Erreur lors de la mise à jour de l'employé avec ID ${employe.idEmploye}`, error);
        return of(null); // Retourne null en cas d'erreur
      })
    );
  }

  // Trie les employés par ID
  trierEmployes(employees: Employe[]): Employe[] {
    return employees.sort((n1, n2) => n1.idEmploye! - n2.idEmploye!);
  }
}