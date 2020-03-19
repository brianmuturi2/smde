import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(public http: HttpClient) { }
  getrecords(endpointurl,payload){
    let options = {
      params : payload
    };
    return this.http.get<[]>(endpointurl,options);

  }
  postrecord(endpointurl,payload){
 
    return this.http.post<[]>(endpointurl, payload);
  }

}
