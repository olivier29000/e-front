import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Email from 'app/models/Email';
import CommandeProduit from 'app/models/fournisseurs/CommandeProduit';
import { CommandeService } from 'app/services/commande.service';

@Component({
  selector: 'app-modal-mail',
  templateUrl: './modal-mail.component.html',
  styleUrls: ['./modal-mail.component.scss']
})
export class ModalMailComponent implements OnInit {

  @Input() emailFournisseur : Email;
  @Input() listeCommandeProduit : CommandeProduit[];


  errorMessage : string = "";
  errorDestinataire  : string = "";
  errorObjet : string = "";
  errorTextMail : string = "";

  
  constructor(public activeModal: NgbActiveModal,
    private commandeService : CommandeService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.close()
  }

  validerMail(){
    this.commandeService.postCommandeByListeCommandeProduit(this.listeCommandeProduit).subscribe(
        res => this.activeModal.close("200"),
        error => this.errorMessage = "Il y a eu un problème"
      )
  }

}
