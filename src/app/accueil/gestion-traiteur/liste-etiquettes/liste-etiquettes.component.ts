import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Allergene from 'app/models/traiteur/Allergene';
import Etiquette from 'app/models/traiteur/Etiquette';
import { TraiteurService } from 'app/services/traiteur.service';
import { UtilsService } from 'app/services/utils.service';
import { NouvelleEtiquetteComponent } from '../nouvelle-etiquette/nouvelle-etiquette.component';

@Component({
  selector: 'app-liste-etiquettes',
  templateUrl: './liste-etiquettes.component.html',
  styleUrls: ['./liste-etiquettes.component.scss']
})
export class ListeEtiquettesComponent implements OnInit {

  listeEtiquette : Etiquette[];

  listeDesAllergenesDisponibles : Allergene[]
  
  listeDesAllergenesRecherche : Allergene[] = []

  index : number = 1;

  paginationCourante : number = 1;

  nbPaginations : number = 0

  constructor(
    public modalService: NgbModal,
    private traiteurService : TraiteurService,
    private http : HttpClient,
    private utilsService : UtilsService) { }

  ngOnInit(): void {

    this.getAllEtiquetteOuverteByAllergene(1);
    this.getNbPaginationEtiquette()

    this.traiteurService.getAllAllergene().subscribe(
      listeDesAllergenesDisponibles => {
        {
          this.listeDesAllergenesDisponibles = listeDesAllergenesDisponibles
        }
      }
    )
  }

  getNbPaginationEtiquette(){
    this.traiteurService.getNbPaginationEtiquette(this.listeDesAllergenesRecherche).subscribe(
      nbPaginations => {
        this.nbPaginations = nbPaginations
      }
          
    )
  }

  getAllEtiquetteOuverteByAllergene(paginationCourante: number){
    this.traiteurService.getAllEtiquetteOuverteByAllergene(paginationCourante - 1, this.listeDesAllergenesRecherche).subscribe(
      listeEtiquette => {
        {
          this.listeEtiquette = listeEtiquette
        }
      }
    )
  }

 
  getListeAllergeneByEtiquette(etiquette : Etiquette) : Allergene[]{
    let listeDesAllergenesEtiquette : Allergene[] = []
    etiquette.produitTraiteur.listeAllergene.forEach(allergene => {
      listeDesAllergenesEtiquette.push(this.listeDesAllergenesDisponibles.filter(allergeneListe => allergeneListe.nomAllergene === allergene.nomAllergene)[0]);
    })
    return listeDesAllergenesEtiquette;
  }

  openModalEtiquette(etiquette : Etiquette){
    const modalRef = this.modalService.open(NouvelleEtiquetteComponent, {centered : true, size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etiquetteCourante = etiquette;
    modalRef.result.then(() => {
      this.traiteurService.getAllEtiquetteOuverteByAllergene(this.index, this.listeDesAllergenesRecherche).subscribe(
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
    this.traiteurService.getAllEtiquetteOuverteByAllergene(this.index, this.listeDesAllergenesRecherche).subscribe(
      listeEtiquette => {
        this.listeEtiquette = listeEtiquette
      }
    )
  }

  
}
