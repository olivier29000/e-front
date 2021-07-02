import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ContactRepertoire from 'app/models/repertoire/ContactRepertoire';
import NoteContactRepertoire from 'app/models/repertoire/NoteContactRepertoire';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl + "/repertoire";

@Injectable({
  providedIn: 'root'
})
export class RepertoireService {

  constructor(private http : HttpClient) { }

  getAllOrderByEntreprise() : Observable<ContactRepertoire[]>{
    return this.http.get<ContactRepertoire[]>(`${URL_BACKEND}/getAllOrderByEntreprise`, { withCredentials: true })
  }

  postContactRepertoire(contactRepertoire : ContactRepertoire) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postContactRepertoire`, contactRepertoire, { withCredentials: true })
  }

  getListNoteByIdContactRepertoire(idContactRepertoire : number) : Observable<NoteContactRepertoire[]>{
    return this.http.get<NoteContactRepertoire[]>(`${URL_BACKEND}/getListNoteByIdContactRepertoire/${idContactRepertoire}`, { withCredentials: true })
  }

  postNoteContactRepertoire(noteContactRepertoire : NoteContactRepertoire, idContactRepertoire : number) : Observable<void>{
    return this.http.post<void>(`${URL_BACKEND}/postNoteContactRepertoire/${idContactRepertoire}`, noteContactRepertoire, { withCredentials: true })
  }

  deleteNoteContactRepertoireById(idNoteContactRepertoire : number) : Observable<NoteContactRepertoire[]>{
    return this.http.get<NoteContactRepertoire[]>(`${URL_BACKEND}/deleteNoteContactRepertoireById/${idNoteContactRepertoire}`, { withCredentials: true })
  }
  
  getListeTypeContact() : Observable<string[]>{
    return this.http.get<string[]>(`${URL_BACKEND}/getListeTypeContact`, { withCredentials: true })
  }

  getAllByTypeContact(typeContact : string) : Observable<ContactRepertoire[]>{
    return this.http.get<ContactRepertoire[]>(`${URL_BACKEND}/getAllByTypeContact/${typeContact}`, { withCredentials: true })
  }

  
}
