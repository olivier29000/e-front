import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import ContactRepertoire from 'app/models/repertoire/ContactRepertoire';
import { RepertoireService } from 'app/services/repertoire.service';

@Component({
  selector: 'app-nouveau-contact-repertoire',
  templateUrl: './nouveau-contact-repertoire.component.html',
  styleUrls: ['./nouveau-contact-repertoire.component.scss']
})
export class NouveauContactRepertoireComponent implements OnInit {

  @Input() contactRepertoire : ContactRepertoire;

  //ERREURS
  errorPostContactRepertoire : string = "";
  errorEntreprise : string = "";
  errorNom : string = "";
  errorPrenom : string = "";
  errorTelephone : string = "";
  errorEmail : string = "";
  errorTypeContact : string = "";

  listeTypeContact : string[]
  
  constructor(
    private activeModal: NgbActiveModal,
    private repertoireService : RepertoireService
    ) { }

  ngOnInit(): void {
    if(this.contactRepertoire == undefined){
      this.contactRepertoire = {} as ContactRepertoire;
    }
    this.actualiserListeTypeContact()
  }

  validerContactRepertoire(){
      this.repertoireService.postContactRepertoire(this.contactRepertoire).subscribe(
        res => this.activeModal.close(),
        error => this.errorPostContactRepertoire = "il y a eu un problème lors de la création du contact"
      )
  }
  
  closeModal(){
    this.activeModal.close()
  }

  
  actualiserListeTypeContact(){
    this.repertoireService.getListeTypeContact().subscribe(
      listeTypeContact => {
        this.listeTypeContact = listeTypeContact
      }
    )
  }

}

