import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Logiciel from 'app/models/Logiciel';
import Utilisateur from 'app/models/Utilisateur';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl + "/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http : HttpClient) { }

  getAllUtilisateur() : Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${URL_BACKEND}/getAllUtilisateur`, { withCredentials: true });
  }

  getAllLogiciel() : Observable<Logiciel[]>{
    return this.http.get<Logiciel[]>(`${URL_BACKEND}/getAllLogiciel`, { withCredentials: true });
  }

  postUtilisateur(utilisateur : Utilisateur) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postUtilisateur`,utilisateur , { withCredentials: true });
  }
}
