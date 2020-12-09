import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    return this.authservice.isLoggedIn();
  }

  isAdmin(){
    return this.authservice.isAdmin();
  }

  logout(){
    this.authservice.logout();
  }
}
