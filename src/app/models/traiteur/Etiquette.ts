import Image from "../Image";
import Utilisateur from "../Utilisateur";
import ProduitTraiteur from "./ProduitTraiteur";

export default interface Etiquette {

    id : number;

    image : Image;

    produitTraiteur : ProduitTraiteur;

    dateOuverture : number;
    dateFermeturePrevu : number;
    utilisateurOuverture : Utilisateur;

    dateFermetureEffective : number;
    utilisateurFermeture : Utilisateur;

    numeroDeLot : string;

    ferme : boolean;
    
}
