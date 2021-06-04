import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Fournisseur from 'app/models/fournisseurs/Fournisseur';
import { FournisseurService } from 'app/services/fournisseur.service';

@Component({
  selector: 'app-nouveau-fournisseur',
  templateUrl: './nouveau-fournisseur.component.html',
  styleUrls: ['./nouveau-fournisseur.component.scss']
})
export class NouveauFournisseurComponent implements OnInit {

  @Input() idFournisseur : number;

  fournisseur : Fournisseur = {} as Fournisseur;

  //ERREURS
  errorPostFournisseur : string = "";
  errorEntreprise : string = "";
  errorNom : string = "";
  errorPrenom : string = "";
  errorTelephone : string = "";
  errorEmail : string = "";
  errorCodeClient : string = "";
  
  constructor(
    private activeModal: NgbActiveModal,
    private fournisseurService : FournisseurService
    ) { }

  ngOnInit(): void {
    if(this.idFournisseur != undefined){
      this.fournisseurService.getfournisseurByIdFournisseur(this.idFournisseur).subscribe(
        fournisseur => this.fournisseur = fournisseur
      )
    }
  }

  validerFournisseur(){
      this.fournisseurService.postFournisseur(this.fournisseur).subscribe(
        res => this.activeModal.close(),
        error => this.errorPostFournisseur = "il y a eu un problème lors de la création du fournisseur"
      )
  }
  
  closeModal(){
    this.activeModal.close()
  }

}
