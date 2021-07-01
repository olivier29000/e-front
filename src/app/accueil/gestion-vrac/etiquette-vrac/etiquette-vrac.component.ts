import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Image from 'app/models/Image';
import Allergene from 'app/models/traiteur/Allergene';
import EtiquetteVrac from 'app/models/vrac/EtiquetteVrac';
import { UtilsService } from 'app/services/utils.service';
import { VracService } from 'app/services/vrac.service';
import { NouvelleEtiquetteVracComponent } from '../nouvelle-etiquette-vrac/nouvelle-etiquette-vrac.component';

@Component({
  selector: 'app-etiquette-vrac',
  templateUrl: './etiquette-vrac.component.html',
  styleUrls: ['./etiquette-vrac.component.scss']
})
export class EtiquetteVracComponent implements OnInit {

  
  @Input() etiquetteCourante : EtiquetteVrac;

  listeDesAllergenesEtiquette : Allergene[] = []
  
  listeDesAllergenesDisponibles : Allergene[] = []

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private etiquetteService : VracService,
    private utilsService : UtilsService) { }

  ngOnInit(): void {
  }

  

  getDateString(dateNumber : number) : string{
    return this.utilsService.getDateString(dateNumber)
  }

  
  openImage(image : Image){
    this.utilsService.openImage(image)
  }

  indiquerEtiquetteTermineeByIdEtiquette(idEtiquette : number){
    this.etiquetteService.indiquerEtiquetteVracTermineeByIdEtiquetteVrac(idEtiquette).subscribe(
      res => this.activeModal.close()
    )
  }

  indiquerEtiquetteOuverteByIdEtiquette(idEtiquette : number){
    this.etiquetteService.indiquerEtiquetteVracOuverteByIdEtiquetteVrac(idEtiquette).subscribe(
      res => this.activeModal.close()
    )
  }

  modifier(){
    const modalRef = this.modalService.open(NouvelleEtiquetteVracComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etiquetteCourante = this.etiquetteCourante;
    modalRef.result.then(() => {
      this.fermer()
    },
     (reason) => {
      console.log(reason)
    });
    
  }

  fermer(){
    this.activeModal.close()
  }
}

