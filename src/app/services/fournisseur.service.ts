import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Fournisseur from 'app/models/fournisseurs/Fournisseur';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl + "/fournisseur";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http: HttpClient) { }

  getAll() :  Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>(`${URL_BACKEND}/getAll`, { withCredentials: true })
  }

  getfournisseurByIdFournisseur(idFournisseur : number) :  Observable<Fournisseur>{
    return this.http.get<Fournisseur>(`${URL_BACKEND}/getfournisseurByIdFournisseur/${idFournisseur}`, { withCredentials: true })
  }

  postFournisseur(fournisseur : Fournisseur) :  Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postFournisseur`, fournisseur, { withCredentials: true })
  }

}
