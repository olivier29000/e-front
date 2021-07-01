import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import EtatEvent from 'app/models/calendar/EtatEvent';
import EventPost from 'app/models/calendar/EventPost';
import Utilisateur from 'app/models/Utilisateur';
import { CalendarService } from 'app/services/calendar.service';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-nouvel-event',
  templateUrl: './nouvel-event.component.html',
  styleUrls: ['./nouvel-event.component.scss']
})
export class NouvelEventComponent implements OnInit {

  @Input() event : EventPost;
  
  @Input() utilisateur : Utilisateur;

  listeEtatEvent : EtatEvent[]

  requeteEnCours : boolean = false

  constructor(
    public activeModal: NgbActiveModal,
    private utilsService : UtilsService,
    private calendarService : CalendarService
    ) { }

  ngOnInit(): void {
    this.calendarService.getAllEtatEvent().subscribe(
      listeEtatEvent => {
        this.listeEtatEvent = listeEtatEvent
        this.event.etatEvent = this.listeEtatEvent[0]
      }
    )
  }

  selectEtatEvent(etatEvent : EtatEvent){
    this.event.etatEvent = etatEvent
  }

  getDateString(dateNumber : number) : string{
    return this.utilsService.getDateStringWithHour(dateNumber)
  }

  fermer(){
    this.activeModal.close()
  }

  postEvent(){
    this.requeteEnCours = true
    this.calendarService.postEventByIdUtilisateur(this.event, this.utilisateur.id).subscribe(
      res => {
        this.requeteEnCours = false;
        this.fermer()
      },
      err => this.requeteEnCours = false
    )
  }
}
