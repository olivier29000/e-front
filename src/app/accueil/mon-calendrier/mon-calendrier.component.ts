import { Component, OnInit } from '@angular/core';
import EtatEvent from 'app/models/calendar/EtatEvent';
import EventDto from 'app/models/calendar/EventDto';
import { CalendarService } from 'app/services/calendar.service';
import { AuthService } from 'app/services/auth.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import Utilisateur from 'app/models/Utilisateur';
import { Subscription } from 'rxjs';
import { UtilsService } from 'app/services/utils.service';
import { Router } from '@angular/router';

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
    private authService : AuthService,
    private utilsService : UtilsService,
    private router : Router) { }


  ngOnInit(){

    this.utilisateurConnecteSub = this.authService.subConnecte.subscribe(
      (utilisateurConnecte) => {
        this.utilisateurConnecte = utilisateurConnecte
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
            $(".fc-left h2").text(this.getTitle());
      },
      firstDay : 1,
      height: 1000,
      slotLabelFormat:"HH:mm",
      titleFormat: function(date) {
        return date.toString() + '!!!';
      },
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
          week: {
            titleFormat: '[Semaine du] D MMMM YYYY',
            titleRangeSeparator: ' au ',
          }
        },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events: this.listeEvent,
      timeFormat: 'HH:mm'
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

  getTitle() : string{
    return this.utilsService.getTitleCalendar(this.intervalStart, this.intervalEnd)
  }

  getDateStringJourMois(dateNumber : number) : string{
    return this.utilsService.getDateStringJourMois(dateNumber)
  }

  

  deconnexion() {
    this.authService.deconnexion().subscribe(() => { this.router.navigate(['/login']); });
  }
}
