import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Employe from 'app/models/Employe';
import EmployeObjet from 'app/models/EmployeObjet';
import EvenementEmploye from 'app/models/EvenementEmploye';
import ResumeEmploye from 'app/models/SemaineEmploye';
import SemaineEmploye from 'app/models/SemaineEmploye';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http : HttpClient) { }

  getListeEmploye() : Observable<Employe[]>{
    return this.http.get<Employe[]>('../../assets/models/listeEmployes.json');
  }

  getEmployeByIdAndMois(idEmploye : string, mois : string) : Observable<Employe>{
    return this.http.get<Employe>('../../assets/models/employeCourant.json');
  }

  getListeResumeEmploye(intervalStart : string, intervalEnd : string, idEmploye : number)  : Observable<ResumeEmploye[]> {
    return this.http.get<ResumeEmploye[]>('../../assets/models/listeResumeEmploye.json');
  }

  getListeSemaineCourantesByIndex(index : number) : Observable<any[]>{
    return this.http.get<any[]>('../../assets/models/listeSemaineCourantes.json');
  }

  postEvenementByIdEmploye(evenementCourant : EvenementEmploye, employe : Employe) : Observable<void>{
    return this.http.post<void>('../../assets/models/listeSemaineCourantes.json', evenementCourant);
  }

  getListeEvenementByPeriode(start : number, end : number) : Observable<any>{
    return this.http.get<any>('../../assets/models/listeEvenementEmploye.json');
  }

  getListeEmployeObjet() : Observable<EmployeObjet[]> {
    return this.http.get<any>('../../assets/models/listeEmployeObjet.json');
  }
  
}
