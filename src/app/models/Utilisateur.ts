import Logiciel from "./Logiciel";
import ResumeSemaineUtilisateur from "./ResumeSemaineUtilisateur";



/**
 * represente un utilisateur
 */
export default interface Utilisateur {
  
  id : number;

  email: string;

  nomPrenom : string;

  motDePasse : string;

  dateDebutContrat : number;

  dateFinContrat : number;

  couleur : string;

  listeLogiciel : Logiciel[];

  dureeTravailHebdo : number;

  resumeSemaineUtilisateur : ResumeSemaineUtilisateur;

}
