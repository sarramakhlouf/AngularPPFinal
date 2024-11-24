import { Injectable, OnInit } from '@angular/core';
import { medicament } from '../model/medicament.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class MedicamentService implements OnInit {
    medicament! : medicament[];
    medicamentt! :medicament;
    apiURL: string = 'http://localhost:8090/api/medicament';

    constructor(private http :HttpClient) {
   
      
      /*  this.medicament= [
          { id:1,nom:"Doliprane",barCode:"87654331",prix:5000,qteS:45},
          { id:2,nom:"SpasmoCalm",barCode:"12345678",prix:5800,qteS:60},
          { id:3,nom:"DoliRhume",barCode:"65432030",prix:3350,qteS:100},
          { id:4,nom:"Panadol",barCode:"09876542",prix:9000,qteS:120},
  
  
  
      
           ];*/
          
      }
      ngOnInit(): void {
        throw new Error('Method not implemented.');
      }
    /*  listerMedicament():medicament [] {
        return this.medicament;}
        getNextId(): number {
          return this.medicament.length > 0 
            ? Math.max(...this.medicament.map(m => m.id)) + 1 
            : 1;
        }*/
       /* ajouterMedicament(med : medicament){
          med.id = this.getNextId();
          this.medicament.push(med);
        }*/

        ajouterMedicament(med : medicament):Observable<medicament>{

          return this.http.post<medicament>(this.apiURL,med,httpOptions);

        }
       /* supprimerMedicament(med :medicament){
          //supprimer le produit prod du tableau produits
          const index = this.medicament.indexOf(med, 0);
          if (index > -1) {
          this.medicament.splice(index, 1);
          }
          //ou Bien
          /* this.produits.forEach((cur, index) => {
          if(prod.idIProduit === cur.idIProduit) {
          this.produits.splice(index, 1);
          }
          }); 
          }*/
          supprimerMedicament(e:medicament): Observable<any> {
            // Assurez-vous que l'ID de l'étudiant est valide
            if (!e || !e.id) {
              console.error("ID du médicament invalide");
              return new Observable(); // Retourne une Observable vide en cas d'erreur
            }
            
            const url = `${this.apiURL}/${e.id}`; // Utilise l'ID de l'étudiant
            return this.http.delete(url, httpOptions); // Envoie la requête DELETE
          }

        
       /* consulterMedicament(id:number):medicament{
          return   this.medicamentt = this.medicament.find(e => e.id == id)!;
         
          }*/
          consulterMedicament(id :number):Observable<medicament>{
            const url=`${this.apiURL}/${id}`;
            return this.http.get<medicament>(url);
           }

         trierMedicament(){
            this.medicament = this.medicament.sort((n1,n2) => {
            if (n1.id! > n2.id!) {
            return 1;
            }
            if (n1.id! < n2.id!) {
            return -1;
            }
            return 0;
            });
            }


            /*modifierMed(m :medicament){
              this.supprimerMedicament(m);
              this.ajouterMedicament(m);
              this.trierMedicament();
            }*/
              /*modifierMed(m: medicament) {
                const index = this.medicament.findIndex((med) => med.id === m.id);
                if (index !== -1) {
                  this.medicament[index] = { ...m };
                }
                else {
                  console.log("Médicament non trouvé pour modification !");
                }
              }*/
                modifierMed(m: medicament) : Observable<medicament>
                {
                //return this.http.put<medicament>(this.apiURL, m, httpOptions);
                const url = `${this.apiURL}/${m.id}`; // Inclut l'ID dans l'URL
  return this.http.put<medicament>(url, m, httpOptions);
                }
              
    /*consulterMed(id:number):medicament{
      return   this.medicamentt= this.medicament.find(m => m.id == id)!;
     
      }*/

      listeMedicament():Observable<medicament[]> {
        return this.http.get<medicament[]>(this.apiURL);
    
      }
      getMedicaments(): medicament[] {
        return this.medicament;
    }
}