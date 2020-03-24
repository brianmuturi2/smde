
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { loginurl } from '../../app.constants';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { decode } from 'punycode';
import { NgxPermissionsService } from 'ngx-permissions';
const TOKEN_KEY = 'edms_token';

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  divider?: boolean;
  class?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 

  user = null;
  authenticationState = new BehaviorSubject(false);
 
  constructor(private http: HttpClient, private helper: JwtHelperService,private permissionsService: NgxPermissionsService,) {
    this.checkToken();
  }
  flushuserpermissions(){
    this.permissionsService.flushPermissions();
  }
  checkToken() {
    var token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      let decoded = this.helper.decodeToken(token);
      let isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) {
        this.user = decoded;
        this.authenticationState.next(true);
      } else {
        // localStorage.remove(TOKEN_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }


    }
    


    // localStorage.getItem(TOKEN_KEY).key(token => {
    //   if (token) {
    //     let decoded = this.helper.decodeToken(token);
    //     let isExpired = this.helper.isTokenExpired(token);
 
    //     if (!isExpired) {
    //       this.user = decoded;
    //       this.authenticationState.next(true);
    //     } else {
    //       localStorage.remove(TOKEN_KEY);
    //     }
    //   }
    // });
  }
 getUserDetails(){
  return new Promise((resolve, reject) => {

var token = localStorage.getItem(TOKEN_KEY);
let decoded = this.helper.decodeToken(token);
if (token) {
  var user = decoded;
  var currentusername = user['username'];
 
  resolve(currentusername);
 



}
else{
  reject("No uSER");

}






  //   localStorage.get(TOKEN_KEY).then(token => {
  //   let decoded = this.helper.decodeToken(token);
  //   if (token) {
  //     var user = decoded;
  //     var currentusername = user['username'];
     
  //     resolve(currentusername);
     

    

  //   }

  // },(error) =>{
  //   reject("No uSER");

  // }
  // );
});

 }
  
  login(credentials) {
    // flush all permissions just in case
    this.flushuserpermissions();
    return this.http.post(loginurl, credentials)
      .pipe(
        tap(res => {
          var token = res['token'];
            localStorage.setItem(TOKEN_KEY, res['token']);
            this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
          return true;

          
          
        }),
        catchError(e => {
      
          var error:any = e.error;
          
            let status = error.code;
            let message = error.message;
            // this.alertService.showAlert('Error',message,'error');
            
            throw new Error(e.error);
            
            
          })
      );
  }
 
  logout() {
    this.flushuserpermissions();
    localStorage.removeItem(TOKEN_KEY);
    
    this.authenticationState.next(false);
    window.location.reload();
    // localStorage.removeItem(TOKEN_KEY).then(() => {
    //   this.authenticationState.next(false);
    // });
  }
 
 
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
 
  passwordreset(endpoint,postdata){
  
    return this.http.post<NavData>(endpoint,postdata).pipe(map(res =>{
      var response:any = res;
      var code = response.code;
      var message = response.message;
     
      if(code == 200){
        return response.recordsfound;

      }
      else{
        return [];

      }

    }),
    catchError(e => {
      var error:any = e.error;
      
      
        let status = error.code;
        let message = error.message;
        // this.alertService.showAlert('Error',message,'error');
        
        throw new Error(e.error);
        
        
      })
    )

  }
  getrecords(endpointurl,payload){
    let options = {
      params : payload
    };
    return this.http.get<[]>(endpointurl,options);

  }


  
}