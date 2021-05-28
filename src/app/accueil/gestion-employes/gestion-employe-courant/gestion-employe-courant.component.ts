import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Employe from 'app/models/Employe';
import { EmployeService } from 'app/services/employe.service';
import swal from 'sweetalert2';
import { ModalEvenementComponent } from '../modal-evenement/modal-evenement.component';

declare var $: any;

@Component({
  selector: 'app-gestion-employe-courant',
  templateUrl: './gestion-employe-courant.component.html',
  styleUrls: ['./gestion-employe-courant.component.scss']
})
export class GestionEmployeCourantComponent implements OnInit {

  idEmployeCourant : string;

  employeCourant : Employe;

  constructor(
    private employeService : EmployeService,
    private route: ActivatedRoute,
    private modalService : NgbModal) { }

  ngOnInit(): void {
    this.idEmployeCourant = this.route.snapshot.paramMap.get('id');

    this.employeService.getEmployeByIdAndMois(this.idEmployeCourant, "avril").subscribe(
      employeCourant => {
        this.employeCourant = employeCourant

        var $calendar = $('#fullCalendar');

        var today = new Date();

        let modalService = this.modalService;

        

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
            const modalRef = modalService.open(ModalEvenementComponent, { size: 'lg', backdrop: 'static', windowClass: 'modal-dialog-centered' });
            console.log(start._i)
            modalRef.componentInstance.dateCouranteMillisecond = start._i;
            modalRef.componentInstance.nomEmploye = employeCourant.nom;
            modalRef.result.then(() => {

            },
            (reason) => {
              console.log(reason)
            });
          },
          editable: true,
          eventLimit: true, // allow "more" link when too many events
                // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
          displayEventEnd: true,
          events: []
        });
      }
    )
  }

}
