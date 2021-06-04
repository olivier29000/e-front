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

  getListeProduitTraiteurRecherche(recherche : string, index : number) : Observable<ProduitTraiteur[]>{
    return this.http.get<ProduitTraiteur[]>(`${URL_BACKEND}/getListeProduitTraiteurRecherche/${recherche}/${index}`, { withCredentials: true })
  }

  getAllProduitTraiteur(index : number) : Observable<ProduitTraiteur[]>{
    return this.http.get<ProduitTraiteur[]>(`${URL_BACKEND}/getAllProduitTraiteur/${index}`, { withCredentials: true });
  }

  getListeProduitTraiteurForCreationEtiquette(index : number) : Observable<ProduitTraiteur[]>{
    return this.http.get<ProduitTraiteur[]>(`${URL_BACKEND}/getListeProduitTraiteurForCreationEtiquette/${index}`, { withCredentials: true });
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

  getNbPaginationProduitTraiteur() : Observable<number>{
    return this.http.get<number>(`${URL_BACKEND}/getNbPaginationProduitTraiteur`, { withCredentials: true });
  }

  getAllEtiquetteByDateFermeturePrevu(date : number) : Observable<Etiquette[]>{
    return this.http.get<Etiquette[]>(`${URL_BACKEND}/getAllEtiquetteByDateFermeturePrevu/${date}`, { withCredentials: true });
  }

  getAllEmplacementVitrine() : Observable<string[]>{
    return this.http.get<string[]>(`${URL_BACKEND}/getAllEmplacementVitrine`, { withCredentials: true });
  }

  getAllEtiquetteByEmplacementVitrine(emplacementVitrine : string) : Observable<Etiquette[]>{
    return this.http.get<Etiquette[]>(`${URL_BACKEND}/getAllEtiquetteByEmplacementVitrine/${emplacementVitrine}`, { withCredentials: true });
  }
  
}
