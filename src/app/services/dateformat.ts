import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { isNumber } from 'util';
 
@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
      console.log(value)
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 1) {
        return {day: parseInt(dateParts[0]), month: null, year: null};
      } else if (dateParts.length === 2) {
        return {day: parseInt(dateParts[0]), month: parseInt(dateParts[1]), year: null};
      } else if (dateParts.length === 3) {
        return {day: parseInt(dateParts[0]), month: parseInt(dateParts[1]), year: parseInt(dateParts[2])};
      }
    }
    return null;
  }
 
  format(date: NgbDateStruct): string {
    let dateJs : Date ;
    let dateJsMilliseconds
      if(date){
        dateJs = new Date(date.year, date.month - 1, date.day);
        dateJsMilliseconds = dateJs.getTime()
      }
    
    return date ?
    this.getDateString(dateJsMilliseconds) :
        '';
  }

  getDateString(dateNumber : number) : string{
    
    return new Date(dateNumber).toLocaleDateString('fr-FR',  {year:'numeric',  month: 'long', day: 'numeric'})
  
 }
}