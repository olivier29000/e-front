import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Fournisseur from 'app/models/fournisseurs/Fournisseur';
import Image from 'app/models/Image';
import Allergene from 'app/models/traiteur/Allergene';
import ProduitVrac from 'app/models/vrac/ProduitVrac';
import { FournisseurService } from 'app/services/fournisseur.service';
import { VracService } from 'app/services/vrac.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-nouveau-produit-vrac',
  templateUrl: './nouveau-produit-vrac.component.html',
  styleUrls: ['./nouveau-produit-vrac.component.scss']
})
export class NouveauProduitVracComponent implements OnInit {

  @Input() produitCourant : ProduitVrac;

  selectedFile: File;

  requeteEnCours : boolean = false;
  
  listeDesAllergenesDisponibles : Allergene[];

  listeFournisseur : Fournisseur[]

  constructor(
    private activeModal: NgbActiveModal,
    private vracService : VracService,
    private fournisseurService: FournisseurService,
    private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {

    this.vracService.getAllAllergene().subscribe(
      listeDesAllergenesDisponibles => {
        this.listeDesAllergenesDisponibles = listeDesAllergenesDisponibles
        if(this.produitCourant == undefined){
          this.produitCourant = {} as ProduitVrac;
          this.produitCourant.listeAllergene = [this.listeDesAllergenesDisponibles[this.listeDesAllergenesDisponibles.length - 1]];
          this.produitCourant.image = {} as Image;
        }
        });
    this.fournisseurService.getAll().subscribe(
      listeFournisseur => {
        this.listeFournisseur = listeFournisseur
        let noFournisseur = {} as Fournisseur
        noFournisseur.entreprise = 'AUCUN'
        this.listeFournisseur.unshift(noFournisseur)
      }
    )
  }

  selectFournisseur(fournisseur){
    if(fournisseur.entreprise == 'AUCUN'){
      this.produitCourant.fournisseur = null
    }else{
      this.produitCourant.fournisseur = fournisseur
    }    
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
    this.produitCourant.emplacementVrac = emplacementVitrine;
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
  }
  
  closeModal(){
    this.activeModal.close()
  }

  postProduitTraiteur(){
    this.requeteEnCours = true;
    this.vracService.postProduitTraiteur(this.produitCourant).subscribe(
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
