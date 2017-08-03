import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password:string = ''
  username:string = ''
  constructor(
    private router: Router) {
  }

  goDashboard() {
  console.log(this.username);
  console.log(this.password);
    this.router.navigate(["dashboard"]);
  }
}