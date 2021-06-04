import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Image from 'app/models/Image';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


const backendUrl = environment.backendUrl + "/panneau-affichage";

@Injectable({
  providedIn: 'root'
})
export class PanneauAffichageService {

  constructor(private http : HttpClient) { }

  getAllImage() : Observable<Image[]>{
    return this.http.get<Image[]>(`${backendUrl}/getAllImage`, { withCredentials: true });
  }

  getOneRandomImage(){
    return this.http.get<Image>(`${backendUrl}/getRandomImage`, { withCredentials: true });
  }

  postImage(image : Image){
    return this.http.post<Image>(`${backendUrl}/postImage`,image, { withCredentials: true });
  }

  deleteById(idImage : number) : Observable<void>{
    return this.http.get<void>(`${backendUrl}/deleteById/${idImage}`, { withCredentials: true });
  }
}
