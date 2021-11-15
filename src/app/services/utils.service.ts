import { Injectable } from '@angular/core';
import Image from 'app/models/Image';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  openImage(image : Image){
    swal.fire({
      title: "Hello World",
      html: "<img src=\"data:image/jpg;base64,"+ image.picByte +"\" style='width:1000px;'>",
      width: '800px'
   });
  }

  getDateString(dateNumber : number) : string{
    
      return new Date(dateNumber).toLocaleDateString('fr-FR',  { year:'numeric', month: 'long', day: 'numeric'})
    
   }

   getDateStringWithHour(dateNumber : number) : string{
    dateNumber = dateNumber - 7200000
    return new Date(dateNumber).toLocaleDateString('fr-FR',  { month: 'long', day: 'numeric'
    , hour: 'numeric', minute: 'numeric' })
  
 }

 getDateStringJourMois(dateNumber : number) : string{
  let listeJoursString = ["dim","lun", "mar", "mer", "jeu", "ven", "sam", "dim"]
  return listeJoursString[new Date(dateNumber).getDay()] + " " + new Date(dateNumber).toLocaleDateString('fr-FR',  { month: 'long', day: 'numeric'})

}

getTitleCalendar(dateNumberStart : number, dateNumberEnd : number) : string{
  let dateStart = new Date(dateNumberStart)
  let dateEnd = new Date(dateNumberEnd)
  if(dateStart.getMonth() != dateEnd.getMonth()){
    return "du " + new Date(dateNumberStart).toLocaleDateString('fr-FR',  { month: 'long', day: 'numeric'}) + " au " + new Date(dateNumberEnd).toLocaleDateString('fr-FR',  { month: 'long', day: 'numeric'})
  }else{
    return "du " + new Date(dateNumberStart).toLocaleDateString('fr-FR',  { day: 'numeric'})
    + " au " + new Date(dateNumberEnd).toLocaleDateString('fr-FR',  { month: 'long', day: 'numeric'})
  }
}
  isPhonenumber(phoneNumber : string){
    var regex = /^\d{10}$/;
    if(phoneNumber && phoneNumber.match(regex)){
      return true;
    }else{
      return false;
    }
   }
  
   isEmail(email : string){
    var regex = /\S+@\S+\.\S+/;
    if(email && email.match(regex)){
      return true;
    }else{
      return false;
    }
   }

   isToday(someDate) : boolean{
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }
}
