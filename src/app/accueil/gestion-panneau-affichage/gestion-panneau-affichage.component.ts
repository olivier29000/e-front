import { Component, OnInit } from '@angular/core';
import Image from 'app/models/Image';
import { PanneauAffichageService } from 'app/services/panneau-affichage.service';
import Swal from 'sweetalert2';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-gestion-panneau-affichage',
  templateUrl: './gestion-panneau-affichage.component.html',
  styleUrls: ['./gestion-panneau-affichage.component.scss']
})
export class GestionPanneauAffichageComponent implements OnInit {

  listeImages : Image[] = [];

  imageCourante : Image = {} as Image

  imageOK : boolean = false

  messageErreur = ""
  
  constructor(private panneauAffichageService : PanneauAffichageService,
    private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    this.initialisation()
  }

  ajouterImage(event){
    this.messageErreur = ""
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        let resulatBase64 = reader.result  as string;
        this.imageCompress.compressFile(resulatBase64, 0, 50, 50).then(
          result => {
            this.imageCourante.picByte = result.substring(result.indexOf(",") + 1)
            this.imageCourante.name = file.name
            this.imageCourante.type = file.type
            this.imageOK = true
            
          }
        );
    };
  }

  initialisation(){
    this.panneauAffichageService.getAllImage().subscribe(
      listeImages => {
        this.listeImages = listeImages
      }
    )
    this.imageCourante = {} as Image
    this.imageOK = false
  }

  postImage(){
    this.messageErreur = ""
    this.panneauAffichageService.postImage(this.imageCourante).subscribe(
      res => this.initialisation(),
      err => this.messageErreur = "il y a eu un problème"
    )
    
  }

  supprimerImage(image : Image){
    let imageBase64 : string = "data:image/jpg;base64," + image.picByte
    Swal.fire({
      title: 'Êtes vous sûr',
      text: " de vouloir supprimer cette image ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Annuler",
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}
