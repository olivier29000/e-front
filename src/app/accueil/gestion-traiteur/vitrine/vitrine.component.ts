import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import EmplacementVitrine from 'app/models/traiteur/EmplacementVitrine';
import Etiquette from 'app/models/traiteur/Etiquette';
import { TraiteurService } from 'app/services/traiteur.service';
import { UtilsService } from 'app/services/utils.service';
import { Observable, Subscription } from 'rxjs';
import { EtiquetteComponent } from '../etiquette/etiquette.component';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.scss']
})
export class VitrineComponent implements OnInit {

  
  dateCouranteSub: Subscription;
  
  listeEmplacementVitrine : EmplacementVitrine[] = []

  listeEtiquetteFromage : Etiquette[];
  listeEtiquettePatisseries : Etiquette[];
  listeEtiquetteSalades : Etiquette[] = [];
  listeEtiquettePlatsPrepares : Etiquette[];
  listeEtiquetteBoucherie : Etiquette[];
  listeEtiquetteCharcuterie : Etiquette[];

  constructor(private utilsService : UtilsService,
    private traiteurService : TraiteurService,
    public modalService: NgbModal) { }

  ngOnInit(): void {
    this.initListeEtiquette()
  }


  getAllEtiquetteByEmplacementVitrine(emplacementVitrine : string) : Observable<Etiquette[]>{
    return this.traiteurService.getAllEtiquetteByEmplacementVitrine(emplacementVitrine)
  }

  openModalEtiquette(etiquette : Etiquette){
    const modalRef = this.modalService.open(EtiquetteComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etiquetteCourante = etiquette;
    modalRef.result.then(() => {
      this.initListeEtiquette()
    },
     (reason) => {
      this.initListeEtiquette()
    });
  }

  initListeEtiquette(){
    this.listeEmplacementVitrine = []
    this.traiteurService.getAllEmplacementVitrine().subscribe(
      listeTitreEmplacementVitrine => {
        listeTitreEmplacementVitrine.forEach(titreEmplacementVitrine => {
          this.traiteurService.getAllEtiquetteByEmplacementVitrine(titreEmplacementVitrine).subscribe(
            listeEtiquette => {
              this.listeEmplacementVitrine.push(
                {titreEmplacementVitrine : titreEmplacementVitrine,
                listeEtiquette : listeEtiquette} as EmplacementVitrine)
            }
          )
        });
      }
    )
  }


  getColorByDate(etiquette : Etiquette) : string{
    
    let nbMillisecondsDifference : number = etiquette.dateFermeturePrevu - new Date().getTime()
    if(nbMillisecondsDifference < 0 ){
      return "#FF0000"
    }else if(nbMillisecondsDifference < 86400000) {
      return "#ffa500"
    }else if(nbMillisecondsDifference < (2 * 86400000)) {
      return "#ffff00"
    }else{
      return "#ffffff"
    }
  }

  getDateString(dateNumber : number) : string{
    return this.utilsService.getDateString(dateNumber)
  }
}
