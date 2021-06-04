import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProduitTraiteur from 'app/models/traiteur/ProduitTraiteur';
import { NouvelleEtiquetteComponent } from './nouvelle-etiquette/nouvelle-etiquette.component';

@Component({
  selector: 'app-gestion-traiteur',
  templateUrl: './gestion-traiteur.component.html',
  styleUrls: ['./gestion-traiteur.component.scss']
})
export class GestionTraiteurComponent implements OnInit {

  listeProduitTraiteur : ProduitTraiteur[]

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  fetchNews(evt: any) {
    if(evt.nextId == "VITRINE"){
      
    }else if(evt.nextId == "CAHIER"){
      
    }else if(evt.nextId == "LISTE D'ETIQUETTE"){
      
    }else if(evt.nextId == "LISTE DE PRODUITS"){
      
    }
    
  }

  openNouvelleEtiquette(){
    const modalRef = this.modalService.open(NouvelleEtiquetteComponent, {centered : true, size: 'lg', backdrop: 'static' });
    modalRef.result.then(() => {
    },
     (reason) => {
      console.log(reason)
    });
  }
}
