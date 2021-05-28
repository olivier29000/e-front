import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import EtatEvent from 'app/models/calendar/EtatEvent';
import EventDto from 'app/models/calendar/EventDto';
import EventPost from 'app/models/calendar/EventPost';
import ResumeSemaineUtilisateur from 'app/models/ResumeSemaineUtilisateur';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl + "/calendar";


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http : HttpClient) { }

  getResumeSemaineUtilisateur(idUtilisateur : number, intervalStart : number, internalEnd : number) : Observable<ResumeSemaineUtilisateur>{

    internalEnd = internalEnd + 86400000
    return this.http.get<ResumeSemaineUtilisateur>(`${URL_BACKEND}/getResumeSemaineUtilisateur/${idUtilisateur}/${intervalStart}/${internalEnd}`, { withCredentials: true });
  }
  
  getAllEventByUtilisateur() : Observable<EventDto[]>{

    return this.http.get<EventDto[]>(`${URL_BACKEND}/getAllEventByUtilisateur`, { withCredentials: true });
  }

  getAllEventByUtilisateurForGestionCalendrier(idUtilisateur : number, intervalStart : number, internalEnd : number) : Observable<EventDto[]>{

    internalEnd = internalEnd + 86400000
    return this.http.get<EventDto[]>(`${URL_BACKEND}/getAllEventByUtilisateurForGestionCalendrier/${idUtilisateur}/${intervalStart}/${internalEnd}`, { withCredentials: true });
  }

  getAllEventAllUtilisateurByIdEtatEvent(idEtatEvent : number, intervalStart : number, internalEnd : number) : Observable<EventDto[]>{

    internalEnd = internalEnd + 86400000
    return this.http.get<EventDto[]>(`${URL_BACKEND}/getAllEventAllUtilisateurByIdEtatEvent/${idEtatEvent}/${intervalStart}/${internalEnd}`, { withCredentials: true });
  }

  getAllEtatEvent() : Observable<EtatEvent[]>{
    return this.http.get<EtatEvent[]>(`${URL_BACKEND}/getAllEtatEvent`, { withCredentials: true });
  }

  postEtatEvent(etatEvent : EtatEvent) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postEtatEvent`,etatEvent , { withCredentials: true });
  }

  postEventByIdUtilisateur(eventPost : EventPost, idUtilisateur : number) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postEventByIdUtilisateur/${idUtilisateur}`,eventPost , { withCredentials: true });
  }

  deleteEventById(idEvent : number){
    return this.http.get<void>(`${URL_BACKEND}/deleteEventById/${idEvent}` , { withCredentials: true });
  }
}
