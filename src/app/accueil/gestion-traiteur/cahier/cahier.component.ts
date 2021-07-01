import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Image from 'app/models/Image';
import Etiquette from 'app/models/traiteur/Etiquette';
import { NgbDateCustomParserFormatter } from 'app/services/dateformat';
import { TraiteurService } from 'app/services/traiteur.service';
import { UtilsService } from 'app/services/utils.service';
import { Subscription } from 'rxjs';
import { EtiquetteComponent } from '../etiquette/etiquette.component';
import { NouvelleEtiquetteComponent } from '../nouvelle-etiquette/nouvelle-etiquette.component';

@Component({
  selector: 'app-cahier',
  templateUrl: './cahier.component.html',
  styleUrls: ['./cahier.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class CahierComponent implements OnInit {

  
  
  listeEtiquette : Etiquette[] = [];

  requeteEnCours : boolean = false;

  dateCourante : number

  ngbDateCourante: NgbDateStruct = undefined;

  paginationCourante : number = 1;

  nbPaginations : number = 0

  nbElementParPagination : number = 20

  onlyEtiquetteOpen : boolean = true;

  constructor(
    private calendar: NgbCalendar,
    public modalService: NgbModal,
    private utilsService : UtilsService,
    private traiteurService : TraiteurService) {
      this.ngbDateCourante = calendar.getToday();
     }


  ngOnInit(): void {
    const jsDate = new Date(this.ngbDateCourante.year, this.ngbDateCourante.month - 1, this.ngbDateCourante.day).getTime();
    
    this.listeEtiquette = []
    this.requeteEnCours = true
    this.initListeEtiquette()
  }

  changeOnlyEtiquetteOpen(){
    this.onlyEtiquetteOpen = !this.onlyEtiquetteOpen
    this.initListeEtiquette()
  }

  initListeEtiquette(){
    this.listeEtiquette = []
    this.requeteEnCours = true
    const jsDate = new Date(this.ngbDateCourante.year, this.ngbDateCourante.month - 1, this.ngbDateCourante.day).getTime();
    this.traiteurService.getAllEtiquetteByDateFermeturePrevu(this.onlyEtiquetteOpen, jsDate, this.paginationCourante, this.nbElementParPagination).subscribe(
      listeEtiquette => {
        this.listeEtiquette = listeEtiquette
        this.requeteEnCours = false
      },
      err => this.requeteEnCours = false
    )
    this.traiteurService.getNbPaginationsByDateFermeturePrevu(this.onlyEtiquetteOpen, jsDate, this.nbElementParPagination).subscribe(
      nbPaginations => {
        this.nbPaginations = nbPaginations
      },
      err => this.requeteEnCours = false
    )
  }

  openImage(image : Image){
    this.utilsService.openImage(image)
  }

  addDayToDateCourante(nbDays : number){
    const jsDate = new Date(this.ngbDateCourante.year, this.ngbDateCourante.month - 1, this.ngbDateCourante.day);
    let newDate : Date =  new Date(new Date(this.ngbDateCourante.year, this.ngbDateCourante.month - 1, this.ngbDateCourante.day).getTime() + (nbDays * 24 * 3600 * 1000));
    this.ngbDateCourante = { day: newDate.getDate(), month: newDate.getMonth() + 1, year: newDate.getFullYear()};
    this.initListeEtiquette()
  }

  openModalEtiquette(etiquette : Etiquette){
    const modalRef = this.modalService.open(EtiquetteComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etiquetteCourante = etiquette;
    modalRef.result.then(() => {
      this.initListeEtiquette()
    },
     (reason) => {
      this.initListeEtiquette()
      console.log(reason)
    });
  }

  getDateString(dateNumber : number) : string{
    return this.utilsService.getDateString(dateNumber)
  }

  selectDate(newDate){
    this.getAllEtiquetteByDateFermeturePrevu(new Date(newDate.year, newDate.month - 1, newDate.day).getTime())
  }

  getAllEtiquetteByDateFermeturePrevuAndPagination(pagination : number){
    const jsDate = new Date(this.ngbDateCourante.year, this.ngbDateCourante.month - 1, this.ngbDateCourante.day).getTime();
    this.traiteurService.getAllEtiquetteByDateFermeturePrevu(this.onlyEtiquetteOpen, jsDate, pagination, this.nbElementParPagination).subscribe(
      listeEtiquette => {
        this.listeEtiquette = listeEtiquette
        this.requeteEnCours = false
      },
      err => this.requeteEnCours = false
    )
  }
  
  getAllEtiquetteByDateFermeturePrevu(date : number){
    this.listeEtiquette = []
    this.requeteEnCours = true
    this.initListeEtiquette()
  }


}
