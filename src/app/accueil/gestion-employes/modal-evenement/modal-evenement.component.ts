import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import EvenementEmploye from 'app/models/EvenementEmploye';

@Component({
  selector: 'app-modal-evenement',
  templateUrl: './modal-evenement.component.html',
  styleUrls: ['./modal-evenement.component.scss']
})
export class ModalEvenementComponent implements OnInit {

  @Input() dateCouranteMillisecond : number;
  @Input() idEmploye : number;
  @Input() nomEmploye : string;
  @Input() evenement : EvenementEmploye;

  dateCouranteString : string;

  heureStart : number;

  heureEnd : number;

  listeHeureDispo = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

  constructor(private activeModal: NgbActiveModal,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.dateCouranteString = this.datepipe.transform(new Date(this.dateCouranteMillisecond), 'dd/MM/yyyy')
    if(this.evenement == undefined){
      this.evenement = {} as EvenementEmploye
    }
  }

  selectTitle(title : string){
    this.evenement.title = title
    console.log(this.evenement)
  }

  selectHeureStart(heure : number){
    this.heureStart = heure
  }
  
  selectHeureEnd(heure : number){
    this.heureEnd = heure
  }

  closeModal(){
    this.activeModal.close()
  }

}
