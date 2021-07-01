import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Image from 'app/models/Image';
import EtiquetteVrac from 'app/models/vrac/EtiquetteVrac';
import { UtilsService } from 'app/services/utils.service';
import { VracService } from 'app/services/vrac.service';
import { EtiquetteVracComponent } from '../etiquette-vrac/etiquette-vrac.component';

@Component({
  selector: 'app-cahier-vrac',
  templateUrl: './cahier-vrac.component.html',
  styleUrls: ['./cahier-vrac.component.scss']
})
export class CahierVracComponent implements OnInit {

  
  
  listeEtiquette : EtiquetteVrac[] = [];

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
    private vracService : VracService) {
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
    this.vracService.getAllEtiquetteVracByDateFermeturePrevu(this.onlyEtiquetteOpen, jsDate, this.paginationCourante, this.nbElementParPagination).subscribe(
      listeEtiquette => {
        this.listeEtiquette = listeEtiquette
        this.requeteEnCours = false
      },
      err => this.requeteEnCours = false
    )
    this.vracService.getNbPaginationsByDateFermeturePrevu(this.onlyEtiquetteOpen, jsDate, this.nbElementParPagination).subscribe(
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

  openModalEtiquette(etiquette : EtiquetteVrac){
    const modalRef = this.modalService.open(EtiquetteVracComponent, { size: 'lg', backdrop: 'static' });
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
    this.vracService.getAllEtiquetteVracByDateFermeturePrevu(this.onlyEtiquetteOpen, jsDate, pagination, this.nbElementParPagination).subscribe(
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
