import Utilisateur from "../Utilisateur";

export default interface NoteContactRepertoire {

    id: number;

    note: string;

    dateNote: number;

    utilisateur : Utilisateur

}