import { Component, OnInit } from '@angular/core';
import Image from 'app/models/Image';
import { PanneauAffichageService } from 'app/services/panneau-affichage.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-panneau-affichage',
  templateUrl: './panneau-affichage.component.html',
  styleUrls: ['./panneau-affichage.component.scss']
})
export class PanneauAffichageComponent implements OnInit {

  listeImages : Image[] = [];

  imageCourante : Image;

  mySubscription: Subscription;

  constructor(private panneauAffichageService : PanneauAffichageService) {
    this.mySubscription= interval(5000).subscribe((x =>{
      this.doStuff();
  }));
   }

  ngOnInit(): void {
    this.panneauAffichageService.getOneRandomImage().subscribe(
      imageCourante => {
        this.imageCourante = imageCourante
        console.log(this.imageCourante)
      }
    )
  }

  doStuff(){
    this.panneauAffichageService.getOneRandomImage().subscribe(
      imageCourante => {
        this.imageCourante = imageCourante
        console.log(this.imageCourante)
      }
    )
  }

}
