import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Allergene from 'app/models/traiteur/Allergene';
import EtiquetteVrac from 'app/models/vrac/EtiquetteVrac';
import { UtilsService } from 'app/services/utils.service';
import { VracService } from 'app/services/vrac.service';
import { NouvelleEtiquetteVracComponent } from '../nouvelle-etiquette-vrac/nouvelle-etiquette-vrac.component';

@Component({
  selector: 'app-liste-etiquettes-vrac',
  templateUrl: './liste-etiquettes-vrac.component.html',
  styleUrls: ['./liste-etiquettes-vrac.component.scss']
})
export class ListeEtiquettesVracComponent implements OnInit {

  listeEtiquette : EtiquetteVrac[];

  listeDesAllergenesDisponibles : Allergene[]
  
  listeDesAllergenesRecherche : Allergene[] = []

  index : number = 1;

  paginationCourante : number = 1;

  nbPaginations : number = 0

  constructor(
    public modalService: NgbModal,
    private vracService : VracService,
    private http : HttpClient,
    private utilsService : UtilsService) { }

  ngOnInit(): void {

    this.getAllEtiquetteOuverteByAllergene(1);
    this.getNbPaginationEtiquette()

    this.vracService.getAllAllergene().subscribe(
      listeDesAllergenesDisponibles => {
        {
          this.listeDesAllergenesDisponibles = listeDesAllergenesDisponibles
        }
      }
    )
  }

  getNbPaginationEtiquette(){
    this.vracService.getNbPaginationEtiquetteVrac(this.listeDesAllergenesRecherche).subscribe(
      nbPaginations => {
        this.nbPaginations = nbPaginations
      }
          
    )
  }

  getAllEtiquetteOuverteByAllergene(paginationCourante: number){
    this.vracService.getAllEtiquetteVracOuverteByAllergene(paginationCourante - 1, this.listeDesAllergenesRecherche).subscribe(
      listeEtiquette => {
        {
          this.listeEtiquette = listeEtiquette
        }
      }
    )
  }

 
  getListeAllergeneByEtiquette(etiquette : EtiquetteVrac) : Allergene[]{
    let listeDesAllergenesEtiquette : Allergene[] = []
    etiquette.produitVrac.listeAllergene.forEach(allergene => {
      listeDesAllergenesEtiquette.push(
        this.listeDesAllergenesDisponibles.filter(allergeneListe => allergeneListe.nomAllergene === allergene.nomAllergene)[0]);
    })
    return listeDesAllergenesEtiquette;
  }

  openModalEtiquette(etiquette : EtiquetteVrac){
    const modalRef = this.modalService.open(NouvelleEtiquetteVracComponent, {centered : true, size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etiquetteCourante = etiquette;
    modalRef.result.then(() => {
      this.vracService.getAllEtiquetteVracOuverteByAllergene(this.index, this.listeDesAllergenesRecherche).subscribe(
        listeEtiquette => {
          this.listeEtiquette = listeEtiquette
        }
      )
    },
     (reason) => {
      console.log(reason)
    });
  }

  allergeneIsSelected(allergene : Allergene) : boolean {
    let isSelected : boolean = false;
    if(this.listeDesAllergenesRecherche.length == 14 && allergene.nomAllergene == "AUCUN"){
      return false;
    }
    this.listeDesAllergenesRecherche.forEach(allergeneListe => {
      if(allergeneListe.nomAllergene == allergene.nomAllergene){
        isSelected = true;
      }
    });
    return isSelected;
  }

  getDateString(dateNumber : number) : string{
    return this.utilsService.getDateString(dateNumber)
  }

  

  selectAllergene(allergene : Allergene){
    this.index = 0;
    this.listeEtiquette = null
    if(allergene.nomAllergene == "AUCUN"){
      if(this.listeDesAllergenesRecherche.length == 14){
        this.listeDesAllergenesRecherche = []
      }else{
        this.listeDesAllergenesRecherche = []
        for (let i = 0; i < this.listeDesAllergenesDisponibles.length - 1; i++) {
          this.listeDesAllergenesRecherche.push(this.listeDesAllergenesDisponibles[i])
        }
      }
      
    } else {
      this.listeDesAllergenesRecherche = this.listeDesAllergenesRecherche.filter(
        allergeneListe => allergeneListe.nomAllergene !== "AUCUN");
      if (this.allergeneIsSelected(allergene)) {
        this.listeDesAllergenesRecherche = this.listeDesAllergenesRecherche.filter(
          allergeneListe => allergeneListe.nomAllergene !== allergene.nomAllergene);
      } else {
        this.listeDesAllergenesRecherche.push(allergene)
      }
    }
    this.vracService.getAllEtiquetteVracOuverteByAllergene(this.index, this.listeDesAllergenesRecherche).subscribe(
      listeEtiquette => {
        this.listeEtiquette = listeEtiquette
      }
    )
  }

  
}
