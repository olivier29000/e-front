import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Email from 'app/models/Email';
import Commande from 'app/models/fournisseurs/Commande';
import CommandeProduit from 'app/models/fournisseurs/CommandeProduit';
import { CommandeService } from 'app/services/commande.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-reponse-fournisseur',
  templateUrl: './reponse-fournisseur.component.html',
  styleUrls: ['./reponse-fournisseur.component.scss']
})
export class ReponseFournisseurComponent implements OnInit {

  cleUrl : string;

  messageReponse : string = "";

  messageErreur : string = "";
  
  commande : Commande;

  listeCommandeProduit : CommandeProduit[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeService) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('cleUrl') != null){
      this.cleUrl = this.route.snapshot.paramMap.get('cleUrl')
      this.commandeService.getListeCommandeProduitByCleUrl(this.cleUrl).subscribe(
        listeCommandeProduit => this.listeCommandeProduit = listeCommandeProduit,
        err => this.messageErreur = "Cette page est dédiée à confirmer ou infirmer une commande, peut être avez vous déjà donné votre réponse ? ou êtes vous sûr d'avoir correctement recopié le lien que vous avez reçu ?"
      )
    }else{
      this.messageErreur = "Cette page est dédiée à confirmer ou infirmer une commande or nous ne retrouvons pas celle ci, êtes vous sûr d'avoir correctement recopié le lien que vous avez reçu?"
    }
  }

  confirmerCommande(){
    swal.fire({
      title: 'Confirmer ?',
      text: "Vous confirmez la commande ? " ,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, confirmer!'
    }).then((result) => {
      if (result.isConfirmed) {
        let email =  {contenu : this.messageReponse, objet:"", destinataire:"",envoyeur:""} as Email
        this.commandeService.confirmerCommande(this.cleUrl, email).subscribe(
          res => swal.fire(
            'Parfait!',
            'la commande a été confirmée!',
            'success'
          ).then(()=>this.router.navigate(['/accueil'])),
          err => swal.fire(
            'Mince!',
            'il y a eu un problème!',
            'success'
          )
        )
      }
    })
  }contenu: string;
  objet: string;
  destinataire: string;
  envoyeur: string;
  annulerCommande(){
    swal.fire({
      title: 'Annuler ?',
      text: "Vous annulez la commande ? " ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annuler!'
    }).then((result) => {
      if (result.isConfirmed) {
        let email =  {contenu : this.messageReponse, objet:"", destinataire:"",envoyeur:""} as Email
        this.commandeService.annulerCommande(this.cleUrl,email).subscribe(
          res => swal.fire(
            'Parfait!',
            'la commande a été annulée!',
            'success'
          ).then(()=>this.router.navigate(['/accueil'])),
          err => swal.fire(
            'Mince!',
            'il y a eu un problème!',
            'success'
          )
        )
      }
    })
  }
}
