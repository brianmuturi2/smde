import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './authentication/services/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { get_user_roles_url } from './app.constants';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router,public authservice:AuthenticationService,private permissionsService: NgxPermissionsService,) {
    this.checkifAuthenticated();
   }
  checkifAuthenticated(){
    this.authservice.authenticationState.subscribe(state =>{
      if(state){
        let payload = {

        }
       
        this.authservice.getrecords(get_user_roles_url,payload).subscribe((res)=>{
          let all_roles = res['group_name'];
          this.permissionsService.addPermission(all_roles, (permissionName, permissionsObject) => {
            return !!permissionsObject[permissionName];
        });
        console.log(all_roles)
          if(all_roles == "DATA_CLERK"){
            this.router.navigate(['/clerk-view/clerk-dashboard']);
            
    
          }
          else if(all_roles =="DATA_ANALYST"){
            this.router.navigate(['/validator-view/analytics']);
    
          }
          else if(all_roles =="DATA_DEPARTMENT_HEAD"){
            this.router.navigate(['/administration/staff-listing']);
    
          }
          else if(all_roles =="BUSINESS_ANALYST"){
            this.router.navigate(['/analyst-view/data-document-analytics']);
    
          }
    
    
    
        });
        
      }else{
        this.router.navigate(['authentication/login']);
      }

    });
  }
  fetchpermissions(){
 
  
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    
  }
}
