import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import EmplacementVrac from 'app/models/vrac/EmplacementVrac';
import EtiquetteVrac from 'app/models/vrac/EtiquetteVrac';
import { UtilsService } from 'app/services/utils.service';
import { VracService } from 'app/services/vrac.service';
import { Observable, Subscription } from 'rxjs';
import { EtiquetteVracComponent } from '../etiquette-vrac/etiquette-vrac.component';

@Component({
  selector: 'app-vitrine-vrac',
  templateUrl: './vitrine-vrac.component.html',
  styleUrls: ['./vitrine-vrac.component.scss']
})
export class VitrineVracComponent implements OnInit {

  dateCouranteSub: Subscription;
  
  listeEmplacementVrac : EmplacementVrac[] = []

  listeEtiquetteVracEtale1 : EtiquetteVrac[];
  listeEtiquetteVracEtale2 : EtiquetteVrac[];
  listeEtiquetteVracEtale3 : EtiquetteVrac[];
  listeEtiquetteVracEtale4 : EtiquetteVrac[];
  listeEtiquetteVracEtale5 : EtiquetteVrac[];

  constructor(private utilsService : UtilsService,
    private vracService : VracService,
    public modalService: NgbModal) { }

  ngOnInit(): void {
    this.initListeEtiquette()
  }

  openModalEtiquette(etiquette : EtiquetteVrac){
    const modalRef = this.modalService.open(EtiquetteVracComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etiquetteCourante = etiquette;
    modalRef.result.then(() => {
      this.initListeEtiquette()
    },
     (reason) => {
      this.initListeEtiquette()
    });
  }

  initListeEtiquette(){
    this.listeEmplacementVrac = []
    this.vracService.getAllEmplacementVrac().subscribe(
      listeEmplacementVrac => {
        listeEmplacementVrac.forEach(titreEmplacementVrac => {
          this.vracService.getAllEtiquetteVracByEmplacementVrac(titreEmplacementVrac).subscribe(
            listeEtiquette => {
              this.listeEmplacementVrac.push(
                {titreEmplacementVrac : titreEmplacementVrac,
                listeEtiquetteVrac : listeEtiquette} as EmplacementVrac)
            }
          )
        });
      }
    )
  }

  getAllEtiquetteVracByEmplacementVrac(emplacementVrac : string) : Observable<EtiquetteVrac[]>{
    return this.vracService.getAllEtiquetteVracByEmplacementVrac(emplacementVrac)
  }

  getColorByDate(etiquette : EtiquetteVrac) : string{
    
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
