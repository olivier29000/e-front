import Commande from "./Commande";
import Produit from "./Produit";

export default interface CommandeProduit {
    
    nbLot: number;
    produit: Produit;
    
  }