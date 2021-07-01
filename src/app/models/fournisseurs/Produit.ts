import Fournisseur from "./Fournisseur";

export default interface Produit {
    
    id: number;
    categorie: string;
    reference: string;
    nom: string;
    nbUniteParLot: number;
    fournisseur : Fournisseur;
    listeQuantiteCommandePrecedentes : number[];
  }