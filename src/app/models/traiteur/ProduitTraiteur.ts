import Produit from "../fournisseurs/Produit";
import Image from "../Image";
import Allergene from "./Allergene";

export default interface ProduitTraiteur extends Produit{

    image : Image;

    listeAllergene : Allergene[];

    prixAchat : string;

    prixVente : string;

    emplacementVitrine : string;
}