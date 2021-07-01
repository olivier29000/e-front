import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  email = "";
  password = "";
  messageError: string;

  constructor(private authService: AuthService,
    private utilisateurService : UtilisateurService) { }

  ngOnInit(): void {
  }

  authentification() {
    this.messageError = ""
    this.authService.authentification(this.email, this.password).subscribe(
      () => {}, 
      (err) => {
        console.log(err)
        this.messageError = err.error
      });
  }

  demanderModificationMotDePasse(){
    swal.fire({
      title: 'Indiquez votre adresse e-mail svp',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Annuler',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.utilisateurService.demanderModificationMotDePasse(result.value).subscribe(
          res => swal.fire(
            'Ok !',
            'Vous allez recevoir un mail',
            'success'
          ),
          err => {
            swal.fire({
            icon: 'error',
            title: 'Mmm...',
            text: "il y a eu un problème"
          })
        }
        )
      }
    })
  }
}
