import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DadosConexao } from 'src/model/dadosConexao';
import { AuthService } from '../Service/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
     canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn()) {
        return  true; 
      }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
  }