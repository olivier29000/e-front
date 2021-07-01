import Produit from "./Produit";

export default interface Fournisseur {

    id: number;

    entreprise: string;

    nomPrenom: string;

    telephone: string;

    email: string;

    codeClient : string;

    listeProduit : Produit[]
    
    listeDateCommandePrecedentes : number[];

  }