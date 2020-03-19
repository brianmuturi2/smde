import {Component,ViewChild } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { SweetalertService} from '../../survey-department/shared-service/sweetalerts.service';
@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent {
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
  changepassword(){
  
    

  }
  logout(){
    this.sweetalertService.showConfirmation('Logout','Do you wish to proceed logging out?').then((res)=>{
      if(res){
        this.authService.logout();
      }
      
    });

    

  }
}
