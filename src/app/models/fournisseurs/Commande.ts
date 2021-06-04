import Utilisateur from "../Utilisateur";
import CommandeProduit from "./CommandeProduit";
import Fournisseur from "./Fournisseur";

export default interface Commande {
    
    id: number;
    dateCommande: number;
    dateConfirmedByFournisseur: number;
    confirmedByFournisseur: boolean;
    fournisseur : Fournisseur;
    utilisateur : Utilisateur;
    listeCommandeProduit:CommandeProduit[];
    archive : boolean;
    dateArchive : number;
  }