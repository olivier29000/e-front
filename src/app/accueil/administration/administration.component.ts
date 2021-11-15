import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Utilisateur from 'app/models/Utilisateur';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { UtilsService } from 'app/services/utils.service';
import { NouvelEmployeComponent } from './nouvel-employe/nouvel-employe.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  listeEmploye : Utilisateur[];

  listeEmployeArchived : Utilisateur[];

  constructor(
    public modalService: NgbModal,
    private utilisateurService : UtilisateurService,
    private utilsService : UtilsService) { }

  ngOnInit(): void {
    this.initialisation()
  }

  initialisation(){
    this.utilisateurService.getAllUtilisateur().subscribe(
      listeEmploye => this.listeEmploye = listeEmploye
    )
    this.utilisateurService.getAllUtilisateurArchived().subscribe(
      listeEmployeArchived => this.listeEmployeArchived = listeEmployeArchived
    )
  }

  nouvelEmploye(employe : Utilisateur){
    const modalRef = this.modalService.open(NouvelEmployeComponent, { centered: true,size: 'lg', backdrop: 'static' });
    if(employe != undefined){
      modalRef.componentInstance.employe = employe;
    }
    modalRef.result.then(() => {
      this.initialisation()
    },
     (reason) => {
      console.log(reason)
    });
  }

  archiverEmploye(employe){
    this.utilisateurService.archiveUtilisateurById(employe.id).subscribe(
      res => this.initialisation()
    )
  }

  getDateString(dateNumber : number) : string{
    return this.utilsService.getDateString(dateNumber)
  }

}
