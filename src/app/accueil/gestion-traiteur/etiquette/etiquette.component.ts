import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Etiquette from 'app/models/traiteur/Etiquette';
import Allergene from 'app/models/traiteur/Allergene';
import Image from 'app/models/Image';
import { TraiteurService } from 'app/services/traiteur.service';
import { NouvelleEtiquetteComponent } from '../nouvelle-etiquette/nouvelle-etiquette.component';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-etiquette',
  templateUrl: './etiquette.component.html',
  styleUrls: ['./etiquette.component.scss']
})
export class EtiquetteComponent implements OnInit {

  
  @Input() etiquetteCourante : Etiquette;

  listeDesAllergenesEtiquette : Allergene[] = []
  
  listeDesAllergenesDisponibles : Allergene[] = []

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private http : HttpClient,
    private etiquetteService : TraiteurService,
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
    this.etiquetteService.indiquerEtiquetteTermineeByIdEtiquette(idEtiquette).subscribe(
      res => this.activeModal.close()
    )
  }

  indiquerEtiquetteOuverteByIdEtiquette(idEtiquette : number){
    this.etiquetteService.indiquerEtiquetteOuverteByIdEtiquette(idEtiquette).subscribe(
      res => this.activeModal.close()
    )
  }

  modifier(){
    const modalRef = this.modalService.open(NouvelleEtiquetteComponent, { size: 'lg', backdrop: 'static' });
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
