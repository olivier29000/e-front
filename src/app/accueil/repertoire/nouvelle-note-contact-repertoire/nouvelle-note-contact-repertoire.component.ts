import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import ContactRepertoire from 'app/models/repertoire/ContactRepertoire';
import NoteContactRepertoire from 'app/models/repertoire/NoteContactRepertoire';
import { RepertoireService } from 'app/services/repertoire.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nouvelle-note-contact-repertoire',
  templateUrl: './nouvelle-note-contact-repertoire.component.html',
  styleUrls: ['./nouvelle-note-contact-repertoire.component.scss']
})
export class NouvelleNoteContactRepertoireComponent implements OnInit {

  @Input() noteContactRepertoire : NoteContactRepertoire;
  @Input() contactRepertoire : ContactRepertoire;

  messageErreur : string;

  constructor(
    private activeModal: NgbActiveModal,
    private repertoireService : RepertoireService) { }

  ngOnInit(): void {
    if(this.noteContactRepertoire == undefined){
      this.noteContactRepertoire = {} as NoteContactRepertoire
    }
  }

  postNote(){
    this.repertoireService.postNoteContactRepertoire(this.noteContactRepertoire, this.contactRepertoire.id).subscribe(
      res => this.closeModal(),
      err => swal.fire('ça n\'a pas fonctionné... vous ne pouvez modifier une note que si vous en êtes l\'auteur')
    )
  }
  
  closeModal(){
    this.activeModal.close()
  }

}
