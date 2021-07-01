import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CommandeProduit from 'app/models/fournisseurs/CommandeProduit';
import Fournisseur from 'app/models/fournisseurs/Fournisseur';
import Produit from 'app/models/fournisseurs/Produit';
import Utilisateur from 'app/models/Utilisateur';
import { AuthService } from 'app/services/auth.service';
import { CommandeService } from 'app/services/commande.service';
import { FournisseurService } from 'app/services/fournisseur.service';
import { ProduitService } from 'app/services/produit.service';
import { Subscription } from 'rxjs';
import { NouveauFournisseurComponent } from './nouveau-fournisseur/nouveau-fournisseur.component';
import { NouveauProduitComponent } from './nouveau-produit/nouveau-produit.component';
import swal from 'sweetalert2';
import { ModalMailComponent } from './modal-mail/modal-mail.component';
import Commande from 'app/models/fournisseurs/Commande';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-gestion-fournisseurs',
  templateUrl: './gestion-fournisseurs.component.html',
  styleUrls: ['./gestion-fournisseurs.component.scss']
})
export class GestionFournisseursComponent implements OnInit {


  listeFournisseur : Fournisseur[];

  listeProduit : Produit[];
  
  listeCommande : Commande[];
  
  listeCommandeArchive : Commande[];

  listeCommandeProduit : CommandeProduit[];

  utilisateurConnecteSub : Subscription;

  utilisateurConnecte : Utilisateur;

 

  constructor(
    private commandeService : CommandeService,
    private fournisseurService : FournisseurService,
    public modalService: NgbModal,
    private produitService : ProduitService,
    private authService : AuthService,
    private utilsService : UtilsService) { }

  ngOnInit(): void {
    this.utilisateurConnecteSub = this.authService.subConnecte.subscribe(
      (utilisateurConnecte) => {
        this.utilisateurConnecte = utilisateurConnecte
        }
      , (error) => console.log(error)
    );
    this.actualiserListeFournisseur();
  }

  getDateString(dateNumber : number) : string{
    if(dateNumber){
      return this.utilsService.getDateString(dateNumber)
    }else{
      return ""
    }
    
  }

  actualiserListeFournisseur(){
    this.fournisseurService.getAll().subscribe(
      listeFournisseur => {
        this.listeFournisseur = listeFournisseur
        this.listeFournisseur.forEach(fournisseur => 
          this.fournisseurService.getListeDateCommandePrecedentesByIdFournisseur(fournisseur.id).subscribe(
            listeDateCommandePrecedentes => fournisseur.listeDateCommandePrecedentes = listeDateCommandePrecedentes
          )
        )
      }
    )
  }

  ajouterUnProduit(fournisseur : Fournisseur){
    const modalRef = this.modalService.open(NouveauProduitComponent, { centered: true, size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.idProduit = undefined;
    modalRef.componentInstance.idFournisseur = fournisseur.id;
    modalRef.result.then(() => {
      this.actualiserListeProduit(fournisseur);
    },
     (reason) => {
      console.log(reason)
    });
  }

  ajouterFournisseur(){
    const modalRef = this.modalService.open(NouveauFournisseurComponent, { centered: true,size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.idFournisseur = undefined;
    modalRef.result.then(() => {
      this.actualiserListeFournisseur();
    },
     (reason) => {
      this.actualiserListeFournisseur();
    });
  }

  modifierFournisseur(idFournisseur : number){
    const modalRef = this.modalService.open(NouveauFournisseurComponent, { centered: true,size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.idFournisseur = idFournisseur;
    modalRef.result.then(() => {
      this.actualiserListeFournisseur();
    },
     (reason) => {
      this.actualiserListeFournisseur();
    });
  }

  modifierUnProduit(produit : Produit, fournisseur : Fournisseur){
    const modalRef = this.modalService.open(NouveauProduitComponent, { centered: true,size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.idProduit = produit.id;
    modalRef.componentInstance.idFournisseur = fournisseur.id;
    modalRef.result.then(() => {
      this.actualiserListeProduit(fournisseur);
    },
     (reason) => {
      console.log(reason)
    });
  }

  actualiserListeProduit(fournisseur){
    this.produitService.getAllByIdFournisseur(fournisseur.id).subscribe(
      listeProduit => {
        fournisseur.listeProduit = listeProduit
        this.listeCommandeProduit = listeProduit.map(produit => {
          let produitCommande = {}  as CommandeProduit
          if(this.listeCommandeProduit.some(commandeProduit => commandeProduit.produit.id == produit.id)){
            produitCommande =  {nbLot : this.listeCommandeProduit.find(commandeProduit => commandeProduit.produit.id == produit.id).nbLot, produit : produit} as CommandeProduit
          }else{
            produitCommande =  {nbLot : 0, produit : produit} as CommandeProduit
          }
          return produitCommande
        })
        this.listeCommandeProduit.forEach(produitCommande => 
          this.produitService.getListeQuantiteCommandePrecedentesByIdProduit(produitCommande.produit.id).subscribe(
            listeQuantiteCommandePrecedentes => produitCommande.produit.listeQuantiteCommandePrecedentes = listeQuantiteCommandePrecedentes
          )
        )
        
        
      },
      err => fournisseur.listeProduit = []
    )
  }

  passerCommande(fournisseur : Fournisseur){
    this.listeFournisseur.forEach(fournisseur => fournisseur.listeProduit = null)
    this.listeCommandeProduit = []
    this.actualiserListeProduit(fournisseur)
    
  }

  fetchNews(evt: any) {
    this.listeFournisseur = null;
    this.listeCommande = null;
    this.listeProduit = null;
    if(evt.nextId == "FOURNISSEURS"){
      this.fournisseurService.getAll().subscribe(
        listeFournisseur => this.listeFournisseur = listeFournisseur
      )
    }else if(evt.nextId == "COMMANDES_FOURNISSEURS"){
      this.commandeService.getAllNoArchive().subscribe(
        listeCommande => this.listeCommande = listeCommande
      )
    }
    else if(evt.nextId == "ARCHIVES"){
      this.commandeService.getAllYesArchive().subscribe(
        listeCommandeArchive => this.listeCommandeArchive = listeCommandeArchive
      )
    }
    
  }

  postCommande(){
    this.commandeService.getMailByListeCommandeProduit(this.listeCommandeProduit).subscribe(
      email => {
        const modalRef = this.modalService.open(ModalMailComponent, { centered: true,size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.emailFournisseur = email;
        modalRef.componentInstance.listeCommandeProduit = this.listeCommandeProduit;
        modalRef.result.then((res) => {
          if(res == "200"){
            swal.fire(
              'Parfait!',
              'Votre commande a été envoyée!',
              'success'
            )
            this.listeFournisseur.forEach(fournisseur => fournisseur.listeProduit = null)
            this.listeCommandeProduit = []
          }else{
            swal.fire(
              'ANNULATION!',
              'L\'opération a été annulée!',
              'success'
            )
          }
        },
        (reason) => {
          console.log(reason)
        });
      },
      texte => console.log(texte)
    )
  }

  getlisteCommandeProduit(commande : Commande){
    if(commande.archive){
      this.listeCommandeArchive.forEach(commande => commande.listeCommandeProduit = null)
    }else{
      this.listeCommande.forEach(commande => commande.listeCommandeProduit = null)
    }
    
    this.commandeService.getListeCommandeProduitByIdCommande(commande.id).subscribe(
      listeCommandeProduit => commande.listeCommandeProduit = listeCommandeProduit
    )
  }

  archiver(commande : Commande){
    this.commandeService.archiverCommandeById(commande.id).subscribe(
      res =>  {
        this.commandeService.getAllNoArchive().subscribe(
        listeCommande => {
          this.listeCommande = listeCommande
        })
        this.commandeService.getAllYesArchive().subscribe(
          listeCommandeArchive => {
            this.listeCommandeArchive = listeCommandeArchive
          })
        swal.fire(
          'OK!',
          'Votre commande a été archivée!',
          'success'
        )
      }),
      err => swal.fire(
        'PROBLEME!',
        'Il y a eu un problème!',
        'success'
      )
  }

}
