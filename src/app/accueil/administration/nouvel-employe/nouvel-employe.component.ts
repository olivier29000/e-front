import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Logiciel from 'app/models/Logiciel';
import Utilisateur from 'app/models/Utilisateur';
import { UtilisateurService } from 'app/services/utilisateur.service';


@Component({
  selector: 'app-nouvel-employe',
  templateUrl: './nouvel-employe.component.html',
  styleUrls: ['./nouvel-employe.component.scss']
})
export class NouvelEmployeComponent implements OnInit {

  focus = false;
  focus1 = false;
  focus2 = false;
  focus3 = false;
  focus4 = false;

  stateOn :boolean = true

  stateOff :boolean = false

  requeteEnCours

  messageErreur

  selectedDateFinContrat: NgbDateStruct = undefined;

  selectedDateDebutContrat: NgbDateStruct = undefined;

  listeLogiciel : Logiciel[]

  listeSelectionLogiciel : Logiciel[] = []

  listeNotSelectionLogiciel : Logiciel[] = []

  @Input() employe : Utilisateur;

  constructor(
    
    public activeModal: NgbActiveModal,
    private calendar: NgbCalendar,
    private utilisateurService : UtilisateurService) {
    this.selectedDateDebutContrat = calendar.getToday()
    this.selectedDateFinContrat = calendar.getToday()
   }

  ngOnInit(): void {
    
    if(this.employe == undefined){
      this.employe = {} as Utilisateur
      this.employe.listeLogiciel = []
    }else{
      console.log(this.employe.dateDebutContrat)
      console.log(this.employe.dateFinContrat)
      var dateDebut = new Date(this.employe.dateDebutContrat);
      this.selectedDateDebutContrat = { day: dateDebut.getUTCDate(), month: dateDebut.getUTCMonth() + 1, year: dateDebut.getUTCFullYear()};
      var dateFin = new Date(this.employe.dateFinContrat);
      this.selectedDateFinContrat = { day: dateFin.getUTCDate(), month: dateFin.getUTCMonth() + 1, year: dateFin.getUTCFullYear()};
      
      }
    this.utilisateurService.getAllLogiciel().subscribe(
      listeLogiciel => {
        this.listeLogiciel = listeLogiciel
        this.listeSelectionLogiciel = this.employe.listeLogiciel
        this.listeLogiciel.forEach(logiciel => {
          if(!this.listeSelectionLogiciel.some(l => l.titre == logiciel.titre)){
            this.listeNotSelectionLogiciel.push(logiciel)
          }
        });
      }
    )
  }
  
  isLogicielOn(logiciel : Logiciel) : boolean{
    let res :boolean = this.employe.listeLogiciel.some(l => l.titre == logiciel.titre)
    console.log(res)
    return res
  }

  ajouterLogicielToEmploye(logiciel){
    if(this.employe.listeLogiciel.some(l => l.titre == logiciel.titre)){
      this.employe.listeLogiciel = this.employe.listeLogiciel.filter(l => l.titre !== logiciel.titre)
    }else{
      this.employe.listeLogiciel.push(logiciel)
    }
  }

  enleverLogicielToEmploye(logiciel){
    this.employe.listeLogiciel.filter(l => JSON.stringify(l) === JSON.stringify(logiciel))
    this.stateOn = true
  }

  public setColor(employe: Utilisateur, color: string) {
    
    this.employe.couleur = color;
  }

  postUtilisateur(){
    this.utilisateurService.postUtilisateur(this.employe).subscribe(
      res => this.fermer()
    )
  }

  fermer(){
    this.activeModal.close()
  }

  selectDateDebutContrat(newDate){
    this.selectedDateDebutContrat = newDate
    this.employe.dateDebutContrat = new Date(newDate.year, newDate.month - 1, newDate.day).getTime() + 86400000
    
  }

  selectDateFinContrat(newDate){
    this.selectedDateFinContrat = newDate
    this.employe.dateFinContrat = new Date(newDate.year, newDate.month - 1, newDate.day).getTime() + 86400000
  }

}
