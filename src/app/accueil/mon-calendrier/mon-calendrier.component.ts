import { Component, OnInit } from '@angular/core';
import EtatEvent from 'app/models/calendar/EtatEvent';
import EventDto from 'app/models/calendar/EventDto';
import { CalendarService } from 'app/services/calendar.service';
import { AuthService } from 'app/services/auth.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import Utilisateur from 'app/models/Utilisateur';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-mon-calendrier',
  templateUrl: './mon-calendrier.component.html',
  styleUrls: ['./mon-calendrier.component.scss']
})
export class MonCalendrierComponent implements OnInit {

  listeEtatEvent : EtatEvent[];
  
  listeEvent : EventDto[];

  intervalStart : number = 0;

  intervalEnd : number = 0;

  utilisateurConnecteSub : Subscription;

  utilisateurConnecte : Utilisateur

  constructor(private calendarService : CalendarService,
    private authService : AuthService) { }


  ngOnInit(){

    this.utilisateurConnecteSub = this.authService.subConnecte.subscribe(
      (utilisateurConnecte) => {
        this.utilisateurConnecte = utilisateurConnecte
        console.log(utilisateurConnecte)
        }
      , (error) => console.log(error)
    );
    
    this.calendarService.getAllEtatEvent().subscribe(
      listeEtatEvent => this.listeEtatEvent = listeEtatEvent
    )

    this.calendarService.getAllEventByUtilisateur(this.intervalStart, this.intervalEnd).subscribe(
      listeEvent => {
        this.listeEvent = listeEvent

    var $calendar = $('#fullCalendar');

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();



    $calendar.fullCalendar({
      viewRender: (view, element) => {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month'){
            var $fc_scroller = $('.fc-scroller');
            $fc_scroller.perfectScrollbar();
            
        }
        this.intervalStart = moment(new Date(view.dayGrid.dayDates[0])).valueOf()
            this.intervalEnd =  moment(new Date(view.dayGrid.dayDates[view.dayGrid.dayDates.length - 1])).valueOf()
            this.changeListeEventsUtilisateurCourant()
      },
      firstDay : 1,
      defaultView : 'agendaWeek',
      header: {
        left: 'title',
        center: 'agendaWeek,agendaDay',
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
      editable: true,
      eventLimit: true, // allow "more" link when too many events
            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events: this.listeEvent
    });
      }
    )

    
  }

  changeListeEventsUtilisateurCourant(){
    this.calendarService.getAllEventByUtilisateur(this.intervalStart, this.intervalEnd).subscribe(
      listeEvent => {
        this.listeEvent = listeEvent
        $("#fullCalendar").fullCalendar('removeEvents'); 
        $('#fullCalendar').fullCalendar('addEventSource', this.listeEvent);
      }
    )
  }
}
