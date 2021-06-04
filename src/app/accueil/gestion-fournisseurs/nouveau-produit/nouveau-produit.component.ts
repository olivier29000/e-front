import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Produit from 'app/models/fournisseurs/produit';
import { ProduitService } from 'app/services/produit.service';

@Component({
  selector: 'app-nouveau-produit',
  templateUrl: './nouveau-produit.component.html',
  styleUrls: ['./nouveau-produit.component.scss']
})
export class NouveauProduitComponent implements OnInit {

  @Input() idProduit : number;
  @Input() idFournisseur : number;

  produit : Produit = {} as Produit;

  errorPostProduit : string = "" ;
  errorCategorie : string = "" ;
  errorReference : string = "" ;
  errorNom : string = "" ;
  errorNbProduitParLot : string = "" ;

  constructor(
    private activeModal: NgbActiveModal,
    private produitService : ProduitService) { }

  ngOnInit(): void {
    if(this.idProduit != undefined){
      this.produitService.getproduitByIdProduit(this.idProduit).subscribe(
        produit => this.produit = produit
      )
    }
  }

  closeModal(){
    this.activeModal.close()
  }

  validerProduit(){
    this.produitService.postproduitByIdFournisseur(this.produit, this.idFournisseur).subscribe(
      res => this.activeModal.close(),
      error => this.errorPostProduit = "il y a eu un problème lors de la création du produit"
    )
  }

  isStringCorrect(val : string){
    if(val && val != "" && val.length<250){
      return true;
    }else{
      return false;
    }
  }
  isNumberCorrect(val : number){
    if(val && val != 0){
      return true;
    }else{
      return false;
    }
  }

}
