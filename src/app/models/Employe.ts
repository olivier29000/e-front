import EvenementEmploye from "./EvenementEmploye";
import ResumeEmploye from "./ResumeSemaineUtilisateur";

export default interface Employe {

    id:number;
    nomPrenom:string;
    listeResumeEmploye : ResumeEmploye[];
    isActif:boolean
}