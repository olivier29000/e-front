import Produit from "../fournisseurs/Produit";
import Image from "../Image";
import Allergene from "../traiteur/Allergene";

export default interface ProduitVrac extends Produit{

    image : Image;

    listeAllergene : Allergene[];

    prixAchat : string;

    prixVente : string;

    emplacementVrac : string;
}