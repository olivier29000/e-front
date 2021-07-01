import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'app/services/utilisateur.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modification-creation-mot-de-passe',
  templateUrl: './modification-creation-mot-de-passe.component.html',
  styleUrls: ['./modification-creation-mot-de-passe.component.scss']
})
export class ModificationCreationMotDePasseComponent implements OnInit {

  cleUrl : string;

  nouveauMotDePasse : string;

  constructor(
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('cleUrl') != null){
      this.cleUrl = this.route.snapshot.paramMap.get('cleUrl')
    }else{
      this.router.navigate(['/accueil']);
    }
  }

  modifierMotDePasse(){
    this.utilisateurService.modifierMotDePasse(this.nouveauMotDePasse, this.cleUrl).subscribe(
      res => swal.fire(
        'Parfait!',
        'Votre mot de passe a été modifié!',
        'success'
      ).then(() => this.router.navigate(['/accueil'])),
      err => swal.fire(
        'Mince!',
        'ça n\'a pas fonctionné, tu avais une heure pour modifié ton mot de passe. Essaie de refaire une demande de modification',
        'error'
      ).then(() => this.router.navigate(['/accueil']))
    )
  }

}
