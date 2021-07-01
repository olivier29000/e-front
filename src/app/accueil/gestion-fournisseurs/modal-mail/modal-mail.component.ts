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

  requeteEnCours : boolean = false;

  errorMessage : string = "";
  errorDestinataire  : string = "";
  errorObjet : string = "";
  errorTextMail : string = "";

  
  constructor(public activeModal: NgbActiveModal,
    private commandeService : CommandeService) { }

  ngOnInit(): void {
    console.log(this
      .emailFournisseur)
  }

  closeModal(){
    this.activeModal.close()
  }

  validerMail(){
    this.requeteEnCours = true;
    this.commandeService.postCommandeByListeCommandeProduit(this.listeCommandeProduit).subscribe(
        res => {
          this.activeModal.close("200")
          this.requeteEnCours = false;
        },
        error => {
          this.errorMessage = "Il y a eu un problème"
          this.requeteEnCours = false;
        }
      )
  }

}
