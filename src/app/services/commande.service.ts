import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Email from 'app/models/Email';
import Commande from 'app/models/fournisseurs/Commande';
import CommandeProduit from 'app/models/fournisseurs/CommandeProduit';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


const URL_BACKEND = environment.backendUrl + "/commandeProduit";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {



  constructor(private http: HttpClient) { }

  archiverCommandeById(idCommande : number) : Observable<void>{
    return this.http.get<void>(`${URL_BACKEND}/archiverCommandeById/${idCommande}`, { withCredentials: true })
  }
  
  postCommandeByListeCommandeProduit(listeCommandeProduit : CommandeProduit[]) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postCommandeByListeCommandeProduit`, listeCommandeProduit, { withCredentials: true })
  }

  getMailByListeCommandeProduit(listeCommandeProduit : CommandeProduit[]) : Observable<any>{
    return this.http.post<any>(`${URL_BACKEND}/getMailByListeCommandeProduit`, listeCommandeProduit, { withCredentials: true })
  }

  getAllNoArchive(): Observable<Commande[]>{
    return this.http.get<Commande[]>(`${URL_BACKEND}/getAllNoArchive`, { withCredentials: true })
  }

  getAllYesArchive(): Observable<Commande[]>{
    return this.http.get<Commande[]>(`${URL_BACKEND}/getAllYesArchive`, { withCredentials: true })
  }

  getListeCommandeProduitByIdCommande(idCommande : number): Observable<CommandeProduit[]>{
    return this.http.get<CommandeProduit[]>(`${URL_BACKEND}/getListeCommandeProduitByIdCommande/${idCommande}`, { withCredentials: true })
  }

  getListeCommandeProduitByCleUrl(cleUrl : string): Observable<CommandeProduit[]>{
    return this.http.get<CommandeProduit[]>(`${URL_BACKEND}/getListeCommandeProduitByCleUrl/${cleUrl}`)
  }

  confirmerCommande(cleUrl : string, email : Email): Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/confirmerCommande/${cleUrl}`, email)
  }

  annulerCommande(cleUrl : string, email : Email): Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/annulerCommande/${cleUrl}`, email)
  }
  

}
