import EvenementEmploye from "./EvenementEmploye";
import ResumeEmploye from "./SemaineEmploye";

export default interface Employe {

    id:number;
    nom:string;
    listeResumeEmploye : ResumeEmploye[];
    isActif:boolean
}