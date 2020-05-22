
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

  constructor(private http: HttpClient, private helper: JwtHelperService, private permissionsService: NgxPermissionsService, ) {
    this.checkToken();
  }
  flushuserpermissions() {
    this.permissionsService.flushPermissions();
  }
  checkToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decoded = this.helper.decodeToken(token);
      const isExpired = this.helper.isTokenExpired(token);
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
  getUserDetails() {
    return new Promise((resolve, reject) => {

      const token = localStorage.getItem(TOKEN_KEY);
      const decoded = this.helper.decodeToken(token);
      if (token) {
        const user = decoded;
        const currentusername = user['username'];

        resolve(currentusername);




      } else {
        reject('No uSER');

      }
    });

  }
  getuserprofileInfo() {
    return new Promise((resolve, reject) => {

      const token = localStorage.getItem(TOKEN_KEY);
      const decoded = this.helper.decodeToken(token);
      if (token) {
        const user = decoded;
        const department = user['department'];
        const staff = user['staff'];
        const user_id = user['id'];
        const response_info = {
          'department_id': department ,
          'staff': staff,
          'user_id':  user_id
        };


        resolve(response_info);




      } else {
        reject('No uSER');

      }
    });

  }
  login(credentials) {
    // flush all permissions just in case
    this.flushuserpermissions();
    return this.http.post(loginurl, credentials)
      .pipe(
        tap(res => {
          const token = res['token'];
          localStorage.setItem(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
          return true;



        }),
        catchError(e => {

          const error: any = e.error;

          const status = error.code;
          const message = error.message;
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


  passwordreset(endpoint, postdata) {

    return this.http.post<NavData>(endpoint, postdata).pipe(map(res => {
      const response: any = res;
      const code = response.code;
      const message = response.message;

      if (code == 200) {
        return response.recordsfound;

      } else {
        return [];

      }

    }),
      catchError(e => {
        const error: any = e.error;


        const status = error.code;
        const message = error.message;
        // this.alertService.showAlert('Error',message,'error');

        throw new Error(e.error);


      })
    );

  }
  getrecords(endpointurl, payload) {
    const options = {
      params: payload
    };
    return this.http.get<[]>(endpointurl, options);

  }



}
