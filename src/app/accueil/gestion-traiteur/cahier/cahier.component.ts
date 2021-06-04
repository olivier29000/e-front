import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Etiquette from 'app/models/traiteur/Etiquette';
import { NgbDateCustomParserFormatter } from 'app/services/dateformat';
import { TraiteurService } from 'app/services/traiteur.service';
import { Subscription } from 'rxjs';

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

  constructor(
    private calendar: NgbCalendar,
    public modalService: NgbModal,
    private traiteurService : TraiteurService) {
      this.ngbDateCourante = calendar.getToday();
     }


  ngOnInit(): void {
    this.getAllEtiquetteByDateFermeturePrevu(new Date().getTime())
  }

  addDayToDateCourante(nbDays : number){
    const jsDate = new Date(this.ngbDateCourante.year, this.ngbDateCourante.month - 1, this.ngbDateCourante.day);
    let newDate : Date =  new Date(new Date(this.ngbDateCourante.year, this.ngbDateCourante.month - 1, this.ngbDateCourante.day).getTime() + (nbDays * 24 * 3600 * 1000));
    this.ngbDateCourante = { day: newDate.getDate(), month: newDate.getMonth() + 1, year: newDate.getFullYear()};
    this.getAllEtiquetteByDateFermeturePrevu(newDate.getTime())
  }

  openModalEtiquette(etiquette : Etiquette){
  }

  selectDate(newDate){
    this.getAllEtiquetteByDateFermeturePrevu(new Date(newDate.year, newDate.month - 1, newDate.day).getTime())
  }
  
  getAllEtiquetteByDateFermeturePrevu(date : number){
    this.listeEtiquette = []
    this.requeteEnCours = true
    this.traiteurService.getAllEtiquetteByDateFermeturePrevu(date).subscribe(
      listeEtiquette => {
        this.listeEtiquette = listeEtiquette
        this.requeteEnCours = false
      },
      err => this.requeteEnCours = false
    )
  }


}
