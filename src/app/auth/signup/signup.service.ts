import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
@Injectable()
export class SignupService {
private _url= './assets/jsonfiles/jsonfile.json';
constructor(private _http: Http) {}
    // This is where your methods and properties go, for example: 
    someMethod () {
    return this._http.get(this._url);
  }

  
}