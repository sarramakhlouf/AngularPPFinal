export interface Commande {
  id: number;
  nomClient: string;
  nomMedicament: string; // Nouveau champ pour le médicament
  montantTotal: number;
  dateCommande: Date;
  quantite: number;
}
