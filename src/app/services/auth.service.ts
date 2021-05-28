import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import Utilisateur from '../models/Utilisateur';
import { catchError, flatMap, tap } from 'rxjs/operators';
import UtilisateurCreationComptePost from 'app/models/UtilisateurCreationComptePost';


const URL_BACKEND = environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * subject indiquant le dernier utilisateur connecté
   */
  private _subConnecte: BehaviorSubject<Utilisateur> = new BehaviorSubject(undefined);

  get subConnecte(): Observable<Utilisateur> {
    return this._subConnecte.asObservable();
  }

  subConnecteNext(utilisateur: Utilisateur) {
    this._subConnecte.next(utilisateur);
  }

  /**
   * requete d’authentification qui recupere l’utilisateur et le transmet via le subject
   * @param nomUtilisateur identifiant de l’utilisateur
   * @param motDePasse mot de passe de l’utilisateur
   */
  authentification(email, motDePasse): Observable<Utilisateur> {
    return this.http
      .post(URL_BACKEND + '/auth',
        {
          email: email,
          mdp: motDePasse
        },
        httpOptions
      )
      .pipe(flatMap(() => {
        return this.http.get<Utilisateur>(`${URL_BACKEND}/auth/user`, { withCredentials: true });
      }), tap((utilisateur) => {
        this._subConnecte.next(utilisateur);
        this.router.navigate(['accueil']);
      })
      );
  }

  /**
   * permet de verifier si un utilisateur est connecté et de recuperer ses informations
   */
  isLoggedIn(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${URL_BACKEND}/auth/user`, { withCredentials: true })
      .pipe(tap((utilisateur) => this._subConnecte.next(utilisateur)));
  }

  isLoggedInWithUrl(url : string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${URL_BACKEND}/auth/user/${url}`, { withCredentials: true })
      .pipe(tap((utilisateur) => this._subConnecte.next(utilisateur)));
  }

  getUtilisateur(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${URL_BACKEND}/auth/user`, { withCredentials: true });
  }

  /**
   * permet de verifier si un utilisateur est connecté et de recuperer ses informations
   */
   creationCompte(utilisateurCreationComptePost : UtilisateurCreationComptePost): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/creation-compte', utilisateurCreationComptePost);
  }

  /**
   * permet de deconnecter l’utilisateur
   */
  deconnexion(): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/logout', {}, httpOptions).pipe(tap(() => this._subConnecte.next(undefined)));
  }

  /**
   * permet de deconnecter l’utilisateur
   */
   getNbMessage(): Observable<number> {
    return this.http.get<number>(environment.backendUrl + '/auth/getNbMessage', { withCredentials: true });
  }
}
