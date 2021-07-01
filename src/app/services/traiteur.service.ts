import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Allergene from 'app/models/traiteur/Allergene';
import Etiquette from 'app/models/traiteur/Etiquette';
import ProduitTraiteur from 'app/models/traiteur/ProduitTraiteur';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


const URL_BACKEND = environment.backendUrl + "/traiteur";


@Injectable({
  providedIn: 'root'
})
export class TraiteurService {

  constructor(private http: HttpClient) { }

  postProduitTraiteur(produitTraiteur : ProduitTraiteur) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postProduitTraiteur`, produitTraiteur, { withCredentials: true })
  }

  getAllAllergene() : Observable<Allergene[]>{
    return this.http.get<Allergene[]>(`${URL_BACKEND}/getAllAllergene`, { withCredentials: true })
  }

  getListeProduitTraiteurRecherche(index : number, nbElement : number, recherche? : string) : Observable<ProduitTraiteur[]>{
    if(recherche && recherche != undefined){
      return this.http.get<ProduitTraiteur[]>(`${URL_BACKEND}/getListeProduitTraiteurRecherche/${index}/${nbElement}/${recherche}`, { withCredentials: true })
    }else{
      return this.http.get<ProduitTraiteur[]>(`${URL_BACKEND}/getListeProduitTraiteurRecherche/${index}/${nbElement}`, { withCredentials: true })
    }
  }

  getListeProduitTraiteurRechercheVitrine(index : number, nbElement : number, vitrine : string) : Observable<ProduitTraiteur[]>{
    return this.http.get<ProduitTraiteur[]>(`${URL_BACKEND}/getListeProduitTraiteurRechercheVitrine/${index}/${nbElement}/${vitrine}`, { withCredentials: true })
  }

  getAllProduitTraiteur(index : number) : Observable<ProduitTraiteur[]>{
    return this.http.get<ProduitTraiteur[]>(`${URL_BACKEND}/getAllProduitTraiteur/${index}`, { withCredentials: true });
  }

  getListeProduitTraiteurForCreationEtiquette(rechercheStringProduit : string, index : number) : Observable<ProduitTraiteur[]>{
    return this.http.get<ProduitTraiteur[]>(`${URL_BACKEND}/getListeProduitTraiteurForCreationEtiquette/${rechercheStringProduit}/${index}`, { withCredentials: true });
  }

  postEtiquette(etiquette : Etiquette) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postEtiquette`, etiquette, { withCredentials: true })
  }

  getAllEtiquetteOuverteByAllergene(index : number, listeDesAllergenesRecherche : Allergene[]) : Observable<Etiquette[]>{
    return this.http.post<Etiquette[]>(`${URL_BACKEND}/getAllEtiquetteOuverteByAllergene/${index}`,listeDesAllergenesRecherche, { withCredentials: true });
  }

  getNbPaginationEtiquette(listeDesAllergenesRecherche : Allergene[]) : Observable<number>{
    return this.http.post<number>(`${URL_BACKEND}/getNbPaginationEtiquette`,listeDesAllergenesRecherche, { withCredentials: true });
  }

  getNbPaginationProduitTraiteur(nbElementParPagination : number, recherche? : string) : Observable<number>{
    if(recherche && recherche != undefined){
      return this.http.get<number>(`${URL_BACKEND}/getNbPaginationProduitTraiteur/${nbElementParPagination}/${recherche}`, { withCredentials: true });
    }else{
      return this.http.get<number>(`${URL_BACKEND}/getNbPaginationProduitTraiteur/${nbElementParPagination}`, { withCredentials: true });
    }
  }

  getNbPaginationProduitTraiteurVitrine(nbElementParPagination : number, vitrine : string) : Observable<number>{
    return this.http.get<number>(`${URL_BACKEND}/getNbPaginationProduitTraiteur/${nbElementParPagination}/${vitrine}`, { withCredentials: true });
  }

  getAllEtiquetteByDateFermeturePrevu(onlyEtiquetteOpen : boolean, date : number, pagination : number, nbElementParPagination : number) : Observable<Etiquette[]>{
    return this.http.get<Etiquette[]>(`${URL_BACKEND}/getAllEtiquetteByDateFermeturePrevu/${onlyEtiquetteOpen}/${date}/${pagination}/${nbElementParPagination}`, { withCredentials: true });
  }

  getNbPaginationsByDateFermeturePrevu(onlyEtiquetteOpen : boolean, date : number, nbElementParPagination : number) : Observable<number>{
    return this.http.get<number>(`${URL_BACKEND}/getNbPaginationsByDateFermeturePrevu/${onlyEtiquetteOpen}/${date}/${nbElementParPagination}`, { withCredentials: true });
  }

  getAllEmplacementVitrine() : Observable<string[]>{
    return this.http.get<string[]>(`${URL_BACKEND}/getAllEmplacementVitrine`, { withCredentials: true });
  }

  getAllEtiquetteByEmplacementVitrine(emplacementVitrine : string) : Observable<Etiquette[]>{
    return this.http.get<Etiquette[]>(`${URL_BACKEND}/getAllEtiquetteByEmplacementVitrine/${emplacementVitrine}`, { withCredentials: true });
  }
  
  indiquerEtiquetteTermineeByIdEtiquette(idEtiquette : number) : Observable<void>{
    return this.http.get<void>(`${URL_BACKEND}/indiquerEtiquetteTermineeByIdEtiquette/${idEtiquette}`, { withCredentials: true });
  }

  indiquerEtiquetteOuverteByIdEtiquette(idEtiquette : number) : Observable<void>{
    return this.http.get<void>(`${URL_BACKEND}/indiquerEtiquetteOuverteByIdEtiquette/${idEtiquette}`, { withCredentials: true });
  }
  
}
