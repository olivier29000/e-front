import { Component, OnInit } from '@angular/core';
import EtatEvent from 'app/models/calendar/EtatEvent';
import EventDto from 'app/models/calendar/EventDto';
import { CalendarService } from 'app/services/calendar.service';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-mon-calendrier',
  templateUrl: './mon-calendrier.component.html',
  styleUrls: ['./mon-calendrier.component.scss']
})
export class MonCalendrierComponent implements OnInit {

  listeEtatEvent : EtatEvent[];
  
  listeEvent : EventDto[];

  constructor(private calendarService : CalendarService) { }


  ngOnInit(){
    
    this.calendarService.getAllEtatEvent().subscribe(
      listeEtatEvent => this.listeEtatEvent = listeEtatEvent
    )

    this.calendarService.getAllEventByUtilisateur().subscribe(
      listeEvent => {
        this.listeEvent = listeEvent

    var $calendar = $('#fullCalendar');

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();



    $calendar.fullCalendar({
      viewRender: function(view, element) {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month'){
            var $fc_scroller = $('.fc-scroller');
            $fc_scroller.perfectScrollbar();
        }
      },
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
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

      select: function(start, end) {
        // on select we show the Sweet Alert modal with an input
        swal.fire({
            title: 'Create an Event',
            html: '<br><input class="form-control" placeholder="Event Title" id="input-field">',
            customClass:{
              confirmButton: "btn btn-fill btn-success"
            }
        }).then((result) => {
            var eventData;
            var event_title = $('#input-field').val();

            if (event_title) {
              eventData = {
                title: event_title,
                start: start,
                end: end
              };
              $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
            }
            $calendar.fullCalendar('unselect');

        })
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events: this.listeEvent
    });
      }
    )

    
  }
}
