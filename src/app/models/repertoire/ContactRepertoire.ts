import NoteContactRepertoire from "./NoteContactRepertoire";

export default interface ContactRepertoire {

    id: number;

    entreprise: string;

    nomPrenom: string;

    telephone: string;

    email: string;

    typeContact : string;

    listeNoteContactRepertoire : NoteContactRepertoire[]

  }