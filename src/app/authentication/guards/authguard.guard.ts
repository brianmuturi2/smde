
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(public router: Router,public authService: AuthenticationService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    let authstatus  = this.authService.isAuthenticated();
    if(!authstatus){
      this.router.navigate(['authentication/login']);
      return false;
    }
    else {
      return true;

    }
    // return this.loginService.isAuthenticated();
  }
  
}
