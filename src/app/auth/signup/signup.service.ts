import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable()
export class SignupService {
private _url= './assets/jsonfiles/jsonfile.json';

private headers = new HttpHeaders({"Content-Type": "application/json", "charset" : "UTF-8"});

constructor(private _http: HttpClient) {}
    // This is where your methods and properties go, for example: 
    someMethod () {
    return this._http.get(this._url);
  }
   saveUser(data) {
     console.log(data);
    return this._http.post('/api/register', data, {headers:this.headers});
  }

  
}