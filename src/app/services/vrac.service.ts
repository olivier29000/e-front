import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Allergene from 'app/models/traiteur/Allergene';
import EtiquetteVrac from 'app/models/vrac/EtiquetteVrac';
import ProduitVrac from 'app/models/vrac/ProduitVrac';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl + "/vrac";

@Injectable({
  providedIn: 'root'
})
export class VracService {

  constructor(private http: HttpClient) { }

  postProduitTraiteur(produitVrac : ProduitVrac) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postProduitVrac`, produitVrac, { withCredentials: true })
  }

  getAllAllergene() : Observable<Allergene[]>{
    return this.http.get<Allergene[]>(`${URL_BACKEND}/getAllAllergene`, { withCredentials: true })
  }

  getListeProduitVracRecherche(index : number, nbElement : number, recherche? : string) : Observable<ProduitVrac[]>{
    if(recherche && recherche != undefined){
      return this.http.get<ProduitVrac[]>(`${URL_BACKEND}/getListeProduitVracRecherche/${index}/${nbElement}/${recherche}`, { withCredentials: true })
    }else{
      return this.http.get<ProduitVrac[]>(`${URL_BACKEND}/getListeProduitVracRecherche/${index}/${nbElement}`, { withCredentials: true })
    }
  }

  getListeProduitVracRechercheEmplacementVrac(index : number, nbElement : number, vitrine : string) : Observable<ProduitVrac[]>{
    return this.http.get<ProduitVrac[]>(`${URL_BACKEND}/getListeProduitVracRechercheEmplacementVrac/${index}/${nbElement}/${vitrine}`, { withCredentials: true })
  }

  getAllProduitVrac(index : number) : Observable<ProduitVrac[]>{
    return this.http.get<ProduitVrac[]>(`${URL_BACKEND}/getAllProduitVrac/${index}`, { withCredentials: true });
  }

  getListeProduitVracForCreationEtiquetteVrac(rechercheStringProduitVrac : string, index : number) : Observable<ProduitVrac[]>{
    return this.http.get<ProduitVrac[]>(`${URL_BACKEND}/getListeProduitVracForCreationEtiquetteVrac/${rechercheStringProduitVrac}/${index}`, { withCredentials: true });
  }

  postEtiquette(etiquetteVrac : EtiquetteVrac) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postEtiquetteVrac`, etiquetteVrac, { withCredentials: true })
  }

  getAllEtiquetteVracOuverteByAllergene(index : number, listeDesAllergenesRecherche : Allergene[]) : Observable<EtiquetteVrac[]>{
    return this.http.post<EtiquetteVrac[]>(`${URL_BACKEND}/getAllEtiquetteVracOuverteByAllergene/${index}`,listeDesAllergenesRecherche, { withCredentials: true });
  }

  getNbPaginationEtiquetteVrac(listeDesAllergenesRecherche : Allergene[]) : Observable<number>{
    return this.http.post<number>(`${URL_BACKEND}/getNbPaginationEtiquetteVrac`,listeDesAllergenesRecherche, { withCredentials: true });
  }

  getNbPaginationProduitVrac(nbElementParPagination : number, recherche? : string) : Observable<number>{
    if(recherche && recherche != undefined){
      return this.http.get<number>(`${URL_BACKEND}/getNbPaginationProduitVrac/${nbElementParPagination}/${recherche}`, { withCredentials: true });
    }else{
      return this.http.get<number>(`${URL_BACKEND}/getNbPaginationProduitVrac/${nbElementParPagination}`, { withCredentials: true });
    }
  }

  getNbPaginationProduitVracEmplacementVrac(nbElementParPagination : number, emplacementVrac : string) : Observable<number>{
    return this.http.get<number>(`${URL_BACKEND}/getNbPaginationProduitVracEmplacementVrac/${nbElementParPagination}/${emplacementVrac}`, { withCredentials: true });
  }

  getAllEtiquetteVracByDateFermeturePrevu(onlyEtiquetteOpen : boolean, date : number, pagination : number, nbElementParPagination : number) : Observable<EtiquetteVrac[]>{
    return this.http.get<EtiquetteVrac[]>(`${URL_BACKEND}/getAllEtiquetteVracByDateFermeturePrevu/${onlyEtiquetteOpen}/${date}/${pagination}/${nbElementParPagination}`, { withCredentials: true });
  }

  getNbPaginationsByDateFermeturePrevu(onlyEtiquetteOpen : boolean, date : number, nbElementParPagination : number) : Observable<number>{
    return this.http.get<number>(`${URL_BACKEND}/getNbPaginationsByDateFermeturePrevu/${onlyEtiquetteOpen}/${date}/${nbElementParPagination}`, { withCredentials: true });
  }

  getAllEmplacementVrac() : Observable<string[]>{
    return this.http.get<string[]>(`${URL_BACKEND}/getAllEmplacementVrac`, { withCredentials: true });
  }

  getAllEtiquetteVracByEmplacementVrac(emplacementVitrine : string) : Observable<EtiquetteVrac[]>{
    return this.http.get<EtiquetteVrac[]>(`${URL_BACKEND}/getAllEtiquetteVracByEmplacementVrac/${emplacementVitrine}`, { withCredentials: true });
  }
  
  indiquerEtiquetteVracTermineeByIdEtiquetteVrac(idEtiquetteVrac : number) : Observable<void>{
    return this.http.get<void>(`${URL_BACKEND}/indiquerEtiquetteVracTermineeByIdEtiquetteVrac/${idEtiquetteVrac}`, { withCredentials: true });
  }

  indiquerEtiquetteVracOuverteByIdEtiquetteVrac(idEtiquetteVrac : number) : Observable<void>{
    return this.http.get<void>(`${URL_BACKEND}/indiquerEtiquetteVracOuverteByIdEtiquetteVrac/${idEtiquetteVrac}`, { withCredentials: true });
  }
  
}
