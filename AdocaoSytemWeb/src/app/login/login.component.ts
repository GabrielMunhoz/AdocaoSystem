import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/model/User';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new User()

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public login() {
    alert(this.usuario.usuario)

    this.authService.login(this.usuario).subscribe(
      res => {
        this.authService.setSession(res)

        this.router.navigate(['/home']);
      },
      err => {
        console.log("erro" + err)

      }
    );

  }

}
