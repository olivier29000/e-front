import Utilisateur from "../Utilisateur";
import CommandeProduit from "./CommandeProduit";
import Fournisseur from "./Fournisseur";

export default interface Commande {
    
    id: number;
    dateCommande: number;
    dateConfirmedByFournisseur: number;
    confirmedByFournisseur: boolean;
    canceledByFournisseur: boolean;
    reponseFournisseur: string;
    fournisseur : Fournisseur;
    utilisateur : Utilisateur;
    listeCommandeProduit:CommandeProduit[];
    archive : boolean;
    dateArchive : number;
  }