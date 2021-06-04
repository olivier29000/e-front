import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Image from 'app/models/Image';
import { ProduitService } from 'app/services/produit.service';
import {NgxImageCompressService} from 'ngx-image-compress';
import { HttpClient } from '@angular/common/http';
import ProduitTraiteur from 'app/models/traiteur/ProduitTraiteur';
import Allergene from 'app/models/traiteur/Allergene';
import { TraiteurService } from 'app/services/traiteur.service';
import Fournisseur from 'app/models/fournisseurs/Fournisseur';
import { FournisseurService } from 'app/services/fournisseur.service';

@Component({
  selector: 'app-nouveau-produit-traiteur',
  templateUrl: './nouveau-produit-traiteur.component.html',
  styleUrls: ['./nouveau-produit-traiteur.component.scss']
})
export class NouveauProduitTraiteurComponent implements OnInit {

  @Input() produitCourant : ProduitTraiteur;

  selectedFile: File;

  requeteEnCours : boolean = false;
  
  listeDesAllergenesDisponibles : Allergene[];

  listeFournisseur : Fournisseur[]

  constructor(
    private activeModal: NgbActiveModal,
    private traiteurService : TraiteurService,
    private fournisseurService: FournisseurService,
    private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    
    console.log(this.produitCourant)

    this.traiteurService.getAllAllergene().subscribe(
      listeDesAllergenesDisponibles => {
        this.listeDesAllergenesDisponibles = listeDesAllergenesDisponibles
        if(this.produitCourant == undefined){
          this.produitCourant = {} as ProduitTraiteur;
          this.produitCourant.listeAllergene = [this.listeDesAllergenesDisponibles[this.listeDesAllergenesDisponibles.length - 1]];
          this.produitCourant.image = {} as Image;
        }
        });
    this.fournisseurService.getAll().subscribe(
      listeFournisseur => {
        this.listeFournisseur = listeFournisseur
        console.log(this.listeFournisseur)
      }
    )
  }

  selectFournisseur(fournisseur){
    this.produitCourant.fournisseur = fournisseur
  }

  allergeneIsSelected(allergene : Allergene) : boolean {
    let isSelected : boolean = false;
    this.produitCourant.listeAllergene.forEach(allergeneListe => {
      if(allergeneListe.nomAllergene == allergene.nomAllergene){
        isSelected = true;
      }
    });
    return isSelected;
  }

  selectEmplacementVitrine(emplacementVitrine : string){
    this.produitCourant.emplacementVitrine = emplacementVitrine;
  }

  selectAllergene(allergene : Allergene){
    if(allergene.nomAllergene == "AUCUN"){
      this.produitCourant.listeAllergene = [allergene]
    } else {
      this.produitCourant.listeAllergene = this.produitCourant.listeAllergene.filter(
        allergeneProduitCourant => allergeneProduitCourant.nomAllergene !== "AUCUN"
        );
      if (this.allergeneIsSelected(allergene)) {
        this.produitCourant.listeAllergene = this.produitCourant.listeAllergene.filter(
          allergeneProduitCourant => allergeneProduitCourant.nomAllergene !== allergene.nomAllergene
          );
      } else {
        this.produitCourant.listeAllergene.push(allergene)
      }
    }
    if(this.produitCourant.listeAllergene.length == 0){
      this.produitCourant.listeAllergene = [this.listeDesAllergenesDisponibles[this.listeDesAllergenesDisponibles.length - 1]]
    }
    console.log(this.produitCourant)
  }
  
  closeModal(){
    this.activeModal.close()
  }

  postProduitTraiteur(){
    this.requeteEnCours = true;
    this.traiteurService.postProduitTraiteur(this.produitCourant).subscribe(
      produit => {
        this.requeteEnCours = false;
        this.activeModal.close()
      },
      err => this.requeteEnCours = false
    )
  }

  changeImageProduit(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        let resulatBase64 = reader.result  as string;
        this.imageCompress.compressFile(resulatBase64, 0, 50, 50).then(
          result => {
            this.produitCourant.image.picByte = result.substring(result.indexOf(",") + 1)
          }
        );
    };
  }


}
