import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './authentication/services/authentication.service';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router,public authservice:AuthenticationService) { }
  checkifAuthenticated(){
    this.authservice.authenticationState.subscribe(state =>{
      if(state){
        this.router.navigate(['surveyofkenya/clerk-dashboard']);
        
      }else{
        this.router.navigate(['authentication/login']);
      }

    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.checkifAuthenticated();
  }
}
