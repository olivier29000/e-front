import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Image from 'app/models/Image';
import { NgxImageCompressService } from 'ngx-image-compress';
import Etiquette from 'app/models/traiteur/Etiquette';
import Allergene from 'app/models/traiteur/Allergene';
import ProduitTraiteur from 'app/models/traiteur/ProduitTraiteur';
import { NgbDateCustomParserFormatter } from 'app/services/dateformat';
import { TraiteurService } from 'app/services/traiteur.service';

@Component({
  selector: 'app-nouvelle-etiquette',
  templateUrl: './nouvelle-etiquette.component.html',
  styleUrls: ['./nouvelle-etiquette.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class NouvelleEtiquetteComponent implements OnInit {

  requeteEnCours : boolean = false;

  @Input() etiquetteCourante : Etiquette ;

  listeDesAllergenesDisponibles : Allergene[];

  listeProduitTraiteur : ProduitTraiteur[] = [];

  rechercheStringProduit : string;

  selectedFile: File;

  selectedDateOuverture: NgbDateStruct = undefined;

  selectedDateFinVitrine: NgbDateStruct = undefined;

  index : number = 0;

  messageErreur : string = "";

  constructor(
    private calendar: NgbCalendar,
    private traiteurService : TraiteurService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private imageCompress: NgxImageCompressService) {
      this.selectedDateOuverture = calendar.getToday();
      this.selectedDateFinVitrine = calendar.getToday();
     }

  ngOnInit(): void {
    if(this.etiquetteCourante == undefined){
      this.etiquetteCourante = {} as Etiquette ;
      this.etiquetteCourante.image = {} as Image;

      this.etiquetteCourante.dateOuverture = new Date().getTime()
      this.etiquetteCourante.dateFermeturePrevu = new Date().getTime()

      this.etiquetteCourante.dateOuverture
      this.selectDateOuverture(this.selectedDateOuverture)
      this.traiteurService.getListeProduitTraiteurForCreationEtiquette(this.index).subscribe(
        listeProduitTraiteur => {
          this.listeProduitTraiteur = listeProduitTraiteur
        }
      )
    }
  }


  addIndex(){
    
  }

  minusIndex(){
    
  }


  selectDateOuverture(newDate){
    this.etiquetteCourante.dateOuverture = new Date(newDate.year, newDate.month - 1, newDate.day).getTime()
    
  }

  selectDateFinVitrine(newDate){
    this.etiquetteCourante.dateFermeturePrevu = new Date(newDate.year, newDate.month - 1, newDate.day).getTime()
  }

  fermer(){
    this.activeModal.close()
  }

  rechercheProduit(){
    
  }

  selectProduit(produitTraiteur : ProduitTraiteur){
    this.etiquetteCourante.produitTraiteur=produitTraiteur;
    console.log(this.etiquetteCourante)
  }


  selectEmplacementVitrine(emplacementVitrine : string){
  }

  changeImageEtiquette(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        let resulatBase64 = reader.result  as string;
        this.imageCompress.compressFile(resulatBase64, 0, 50, 50).then(
          result => {
            this.etiquetteCourante.image.picByte = result.substring(result.indexOf(",") + 1)
          }
        );
    };
  }

  validerNouvelleEtiquette(){
    this.messageErreur = ""
    if(!this.etiquetteCourante.produitTraiteur){
      this.messageErreur = "Il y a un problème avec le produit, en avez vous sélectionné un ?"
    } 
    if(!this.etiquetteCourante.image.picByte){
      this.messageErreur = "Il y a un problème avec la photo de l'étiquette, en avez vous sélectionné une ?"
    } 
    if(this.messageErreur == ""){
      this.requeteEnCours = true;
      this.traiteurService.postEtiquette(this.etiquetteCourante).subscribe(
        res => {
          this.requeteEnCours = false;
          this.activeModal.close()
        },
        err => this.requeteEnCours = false
      )
    }
    

  }
}
