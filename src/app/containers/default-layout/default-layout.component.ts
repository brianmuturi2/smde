import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  loggedinusername:any;
  constructor(public authService:AuthenticationService,public sweetalertService:SweetalertService){
this.fetchuserDetails();

  }
  fetchuserDetails(){
    this.authService.getUserDetails().then((res)=>{
    
      this.loggedinusername = res;
    });
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout(){
    this.sweetalertService.showConfirmation('Logout','Do you wish to proceed logging out?').then((res)=>{
      if(res){
        this.authService.logout();
      }
      
    });

    

  }
}
