import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Produit from 'app/models/fournisseurs/Produit';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl + "/produit";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getAllByIdFournisseur(idFournisseur : number) :  Observable<Produit[]>{
    return this.http.get<Produit[]>(`${URL_BACKEND}/getAllByIdFournisseur/${idFournisseur}`, { withCredentials: true })
  }

  getproduitByIdProduit(idProduit : number) :  Observable<Produit>{
    return this.http.get<Produit>(`${URL_BACKEND}/getProduitById/${idProduit}`, { withCredentials: true })
  }

  postproduitByIdFournisseur(produit : Produit, idFournisseur : number) :  Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postProduitByIdFournisseur/${idFournisseur}`,produit, { withCredentials: true })
  }

  getListeQuantiteCommandePrecedentesByIdProduit(idProduit : number) :  Observable<number[]>{
    return this.http.get<number[]>(`${URL_BACKEND}/getListeQuantiteCommandePrecedentesByIdProduit/${idProduit}`, { withCredentials: true })
  }
  
}