import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  show: boolean = false;
  isLoggedIn:boolean = false;

  constructor(private authSvc:AuthService){}

  ngOnInit(){

    this.authSvc.isLoggedIn$
    .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn )

  }

  logout(){
    this.authSvc.logout()
  }
}
