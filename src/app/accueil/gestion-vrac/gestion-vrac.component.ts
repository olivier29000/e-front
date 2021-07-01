import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProduitVrac from 'app/models/vrac/ProduitVrac';
import { NouvelleEtiquetteVracComponent } from './nouvelle-etiquette-vrac/nouvelle-etiquette-vrac.component';

@Component({
  selector: 'app-gestion-vrac',
  templateUrl: './gestion-vrac.component.html',
  styleUrls: ['./gestion-vrac.component.scss']
})
export class GestionVracComponent implements OnInit {

  listeProduitVrac : ProduitVrac[]

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
    const modalRef = this.modalService.open(NouvelleEtiquetteVracComponent, {centered : true, size: 'lg', backdrop: 'static' });
    modalRef.result.then(() => {
    },
     (reason) => {
      console.log(reason)
    });
  }
}

