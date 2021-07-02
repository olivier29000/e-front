import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ContactRepertoire from 'app/models/repertoire/ContactRepertoire';
import NoteContactRepertoire from 'app/models/repertoire/NoteContactRepertoire';
import Utilisateur from 'app/models/Utilisateur';
import { AuthService } from 'app/services/auth.service';
import { RepertoireService } from 'app/services/repertoire.service';
import { UtilsService } from 'app/services/utils.service';
import { Subscription } from 'rxjs';
import { NouveauContactRepertoireComponent } from './nouveau-contact-repertoire/nouveau-contact-repertoire.component';
import { NouvelleNoteContactRepertoireComponent } from './nouvelle-note-contact-repertoire/nouvelle-note-contact-repertoire.component';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss']
})
export class RepertoireComponent implements OnInit {

  

  listeContactRepertoire : ContactRepertoire[];

  utilisateurConnecteSub : Subscription;

  utilisateurConnecte : Utilisateur;

  contactRepertoireCourant : ContactRepertoire

  typeContactCourant : string = ""

  listeTypeContact : string[]

  constructor(
    public modalService: NgbModal,
    private authService : AuthService,
    private repertoireService : RepertoireService,
    private utilsService : UtilsService) { }

  ngOnInit(): void {
    this.utilisateurConnecteSub = this.authService.subConnecte.subscribe(
      (utilisateurConnecte) => {
        this.utilisateurConnecte = utilisateurConnecte
        }
      , (error) => console.log(error)
    );
    this.actualiserListeContactRepertoire();
    this.actualiserListeTypeContact()
  }

  actualiserListeContactRepertoire(){
    this.repertoireService.getAllOrderByEntreprise().subscribe(
      listeContactRepertoire => {
        this.listeContactRepertoire = listeContactRepertoire
      }
    )
  }

  getAllByTypeContact(typeContact : string){
    if(this.typeContactCourant == typeContact){
      this.typeContactCourant = ""
      this.actualiserListeContactRepertoire();
      this.actualiserListeTypeContact()
    }else{
      this.typeContactCourant = typeContact
      this.repertoireService.getAllByTypeContact(typeContact).subscribe(
        listeContactRepertoire => {
          this.listeContactRepertoire = listeContactRepertoire
        }
      )
    }
    
  }

  actualiserListeTypeContact(){
    this.repertoireService.getListeTypeContact().subscribe(
      listeTypeContact => {
        this.listeTypeContact = listeTypeContact
      }
    )
  }

  openModalContactRepertoire(contactRepertoire? : ContactRepertoire){
    const modalRef = this.modalService.open(NouveauContactRepertoireComponent, { centered: true,size: 'lg', backdrop: 'static' });
    if(contactRepertoire == undefined){
      modalRef.componentInstance.contactRepertoire = undefined;
    }else{
      modalRef.componentInstance.contactRepertoire = contactRepertoire;
    }
    
    modalRef.result.then(() => {
      this.actualiserListeContactRepertoire();
      this.actualiserListeTypeContact()
    },
     (reason) => {
      this.actualiserListeContactRepertoire();
      this.actualiserListeTypeContact()
    });
  }

  openModalNoteContactRepertoire(contactRepertoire : ContactRepertoire, noteContactRepertoire? : NoteContactRepertoire){
    
    const modalRef = this.modalService.open(NouvelleNoteContactRepertoireComponent, { centered: true,size: 'lg', backdrop: 'static' });
    if(noteContactRepertoire == undefined){
      modalRef.componentInstance.noteContactRepertoire = undefined;
    }else{
      modalRef.componentInstance.noteContactRepertoire = noteContactRepertoire;
    }
    modalRef.componentInstance.contactRepertoire = contactRepertoire
    modalRef.result.then(() => {
      this.getListNote(this.contactRepertoireCourant);
    },
     (reason) => {
      this.getListNote(this.contactRepertoireCourant);
    });
  }

  getListNote(contactRepertoire : ContactRepertoire){
    this.listeContactRepertoire.forEach(c => c.listeNoteContactRepertoire == null)
    this.contactRepertoireCourant = contactRepertoire
    this.repertoireService.getListNoteByIdContactRepertoire(contactRepertoire.id).subscribe(
      listeNoteContactRepertoire => contactRepertoire.listeNoteContactRepertoire = listeNoteContactRepertoire
    )
  }

  
  getDateString(dateNumber : number) : string{
    if(dateNumber){
      return this.utilsService.getDateString(dateNumber)
    }else{
      return ""
    }
    
  }

}
