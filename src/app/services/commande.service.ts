import { Injectable } from '@angular/core';
import { Commande } from '../model/commande.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  apiURL: string = 'http://localhost:8090/api/commande'; // URL de l'API

  // Définir les options HTTP par défaut (headers par exemple)
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir la liste des commandes
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiURL).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des commandes', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  // Méthode pour obtenir une commande par ID
  getCommandeById(id: number): Observable<Commande | null> { 
    return this.http.get<Commande>(`${this.apiURL}/${id}`).pipe(
      catchError(error => {
        console.error(`Erreur lors de la récupération de la commande avec ID ${id}`, error);
        return of(null); // Retourne null si l'ID est incorrect ou si l'API échoue
      })
    );
  }

  // Méthode pour ajouter une nouvelle commande
  ajouterCommande(commande: Commande): Observable<Commande | null> {
    return this.http.post<Commande>(this.apiURL, commande, this.httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la commande', error);
        return of(null); // Retourne null en cas d'erreur
      })
    );
  }

  // Méthode pour mettre à jour une commande
  updateCommande(updatedCommande: Commande): Observable<Commande | null> {
    return this.http.put<Commande>(`${this.apiURL}/${updatedCommande.id}`, updatedCommande, this.httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour de la commande', error);
        return of(null); // Retourne null en cas d'erreur
      })
    );
  }

  // Méthode pour supprimer une commande par ID
  supprimerCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`, this.httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression de la commande', error);
        return of(); // Retourne rien en cas d'erreur
      })
    );
  }
}
