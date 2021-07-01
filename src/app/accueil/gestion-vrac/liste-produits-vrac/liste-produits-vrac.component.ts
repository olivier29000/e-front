import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Allergene from 'app/models/traiteur/Allergene';
import ProduitVrac from 'app/models/vrac/ProduitVrac';
import { VracService } from 'app/services/vrac.service';
import { NouveauProduitVracComponent } from './nouveau-produit-vrac/nouveau-produit-vrac.component';

@Component({
  selector: 'app-liste-produits-vrac',
  templateUrl: './liste-produits-vrac.component.html',
  styleUrls: ['./liste-produits-vrac.component.scss']
})
export class ListeProduitsVracComponent implements OnInit {

  constructor(private modalService : NgbModal,
    private vracService : VracService,
    private http : HttpClient) { }

    listeProduitTraiteur : ProduitVrac[];

    listeVitrine : string[] = ["ETALE1", "ETALE2", "ETALE3", "ETALE4", "ETALE5"]

    rechercheReference : string = "";
    
    rechercheNom : string = "";

    index : number = 1
    
    rechercheCourante : string = ""
    
    vitrineCourante : string = ""

    listeDesAllergenesDisponibles : Allergene[];

    paginationCourante : number = 1;
  
    nbPaginations : number = 0

    nbElementParPagination : number = 20

  ngOnInit(): void {
    this.initListeProduit(this.paginationCourante);
    this.vracService.getNbPaginationProduitVrac(this.nbElementParPagination).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
  }

  
  selectVitrine(vitrine : string){
    this.paginationCourante = 1
    this.vitrineCourante = vitrine
    this.vracService.getListeProduitVracRechercheEmplacementVrac(this.paginationCourante,this.nbElementParPagination,vitrine).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
    this.vracService.getNbPaginationProduitVracEmplacementVrac(this.nbElementParPagination, vitrine).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
  }

  rechercheByReference(){

  }

  rechercheByNom(){
    this.vracService.getListeProduitVracRecherche(this.index,this.nbElementParPagination,this.rechercheNom).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
    this.vracService.getNbPaginationProduitVrac(this.nbElementParPagination, this.rechercheNom).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
  }

  ajouterUnProduit(){
    const modalRef = this.modalService.open(NouveauProduitVracComponent, {centered: true, size: 'lg', backdrop: 'static' });
    modalRef.result.then(() => {
      this.initListeProduit(this.paginationCourante);
    },
     (reason) => {
      console.log(reason)
    });
  }

  actualiser(){
    this.vitrineCourante = ""
    this.rechercheNom = ""
    this.rechercheReference = ""
    this.paginationCourante = 1
    this.initListeProduit(this.paginationCourante)
  }

  initListeProduit(paginationCourante : number){
    this.vracService.getListeProduitVracRecherche(this.paginationCourante,this.nbElementParPagination,this.rechercheNom).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
    this.vracService.getNbPaginationProduitVrac(this.nbElementParPagination, this.rechercheNom).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
  }

  getListeAllergeneByProduitVrac(produitTraiteur) : Allergene[]{
    let listeDesAllergenesProduit : Allergene[] = []
    produitTraiteur.listeAllergene.forEach(allergene => {
      listeDesAllergenesProduit.push(this.listeDesAllergenesDisponibles.filter(obj => obj.nomAllergene === allergene)[0]);
    })
    return listeDesAllergenesProduit;

  }

  modifierProduitVrac(produitTraiteur : ProduitVrac){
      const modalRef = this.modalService.open(NouveauProduitVracComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.produitCourant = produitTraiteur;
      modalRef.result.then(() => {
        this.initListeProduit(this.paginationCourante);
      },
       (reason) => {
        console.log(reason)
      });
    
  }

  supprimerProduitTraiteur(produitTraiteur : ProduitVrac){

  }
}
