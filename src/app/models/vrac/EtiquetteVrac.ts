import Image from "../Image";
import Utilisateur from "../Utilisateur";
import ProduitVrac from "./ProduitVrac";

export default interface EtiquetteVrac {

    id : number;

    image : Image;

    produitVrac : ProduitVrac;

    dateOuverture : number;
    dateFermeturePrevu : number;
    utilisateurOuverture : Utilisateur;

    dateFermetureEffective : number;
    utilisateurFermeture : Utilisateur;

    numeroDeLot : string;

    ferme : boolean;
    
}
