import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  email = "";
  password = "";
  messageError: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  authentification() {
    console.log(this.email, + " " + this.password)
    this.messageError = ""
    this.authService.authentification(this.email, this.password).subscribe(
      () => {}, 
      (err) => {
        console.log(err)
        this.messageError = err.error
      });
  }
}
