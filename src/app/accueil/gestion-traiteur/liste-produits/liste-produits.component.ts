import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Allergene from 'app/models/traiteur/Allergene';
import ProduitTraiteur from 'app/models/traiteur/ProduitTraiteur';
import { ProduitService } from 'app/services/produit.service';
import { TraiteurService } from 'app/services/traiteur.service';
import { NouveauProduitTraiteurComponent } from './nouveau-produit-traiteur/nouveau-produit-traiteur.component';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.scss']
})
export class ListeProduitsComponent implements OnInit {

  constructor(private modalService : NgbModal,
    private traiteurService : TraiteurService,
    private http : HttpClient) { }

    listeProduitTraiteur : ProduitTraiteur[];

    listeVitrine : string[] = ["BOUCHERIE", "FROMAGES", "SALADES", "PATISSERIES", "PLATS_PREPARES", "CHARCUTERIE"]

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
    this.traiteurService.getNbPaginationProduitTraiteur(this.nbElementParPagination).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
  }

  
  selectVitrine(vitrine : string){
    this.paginationCourante = 1
    this.vitrineCourante = vitrine
    this.traiteurService.getListeProduitTraiteurRechercheVitrine(this.paginationCourante,this.nbElementParPagination,vitrine).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
    this.traiteurService.getNbPaginationProduitTraiteurVitrine(this.nbElementParPagination, vitrine).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
  }

  rechercheByReference(){

  }

  rechercheByNom(){
    this.traiteurService.getListeProduitTraiteurRecherche(this.index,this.nbElementParPagination,this.rechercheNom).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
    this.traiteurService.getNbPaginationProduitTraiteur(this.nbElementParPagination, this.rechercheNom).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
  }

  ajouterUnProduit(){
    const modalRef = this.modalService.open(NouveauProduitTraiteurComponent, {centered: true, size: 'lg', backdrop: 'static' });
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
    this.traiteurService.getListeProduitTraiteurRecherche(this.paginationCourante,this.nbElementParPagination,this.rechercheNom).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
    this.traiteurService.getNbPaginationProduitTraiteur(this.nbElementParPagination, this.rechercheNom).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
  }

  getListeAllergeneByProduitTraiteur(produitTraiteur) : Allergene[]{
    let listeDesAllergenesProduit : Allergene[] = []
    produitTraiteur.listeAllergene.forEach(allergene => {
      listeDesAllergenesProduit.push(this.listeDesAllergenesDisponibles.filter(obj => obj.nomAllergene === allergene)[0]);
    })
    return listeDesAllergenesProduit;

  }

  modifierProduitTraiteur(produitTraiteur : ProduitTraiteur){
      const modalRef = this.modalService.open(NouveauProduitTraiteurComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.produitCourant = produitTraiteur;
      modalRef.result.then(() => {
        this.initListeProduit(this.paginationCourante);
      },
       (reason) => {
        console.log(reason)
      });
    
  }

  supprimerProduitTraiteur(produitTraiteur : ProduitTraiteur){

  }
}
