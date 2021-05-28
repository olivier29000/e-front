import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getDateString(dateNumber : number) : string{
    
      return new Date(dateNumber).toLocaleDateString('fr-FR',  {  month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
    
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
