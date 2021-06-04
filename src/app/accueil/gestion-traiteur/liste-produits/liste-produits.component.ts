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

    listeCategorie : string[];

    rechercheReference : string = "";
    
    rechercheNom : string = "";

    index : number = 0
    
    rechercheCourante : string = ""
    
    categorieCourante : string = ""

    listeDesAllergenesDisponibles : Allergene[];

    paginationCourante : number = 1;
  
    nbPaginations : number = 0

  ngOnInit(): void {
    this.initListeProduit(this.paginationCourante);
    this.traiteurService.getNbPaginationProduitTraiteur().subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
    
  }

  
  selectCategorie(categorie){

  }

  rechercheByReference(){

  }

  rechercheByNom(){

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

  initListeProduit(paginationCourante : number){
    this.traiteurService.getAllProduitTraiteur(paginationCourante - 1).subscribe(
      listeProduitTraiteur => this.listeProduitTraiteur = listeProduitTraiteur
    )
  }

  getListeAllergeneByProduitTraiteur(produitTraiteur){

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
