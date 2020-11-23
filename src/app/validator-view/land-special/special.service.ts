import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpecialService {
  dept = 'land-special/';
  baseurl = 'http://127.0.0.1:8000/api/v1/';
  // baseurl = 'http://192.168.214.157:8000/api/v1/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  uploadFile(payload){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post(this.baseurl + this.dept + 'upload-file', payload);
  }

  getReports(): Observable<any>  {
    return this.http.get(this.baseurl +  this.dept + 'reports', {headers: this.httpHeaders});
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
