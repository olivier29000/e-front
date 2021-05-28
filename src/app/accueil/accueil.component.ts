import { Component, OnInit } from '@angular/core';
import Utilisateur from 'app/models/Utilisateur';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  utilisateur : Utilisateur;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.getUtilisateur().subscribe(
      utilisateur => {
        this.utilisateur = utilisateur
        console.log(this.utilisateur)
      }
    )
  }

  

  
  

}
