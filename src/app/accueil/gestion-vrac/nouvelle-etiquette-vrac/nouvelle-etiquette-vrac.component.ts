import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Image from 'app/models/Image';
import Allergene from 'app/models/traiteur/Allergene';
import EtiquetteVrac from 'app/models/vrac/EtiquetteVrac';
import ProduitVrac from 'app/models/vrac/ProduitVrac';
import { NgbDateCustomParserFormatter } from 'app/services/dateformat';
import { VracService } from 'app/services/vrac.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-nouvelle-etiquette-vrac',
  templateUrl: './nouvelle-etiquette-vrac.component.html',
  styleUrls: ['./nouvelle-etiquette-vrac.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class NouvelleEtiquetteVracComponent implements OnInit {

  requeteEnCours : boolean = false;

  @Input() etiquetteCourante : EtiquetteVrac ;

  listeDesAllergenesDisponibles : Allergene[];

  listeProduitTraiteur : ProduitVrac[] = [];

  rechercheStringProduit : string = "";

  selectedFile: File;

  selectedDateOuverture: NgbDateStruct = undefined;

  selectedDateFinVitrine: NgbDateStruct = undefined;

  index : number = 1;

  nbPaginations : number = 0;

  nbElementParPagination : number = 4;

  messageErreur : string = "";

  constructor(
    private calendar: NgbCalendar,
    private vracService : VracService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private imageCompress: NgxImageCompressService) {
      this.selectedDateOuverture = calendar.getToday();
      this.selectedDateFinVitrine = calendar.getToday();
     }

  ngOnInit(): void {
    if(this.etiquetteCourante == undefined){
      this.etiquetteCourante = {} as EtiquetteVrac ;
      this.etiquetteCourante.image = {} as Image;

      this.etiquetteCourante.dateOuverture = new Date().getTime()
      this.etiquetteCourante.dateFermeturePrevu = new Date().getTime()

      this.etiquetteCourante.dateOuverture
      this.selectDateOuverture(this.selectedDateOuverture)
      
    }
    let date : Date = new Date(this.etiquetteCourante.dateOuverture + 7200000)
    this.selectedDateOuverture = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    date  = new Date(this.etiquetteCourante.dateFermeturePrevu + 7200000)
    this.selectedDateFinVitrine =  { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    this.vracService.getListeProduitVracRecherche(this.index, this.nbElementParPagination).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
    this.getNbPaginationsProduitVrac()
  }

  initListeProduit(paginationCourante : number){
    this.vracService.getListeProduitVracRecherche(paginationCourante, this.nbElementParPagination).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
  }

  getListeProduitVracRecherche(){
    this.vracService.getListeProduitVracRecherche(this.index,this.nbElementParPagination,this.rechercheStringProduit).subscribe(
      listeProduitTraiteur => {
        this.listeProduitTraiteur = listeProduitTraiteur
      }
    )
    this.getNbPaginationsProduitVrac(this.rechercheStringProduit)
  }

  getNbPaginationsProduitVrac(recherche ? : string){
    this.vracService.getNbPaginationProduitVrac(this.nbElementParPagination, recherche).subscribe(
      nbPaginations => this.nbPaginations = nbPaginations
    )
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

  selectProduit(produitVrac : ProduitVrac){
    this.etiquetteCourante.produitVrac=produitVrac;
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
    if(!this.etiquetteCourante.produitVrac){
      this.messageErreur = "Il y a un problème avec le produit, en avez vous sélectionné un ?"
    } 
    if(!this.etiquetteCourante.image.picByte){
      this.messageErreur = "Il y a un problème avec la photo de l'étiquette, en avez vous sélectionné une ?"
    } 
    if(this.messageErreur == ""){
      this.requeteEnCours = true;
      this.vracService.postEtiquette(this.etiquetteCourante).subscribe(
        res => {
          this.requeteEnCours = false;
          this.activeModal.close()
        },
        err => this.requeteEnCours = false
      )
    }
    

  }
}
