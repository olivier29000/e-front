import Utilisateur from "../Utilisateur";
import EtatEvent from "./EtatEvent";

export default interface EventDto {

    id:number;
    start : number;
    end : number;
    utilisateur : Utilisateur;
    etatEvent : EtatEvent;

}