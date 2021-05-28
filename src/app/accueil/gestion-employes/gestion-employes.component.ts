import { Component, OnInit } from '@angular/core';
import Employe from 'app/models/Employe';
import SemaineEmploye from 'app/models/SemaineEmploye';
import { EmployeService } from 'app/services/employe.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { ChartType, LegendItem } from './lbd-chart/lbd-chart.component';
import { Observable } from 'rxjs';
import EvenementEmploye from 'app/models/EvenementEmploye';
import ResumeEmploye from 'app/models/SemaineEmploye';
import EmployeObjet from 'app/models/EmployeObjet';

declare var $: any;

@Component({
  selector: 'app-gestion-employes',
  templateUrl: './gestion-employes.component.html',
  styleUrls: ['./gestion-employes.component.scss']
})
export class GestionEmployesComponent implements OnInit {

  listeEmployes : Employe[] = [];

  listeSemaineEmployes : SemaineEmploye[] = [];
  
  listeDateCourantes : any;
  
  vueCourante : any;

  moisCourant : string = "avril 2021";

  intervalStart : string = "";

  intervalEnd : string = "";

  calendar

  smallCalendar

  employeCourant : Employe;

  listeEvenement : any[] = [];

  listeEmployeObjet : EmployeObjet[]

  dateCopieSemaine : any

  idEmployeObjetModifCourant : number;

  public backgroundColor: string;
  public fontColor: string;
  public linkColor: string;

  copieSemaine : any[] = []

  constructor(private employeService : EmployeService) { }

  

  ngOnInit(){

    this.backgroundColor = '#fff';
    this.fontColor = '#222';
    this.linkColor = '#4b4fce';

    this.vueCourante = "month"

    this.employeService.getListeEmploye().subscribe(
      listeEmployes => {
        this.listeEmployes = listeEmployes
        if (this.listeEmployes.length > 0) {
          this.employeCourant = this.listeEmployes[0]
        }
      }
    )

    


    var $calendar = $('#fullCalendar');

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();

    var intervalStart = this.intervalStart
    var intervalEnd = this.intervalEnd
    var vueCourante = this.vueCourante



    this.calendar = $calendar.fullCalendar({
      
      viewRender: function(view, element,) {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month'){
            var $fc_scroller = $('.fc-scroller');
            $fc_scroller.perfectScrollbar();
        }
        intervalStart = moment(new Date(view.dayGrid.dayDates[0])).format('DD-MM-YYYY')
        intervalEnd =  moment(new Date(view.dayGrid.dayDates[view.dayGrid.dayDates.length - 1])).format('DD-MM-YYYY')
      },
      header: {
        left: 'title',
        center: 'month,agendaWeek',
        right: 'prev,next'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      firstDay : 1,
        views: {
          month: { // name of view
            titleFormat: 'MMMM YYYY'
            // other view-specific options here
          },
          week: {
            titleFormat: "D MMMM YYYY"
          },
          day: {
            titleFormat: 'D MMM, YYYY'
          }
        },
      select: (start, end, allDay, obj) => {
        console.log(start)
        console.log(end)
        console.log(allDay)
        console.log(obj.constructor.name == "AgendaView")
        if(obj.constructor.name == "AgendaView"){
          this.postEvenement(start, end);
        }else{
          console.log(start.format('DD-MM-YYYY'))
          $('#fullCalendar').fullCalendar('changeView', 'agendaWeek',start.format('MM-DD-YYYY'));
          this.intervalEnd = moment(new Date($('.fc-day')[$('.fc-day').length - 1].getAttribute("data-date"))).format('DD-MM-YYYY')
          this.intervalStart = moment(new Date($('.fc-day')[0].getAttribute("data-date"))).format('DD-MM-YYYY')
          this.vueCourante = "agendaWeek"
          this.initListeDateCourantes()
        }
        
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      displayEventEnd: true,
      events: [
      ]
    });

    var $smallCalendar = $('#smallCalendar');
    this.smallCalendar = $smallCalendar.fullCalendar({
      viewRender: function(view, element,) {
      },
      header: {
        left: 'title',
        right: 'prev,next'
      },
      defaultView : 'agendaWeek',
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      firstDay : 1,
        views: {
          week: {
            titleFormat: "D MMMM YYYY"
          }
        },
      select: (start, end, allDay, obj) => {
      },
      editable: true,
      eventLimit: true,
      displayEventEnd: true,
      events: [
        {
            "idEmploye" : 0,
            "title": "Magali",
            "start": 1617253200000,
            "end": 1617292800000,
            "className": "event-default"
          },{
            "idEmploye" : 1,
            "title": "Simon",
            "start": 1617253200000,
            "end": 1617292800000,
            "className": "event-azure"
            
          },{
            "idEmploye" : 2,
            "title": "Regis",
            "start": 1617253200000,
            "end": 1617292800000,
            "className": "event-green"
            
          },{
            "idEmploye" : 3,
            "title": "AAAA",
            "start": 1617253200000,
            "end": 1617292800000,
            "className": "event-green"
            
          }
    ]
    });

    this.intervalStart = intervalStart;
    this.intervalEnd = intervalEnd;

    this.initListeDateCourantes()

    this.initListeEvenements()
    
    this.initListeEmployeObjet()
  }

  modifEmployeObjet(idEmployeObjet : number){
    if(this.idEmployeObjetModifCourant == idEmployeObjet){
      this.idEmployeObjetModifCourant = null
    }else{
      this.idEmployeObjetModifCourant = idEmployeObjet
    }
    
  }

  isModifEmployeObjet(idEmployeObjet : number) : boolean{
    if(this.idEmployeObjetModifCourant == idEmployeObjet){
      return true
    }else{
      return false
    }
  }

  validerCopieSemaine(){
console.log(this.dateCopieSemaine)
  }

  initListeEmployeObjet(){
    this.employeService.getListeEmployeObjet().subscribe(
      listeEmployeObjet => {
        this.listeEmployeObjet = listeEmployeObjet
      }
    )
  }

  public setColor(employeObjet: EmployeObjet, color: string) {
    let n = 0;
    this.listeEmployeObjet.forEach(e => {
        if(e.id == employeObjet.id){
          this.listeEmployeObjet[n].couleur = color
        }
        n++
    });
  }

  initListeEvenements(){
    this.employeService.getListeEvenementByPeriode(
      new Date($('.fc-day')[0].getAttribute("data-date")).getMilliseconds(),
      new Date($('.fc-day')[$('.fc-day').length - 1].getAttribute("data-date")).getMilliseconds()
    ).subscribe(
      listeEvenement => {
        this.listeEvenement = listeEvenement
        $('#fullCalendar').fullCalendar('renderEvents', this.listeEvenement, true);
      }
    )
  }

  filterListeEvenements(){
    let listeEvenement = this.listeEvenement
    this.listeEmployes.forEach(employe => {
      if(!employe.isActif){
        listeEvenement = listeEvenement.filter(e => e.idEmploye !== employe.id)
      }
    });
    $('#fullCalendar').fullCalendar('removeEvents');
    console.log(listeEvenement)
    $('#fullCalendar').fullCalendar('renderEvents', listeEvenement, true);
  }

  postEvenement(start : moment.Moment, end : moment.Moment){
    let evenementCourant : EvenementEmploye = {} as EvenementEmploye;
    evenementCourant.start = start.valueOf();
    evenementCourant.end = end.valueOf();
    evenementCourant.className = 'event-green';

    this.employeService.postEvenementByIdEmploye(evenementCourant, this.employeCourant).subscribe()
  }

  changeIsActifEmploye(employe){
    this.filterListeEvenements()
  }

  setEmployeCourant(employe : Employe){
    this.employeCourant = employe
    let n = 0;
    this.listeEmployes.forEach(e => {
      if(e.id == employe.id && !e.isActif){
        this.listeEmployes[n].isActif = true
      }
      n++
    });
  }

  setEmployeCourantOrChangeView(employe, index : number){
    if(this.vueCourante == "month"){
      this.employeCourant = employe
      let n = 0;
      this.listeEmployes.forEach(e => {
        if(e.id == employe.id && !e.isActif){
          this.listeEmployes[n].isActif = true
        }
        n++
      });
      let momentC = moment(this.listeDateCourantes[index],'DD-MM-YYYY').add(1,'days')
      let date : string = momentC.format('MM-DD-YYYY');
      $('#fullCalendar').fullCalendar('changeView', 'agendaWeek',date);
      this.intervalEnd = moment(new Date($('.fc-day')[$('.fc-day').length - 1].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.intervalStart = moment(new Date($('.fc-day')[0].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.vueCourante = "agendaWeek"
      this.initListeDateCourantes()
    } else {
      this.employeCourant = employe
      let n = 0;
      this.listeEmployes.forEach(e => {
        if(e.id == employe.id && !e.isActif){
          this.listeEmployes[n].isActif = true
        }
        n++
      });
    }
    console.log(this.listeEmployes)
  }

  initListeDateCourantes(){
    if(this.vueCourante == "agendaWeek"){
      this.listeDateCourantes = []
      for (let index = 0; index < 7; index++) {
        this.listeDateCourantes.push(moment(this.intervalStart, "DD-MM-YYYY").add(index,'days').format('DD-MM-YYYY'))
      }
    } else {
      this.listeDateCourantes = []
      for (let index = 0; index < 6; index++) {
        this.listeDateCourantes.push(moment(this.intervalStart, "DD-MM-YYYY").add(index,'week').format('DD-MM-YYYY'))
      }
    }
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    $('.fc-prev-button').on('click', x => {
      this.intervalEnd = moment(new Date($('.fc-day')[$('.fc-day').length - 1].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.intervalStart = moment(new Date($('.fc-day')[0].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.initListeDateCourantes()
    });
    $('.fc-next-button').on('click', x => {
      this.intervalEnd = moment(new Date($('.fc-day')[$('.fc-day').length - 1].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.intervalStart = moment(new Date($('.fc-day')[0].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.initListeDateCourantes()
    });
    $('.fc-month-button').on('click', x => {
      this.intervalEnd = moment(new Date($('.fc-day')[$('.fc-day').length - 1].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.intervalStart = moment(new Date($('.fc-day')[0].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.vueCourante = "month"
      this.initListeDateCourantes()
    });
    $('.fc-agendaWeek-button').on('click', x => {
      this.intervalEnd = moment(new Date($('.fc-day')[$('.fc-day').length - 1].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.intervalStart = moment(new Date($('.fc-day')[0].getAttribute("data-date"))).format('DD-MM-YYYY')
      this.vueCourante = "agendaWeek"
      this.initListeDateCourantes()
    });
    $('.switch-plain').bootstrapSwitch({
      onColor:'',
      onText: '',
      offText: ''
  });
  }

}
