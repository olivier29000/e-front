import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import EtatEvent from 'app/models/calendar/EtatEvent';
import EventDto from 'app/models/calendar/EventDto';
import EventPost from 'app/models/calendar/EventPost';
import Utilisateur from 'app/models/Utilisateur';
import { CalendarService } from 'app/services/calendar.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { UtilsService } from 'app/services/utils.service';
import swal from 'sweetalert2';
import { NouvelEventComponent } from './nouvel-event/nouvel-event.component';
import * as moment from 'moment';
import { NgbDateCustomParserFormatter } from 'app/services/dateformat';

declare var $: any;


@Component({
  selector: 'app-gestion-des-calendriers',
  templateUrl: './gestion-des-calendriers.component.html',
  styleUrls: ['./gestion-des-calendriers.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class GestionDesCalendriersComponent implements OnInit {

  listeEventAllUtilisateur : EventDto[]

  listeEventUtilisateurCourant : EventDto[]

  listeUtilisateur : Utilisateur[]

  utilisateurCourant : Utilisateur;

  listeEtatEvent : EtatEvent[];

  etatEventCourant : EtatEvent;

  intervalStart : number = 0;

  intervalEnd : number = 0;
  
  selectedDateJourCopie: NgbDateStruct = undefined;
  
  erreurCopie = ""

  constructor(
    public modalService: NgbModal,
    private calendar: NgbCalendar,
    private calendarService : CalendarService,
    private utilisateurService : UtilisateurService,
    private utilsService : UtilsService) {
      this.selectedDateJourCopie = calendar.getToday()
     }

  ngOnInit(): void {
   
    this.calendarService.getAllEtatEvent().subscribe(
      listeEtatEvent => {
        this.listeEtatEvent = listeEtatEvent
        this.etatEventCourant = this.listeEtatEvent[0]
        this.calendarService.getAllEventAllUtilisateurByIdEtatEvent(this.etatEventCourant.id, this.intervalStart, this.intervalEnd).subscribe(
          listeEventAllUtilisateur => {
            this.listeEventAllUtilisateur = listeEventAllUtilisateur
    
            var $calendar = $('#fullCalendar');
        
            var today = new Date();
            var y = today.getFullYear();
            var m = today.getMonth();
            var d = today.getDate();
            $calendar.fullCalendar({
              viewRender: (view, element) => {
                if (view.name != 'month'){
                    var $fc_scroller = $('.fc-scroller');
                    $fc_scroller.perfectScrollbar();
                }
                this.intervalStart = moment(new Date(view.dayGrid.dayDates[0])).valueOf()
                this.intervalEnd =  moment(new Date(view.dayGrid.dayDates[view.dayGrid.dayDates.length - 1])).valueOf()
                this.changeView(new Date(view.dayGrid.dayDates[0]).toISOString().slice(0, 10))
                $(".fc-left h2").text(this.getTitle());
              },
              firstDay : 1,
              slotLabelFormat:"HH:mm",
              columnHeaderText: (mom) => {
                return this.getDateStringJourMois(mom.valueOf())
              },
              defaultView : 'agendaWeek',
              header: {
                left: 'title',
                right: 'prev,next,today'
              },
              defaultDate: today,
              selectable: true,
              selectHelper: true,
                views: {
                  month: { // name of view
                    titleFormat: 'MMMM YYYY'
                    // other view-specific options here
                  },
                  week: {
                    titleFormat: " MMMM D YYYY"
                  },
                  day: {
                    titleFormat: 'D MMM, YYYY'
                  }
                },
              editable: false,
              eventLimit: true, // allow "more" link when too many events
                    // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
              events: this.listeEventAllUtilisateur,
              timeFormat: 'HH:mm'
            });
          }
        )
      }
    )

    this.utilisateurService.getAllUtilisateur().subscribe(
      listeUtilisateur => {
        this.listeUtilisateur = listeUtilisateur
        this.utilisateurCourant = this.listeUtilisateur[0]
        this.calendarService.getAllEventByUtilisateurForGestionCalendrier(this.utilisateurCourant.id, this.intervalStart, this.intervalEnd).subscribe(
          listeEventUtilisateurCourant => {
            this.listeEventUtilisateurCourant = listeEventUtilisateurCourant
    
            var $calendar = $('#calendarUtilisateur');
        
            var today = new Date();
            var y = today.getFullYear();
            var m = today.getMonth();
            var d = today.getDate();
            $calendar.fullCalendar({
              viewRender: (view, element) =>   {
                // We make sure that we activate the perfect scrollbar when the view isn't on Month
                if (view.name != 'month'){
                    var $fc_scroller = $('.fc-scroller');
                    $fc_scroller.perfectScrollbar();
                }
                this.intervalStart = moment(new Date(view.dayGrid.dayDates[0])).valueOf()
                this.intervalEnd =  moment(new Date(view.dayGrid.dayDates[view.dayGrid.dayDates.length - 1])).valueOf()
                this.changeView(new Date(view.dayGrid.dayDates[0]).toISOString().slice(0, 10))
                $(".fc-left h2").text(this.getTitle());
              },
              firstDay : 1,
              slotLabelFormat:"HH:mm",
              columnHeaderText: (mom) => {
                return this.getDateStringJourMois(mom.valueOf())
              },
              defaultView : 'agendaWeek',
              header: {
                left: 'title',
                right: 'prev,next,today'
              },
              defaultDate: today,
              selectable: true,
              selectHelper: true,
                views: {
                  month: { // name of view
                    titleFormat: 'MMMM YYYY'
                    // other view-specific options here
                  },
                  week: {
                    titleFormat: " MMMM D YYYY"
                  },
                  day: {
                    titleFormat: 'D MMM, YYYY'
                  }
                },
              select: (start, end, allDay, obj) =>  {
                let event = {} as EventDto
                event.start = start.valueOf()
                event.end = end.valueOf()
                this.nouvelEvent(event)
              },
              eventResize: (event) => {
                let eventPost = {} as EventPost
                eventPost.id = event.id
                eventPost.start = event.start.valueOf()
                eventPost.end = event.end.valueOf()
                this.modifEvent(eventPost)
              },
              eventDrop: (event) => {
                let eventPost = {} as EventPost
                eventPost.id = event.id
                eventPost.start = event.start.valueOf()
                eventPost.end = event.end.valueOf()
                this.modifEvent(eventPost)
              },
              eventClick:(info) =>  {
                swal.fire({
                  title: 'Supprimer?',
                  text: info.title + " du " + this.getDateString(info.start.valueOf()) + " au " + this.getDateString(info.end.valueOf()) ,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Oui, supprimer!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.deleteEventById(info.id)
                  }
                })
              },
              editable: true,
              eventLimit: true, // allow "more" link when too many events
                    // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
              events: this.listeEventUtilisateurCourant,
              timeFormat: 'HH:mm'
            });
          }
        )
        this.listeUtilisateur.forEach(utilisateur => {
          this.getResumeSemaineUtilisateur(utilisateur)
        });
      }
    )

    
  }

  selectDateJourCopie(newDate){
    this.selectedDateJourCopie = newDate
    
  }

  validerCopieSemaine(){
    this.erreurCopie = ""
    this.calendarService.copieSemaineByIdUtilisateur(
      new Date(this.selectedDateJourCopie.year, this.selectedDateJourCopie.month - 1, this.selectedDateJourCopie.day).getTime(),
      this.intervalStart,
       this.utilisateurCourant.id).subscribe(
         res => {
          this.changeListeEventsUtilisateurCourant()
          this.changeListeEventsAllUtilisateur()
          this.changeListeResumeSemaineUtilisateur()
         },
         err => this.erreurCopie = "il y a eu un problème lors de la copie"
       )
  }

  changeView(start : string){
    $('#calendarUtilisateur').fullCalendar('changeView', 'agendaWeek', start);
    $('#fullCalendar').fullCalendar('changeView', 'agendaWeek', start);
    this.changeListeEventsUtilisateurCourant()
    this.changeListeEventsAllUtilisateur()
    this.changeListeResumeSemaineUtilisateur()
  }

  getDateString(dateNumber : number) : string{
    return this.utilsService.getDateString(dateNumber)
  }

  getDateStringJourMois(dateNumber : number) : string{
    return this.utilsService.getDateStringJourMois(dateNumber)
  }
  
  getTitle() : string{
    return this.utilsService.getTitleCalendar(this.intervalStart, this.intervalEnd)
  }

  deleteEventById(idEvent : number){
    this.calendarService.deleteEventById(idEvent).subscribe(
      res => {
        this.changeListeEventsUtilisateurCourant()
        this.changeListeEventsAllUtilisateur()
        this.changeListeResumeSemaineUtilisateur()
      },
      err => err
    )
  }

  modifEvent(eventPost : EventPost){
    this.calendarService.postEventByIdUtilisateur(eventPost, this.utilisateurCourant.id).subscribe(
      res => {
        this.changeListeEventsUtilisateurCourant()
        this.changeListeEventsAllUtilisateur()
        this.changeListeResumeSemaineUtilisateur()
      },
      err => err
    )
  }


  nouvelEvent(event : EventDto){
    const modalRef = this.modalService.open(NouvelEventComponent, { centered: true,size: 'lg', backdrop: 'static' });
    if(event != undefined){
      modalRef.componentInstance.event = event;
      modalRef.componentInstance.utilisateur = this.utilisateurCourant;
    }
    modalRef.result.then(() => {
      this.changeListeEventsUtilisateurCourant()
      this.changeListeEventsAllUtilisateur()
      this.changeListeResumeSemaineUtilisateur()
    },
     (reason) => {
      console.log(reason)
    });
  }

  changeEtatEventCourant(etatEvent : EtatEvent){
    this.etatEventCourant = etatEvent
    this.changeListeEventsAllUtilisateur()
  }

  changeUtilisateurCourant(utilisateur : Utilisateur){
    this.utilisateurCourant = utilisateur
    this.changeListeEventsUtilisateurCourant()
  }

  changeListeEventsAllUtilisateur(){
    this.calendarService.getAllEventAllUtilisateurByIdEtatEvent(this.etatEventCourant.id, this.intervalStart, this.intervalEnd).subscribe(
      listeEventAllUtilisateur => {
        this.listeEventAllUtilisateur = listeEventAllUtilisateur
        $("#fullCalendar").fullCalendar('removeEvents'); 
        $('#fullCalendar').fullCalendar('addEventSource', this.listeEventAllUtilisateur);
      }
    )
  }

  changeListeResumeSemaineUtilisateur(){
    this.listeUtilisateur.forEach(utilisateur => {
      this.getResumeSemaineUtilisateur(utilisateur)
    });
  }

  changeListeEventsUtilisateurCourant(){
    this.calendarService.getAllEventByUtilisateurForGestionCalendrier(this.utilisateurCourant.id, this.intervalStart, this.intervalEnd).subscribe(
      listeEventAllUtilisateur => {
        this.listeEventAllUtilisateur = listeEventAllUtilisateur
        $("#calendarUtilisateur").fullCalendar('removeEvents'); 
        $('#calendarUtilisateur').fullCalendar('addEventSource', this.listeEventAllUtilisateur);
      }
    )
  }

  getResumeSemaineUtilisateur(utilisateur : Utilisateur) {
    this.calendarService.getResumeSemaineUtilisateur(utilisateur.id, this.intervalStart, this.intervalEnd).subscribe(
      resumeSemaineUtilisateur => {
        utilisateur.resumeSemaineUtilisateur = resumeSemaineUtilisateur
      }
    )
  }

  

}
