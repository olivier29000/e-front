import { Component, OnInit } from '@angular/core';
import Utilisateur from 'app/models/Utilisateur';
import { AuthService } from 'app/services/auth.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { UtilsService } from 'app/services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.scss']
})
export class MonCompteComponent implements OnInit {

  

  utilisateurConnecteSub : Subscription;

  utilisateurConnecte : Utilisateur;

  listeCollegue : Utilisateur[]

  constructor(private authService : AuthService,
    private utilsService : UtilsService,
    private utilisateurService : UtilisateurService) { }

  ngOnInit(): void {
    this.utilisateurConnecteSub = this.authService.subConnecte.subscribe(
      (utilisateurConnecte) => {
        this.utilisateurConnecte = utilisateurConnecte
        }
      , (error) => console.log(error)
    );

    this.utilisateurService.getAllCollegue().subscribe(
      listeCollegue => this.listeCollegue = listeCollegue
    )
  }

  getDateString(dateNumber : number) : string{
    return this.utilsService.getDateString(dateNumber)
  }

}
